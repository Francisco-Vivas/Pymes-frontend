import { useEffect, useState } from "react";
import { Col, Dropdown, Form, Row, Skeleton } from "antd";
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
  const [dataPlot, setDataPlot] = useState([]);
  const [keys, setKeys] = useState({ one: "date", two: "quantity" });
  const [form] = Form.useForm();
  const [configs, setConfigs] = useState({
    dateRange: "last7days",
    rangePicker: moment.range(moment().subtract(7, "d"), moment()),
  });
  const [textButton, setTextButton] = useState("Last 7 days");

  useEffect(() => {
    async function getOrders() {
      const { data } = await getAllOrders();
      setOrders(data);
      if (true) {
        /* MOMENTS VERSION */
        getAndSetDataToPlot(data, configs.rangePicker, configs.dateRange);
        /* END */
      } else {
      }
    }
    getOrders();
  }, []);

  /* ############### UPDATING KEYS ####################*/
  useEffect(() => {
    if (orders) {
      getAndSetDataToPlot(orders, configs.rangePicker, configs.dateRange);
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
  }, [keys, configs]);

  function getAndSetDataToPlot(data, range, dateRange) {
    const momentsFiltered = filterOrders(data, range);
    const [allMoments, formated] = generateAllMoments(range, dateRange);
    const momentsToPlot = settingMomentsToPlot(
      momentsFiltered,
      allMoments,
      formated[1]
    );
    setDataPlot(momentsToPlot);
  }

  /* Generates all dates between two moments */
  function generateAllMoments(
    range = moment.range(moment().subtract(8, "days"), moment()),
    dateRange = "last7days"
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
  function settingMomentsToPlot(filtered, baseArr = [], formated = "M Do") {
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

  function filterOrders(orders, range) {
    return orders.filter((e) => range.contains(moment(e.date)));
  }

  return (
    <Row justify="center" align="middle" style={{ height: "100%" }}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <TitleS style={{ textAlign: "left" }}>Analytics</TitleS>
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
        <TitleS level={3} style={{ textAlign: "left", margin: 0 }}>
          Total orders
        </TitleS>
        {orders ? (
          <VictoryChart
            domainPadding={5}
            theme={VictoryNordTheme}
            animate={{ duration: 500 }}
          >
            <VictoryLabel text={``} x={50} y={30} />
            <VictoryAxis dependentAxis />
            {console.log(dataPlot)}
            <VictoryAxis style={{ tickLabels: { angle: -90, fontSize: 10 } }} />
            <VictoryBar
              labelComponent={<VictoryTooltip />}
              data={dataPlot}
              x={[keys.one]}
              y={[keys.two]}
              alignment="start"
              title={`Total orders`}
              animate={{
                onExit: {
                  duration: 250,
                },
              }}
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
                          target: "label",
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
                          target: "label",
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
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Col></Col>
      </Col>
    </Row>
  );
}
