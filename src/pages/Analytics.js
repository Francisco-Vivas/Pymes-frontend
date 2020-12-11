import { useEffect, useState } from "react";
import { Col, Divider, Dropdown, Form, Row, Skeleton } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { TitleS } from "../components/styledComponents/Typography";
import { getAllOrders } from "../services/orders";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTooltip,
  VictoryLabel,
} from "victory";
import AnalyticsTimeSettings from "../components/AnalyticsTimeSettings";
import { ButtonS } from "../components/styledComponents/antdStyled";
import Moment from "moment";
import { extendMoment } from "moment-range";
import VictoryNordTheme from "../assets/VictoryNordTheme";

const moment = extendMoment(Moment);

export default function Analytics() {
  const [orders, setOrders] = useState(null);
  const [form] = Form.useForm();
  const [configs, setConfigs] = useState({
    dateRange: "last7days",
    rangePicker: moment.range(moment().subtract(7, "d"), moment()),
  });
  const [textButton, setTextButton] = useState("Last 7 days");

  /*  First plot */
  const [keysPlot1, setKeysPlot1] = useState({ one: "date", two: "quantity" });
  const [dataPlot1Actual, setDataPlot1Actual] = useState([]);
  const [dataPlot1Atras, setDataPlot1Atras] = useState([]);

  useEffect(() => {
    async function getOrders() {
      const { data } = await getAllOrders();
      setOrders(data);

      /* MOMENTS VERSION */
      getAndSetDataToPlot(
        data,
        configs.rangePicker,
        configs.dateRange,
        setDataPlot1Actual,
        keysPlot1
      );
      /* END */
    }
    getOrders();
  }, []);

  /* ############### UPDATING KEYS ####################*/
  useEffect(() => {
    if (orders) {
      getAndSetDataToPlot(
        orders,
        configs.rangePicker,
        configs.dateRange,
        setDataPlot1Actual,
        keysPlot1
      );
      switch (configs.dateRange) {
        case "last7days":
          setTextButton("Last 7 days");
          break;
        case "last15days":
          setTextButton("Last 15 days");
          break;
        case "last30days":
          setTextButton("Last 30 days");
          break;
        case "lastMonth":
          setTextButton("Last Month");
          break;
        case "weekToDate":
          setTextButton("Week to date");
          break;
        case "monthToDate":
          setTextButton("Month to date");
          break;
        case "quarterToDate":
          setTextButton("Year to date");
          break;
        case "yearToDate":
          setTextButton("Year to date");
          break;
        case "custom":
          setTextButton("Custom");
          break;
      }
    }
  }, [keysPlot1, configs]);

  function getAndSetDataToPlot(
    data,
    range,
    dateRange,
    updateFunctionState,
    keys
  ) {
    const momentsFiltered = filterOrders(data, range);
    const [allMoments, formated] = generateAllMoments(range, dateRange, keys);
    const momentsToPlot = settingMomentsToPlot({
      filtered: momentsFiltered,
      baseArr: allMoments,
      formated: formated[1],
      keys,
    });
    updateFunctionState(momentsToPlot);
  }

  function filterOrders(orders, range) {
    return orders.filter((e) => range.contains(moment(e.date)));
  }

  /* Generates all dates between two moments */
  function generateAllMoments(
    range = moment.range(moment().subtract(8, "days"), moment()),
    dateRange = "last7days",
    keys
  ) {
    let formated = [],
      iterate = "",
      momentStart = range.start.subtract(1, "d");

    const arrOut = [];
    if (dateRange === "quarterToDate" || dateRange === "yearToDate") {
      iterate = "months";
      formated = ["M", "MMM"];
    } else {
      iterate = "days";
      formated = ["d", "MMM Do"];
    }
    const distance = Array.from(range.by(iterate));
    for (let i = 0; i < distance.length - 1; i++) {
      arrOut.push({
        [keys.one]: momentStart.add(1, formated[0]).format(formated[1]),
        [keys.two]: 0,
        label: momentStart.format(formated[1]),
      });
    }

    return [arrOut, formated];
  }

  /* 
    Generates an arr of objects where their keys are ones on the object keys values.
    @filtered [arr] : data to be counted.
    @baseArr [arr] : data to fit the values.
  */
  function settingMomentsToPlot({
    filtered,
    baseArr = [],
    formated = "M Do",
    keys,
  }) {
    const toData = !baseArr.length ? [] : baseArr;
    const dataExtract = filtered.map((e) => {
      return moment(e[keys.one]).format(formated);
    });

    if (!baseArr.length) {
      /* Extracts the dates from the filtered arr and transform it to a Moment*/

      dataExtract.forEach((value, index, array) => {
        const arrIndex = array.indexOf(value);
        if (index === arrIndex) {
          toData.push({ [keys.one]: value, [keys.two]: 1 });
        } else {
          toData[arrIndex][keys.two] += 1;
        }
      });
    } else {
      /* Extract just the key.one of the baseArr  */
      const baseKeyOne = baseArr.map((e) => e[keys.one]);

      dataExtract.forEach((value, index, array) => {
        const arrIndex = array.indexOf(value);
        const baseIndex = baseKeyOne.indexOf(value);
        if (baseIndex + 1 && index === arrIndex) {
          toData[baseIndex][keys.two] = 1;
        } else if (baseIndex + 1) {
          toData[baseIndex][keys.two] += 1;
        }
      });
    }

    return toData;
  }

  return (
    <Row justify="center" align="middle" style={{ height: "100%" }}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <TitleS style={{ textAlign: "left" }}>Analytics</TitleS>
        <Divider />
        <Row>
          <Col span={12}>
            <TitleS level={3} style={{ textAlign: "left", margin: 0 }}>
              Total orders
            </TitleS>
          </Col>
          <Col span={12}>
            <Dropdown
              overlay={() => (
                <AnalyticsTimeSettings form={form} setConfigs={setConfigs} />
              )}
              placement="bottomLeft"
              trigger={["click"]}
            >
              <ButtonS type="primary">
                <CalendarOutlined />
                {textButton}
              </ButtonS>
            </Dropdown>
          </Col>
        </Row>
        <Col style={{ height: "40%" }}>
          {orders ? (
            <VictoryChart
              domainPadding={10}
              theme={VictoryNordTheme}
              animate={{ duration: 500 }}
              height={250}
            >
              <VictoryLabel text={textButton} x={50} y={30} />
              <VictoryAxis
                dependentAxis
                label={"Quantity"}
                style={{
                  tickLabels: { fontSize: 10 },
                }}
              />
              {console.log(dataPlot1Actual)}
              <VictoryAxis
                style={{ tickLabels: { angle: -90, fontSize: 9 } }}
              />
              <VictoryBar
                labelComponent={<VictoryTooltip />}
                data={dataPlot1Actual}
                x={[keysPlot1.one]}
                y={[keysPlot1.two]}
                alignment="start"
                title={`Total orders`}
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onMouseOver: () => {
                        return [
                          {
                            target: "data",
                            mutation: () => ({
                              style: { fill: "#88C0D0" },
                            }),
                          },
                          {
                            target: "labels",
                            mutation: () => ({ active: true }),
                          },
                        ];
                      },
                      onMouseOut: () => {
                        return [
                          {
                            target: "data",
                            mutation: () => {},
                          },
                          {
                            target: "labels",
                            mutation: () => ({ active: false }),
                          },
                        ];
                      },
                    },
                  },
                ]}
              />
            </VictoryChart>
          ) : (
            <Skeleton active />
          )}
        </Col>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Col></Col>
      </Col>
    </Row>
  );
}
