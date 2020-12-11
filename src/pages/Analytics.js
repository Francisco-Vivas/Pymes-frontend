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

  /*  First plot */
  const [configs1, setConfigs1] = useState({
    dateRange: "last7days",
    rangePicker: moment.range(moment().subtract(7, "d"), moment()),
  });
  const [textButton1, setTextButton1] = useState("Last 7 days");
  const [keysPlot1, setKeysPlot1] = useState({ one: "date", two: "total" });
  const [dataPlot1Actual, setDataPlot1Actual] = useState([]);
  const [dataPlot1Atras, setDataPlot1Atras] = useState([]);

  /*  Second plot */
  const [configs2, setConfigs2] = useState({
    dateRange: "last7days",
    rangePicker: moment.range(moment().subtract(7, "d"), moment()),
  });
  const [textButton2, setTextButton2] = useState("Last 7 days");
  const [keysPlot2, setKeysPlot2] = useState({ one: "date", two: "quantity" });
  const [dataPlot2Actual, setDataPlot2Actual] = useState([]);
  const [dataPlot2Atras, setDataPlot2Atras] = useState([]);

  useEffect(() => {
    async function getOrders() {
      const { data } = await getAllOrders();
      setOrders(data);

      /* MOMENTS VERSION */
      getAndSetDataToPlot(
        data,
        configs1.rangePicker,
        configs1.dateRange,
        setDataPlot1Actual,
        keysPlot1
      );
      getAndSetDataToPlot(
        data,
        configs2.rangePicker,
        configs2.dateRange,
        setDataPlot2Actual,
        keysPlot2
      );
      /* END */
    }
    getOrders();
  }, []);

  function updateTextButton(dateRange, setTextFn) {
    switch (dateRange) {
      case "last7days":
        setTextFn("Last 7 days");
        break;
      case "last15days":
        setTextFn("Last 15 days");
        break;
      case "last30days":
        setTextFn("Last 30 days");
        break;
      case "lastMonth":
        setTextFn("Last Month");
        break;
      case "weekToDate":
        setTextFn("Week to date");
        break;
      case "monthToDate":
        setTextFn("Month to date");
        break;
      case "quarterToDate":
        setTextFn("Year to date");
        break;
      case "yearToDate":
        setTextFn("Year to date");
        break;
      case "custom":
        setTextFn("Custom");
        break;
    }
  }

  /* ############### UPDATING KEYS ####################*/
  useEffect(() => {
    if (orders) {
      getAndSetDataToPlot(
        orders,
        configs1.rangePicker,
        configs1.dateRange,
        setDataPlot1Actual,
        keysPlot1
      );
      updateTextButton(configs1.dateRange, setTextButton1);
    }
  }, [keysPlot1, configs1]);

  useEffect(() => {
    if (orders) {
      getAndSetDataToPlot(
        orders,
        configs2.rangePicker,
        configs2.dateRange,
        setDataPlot2Actual,
        keysPlot2
      );
      updateTextButton(configs2.dateRange, setTextButton2);
    }
  }, [keysPlot2, configs2]);

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
        //label: momentStart.format(formated[1]),
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
          if (keys.two === "total") {
          } else {
            toData.push({ [keys.one]: value, [keys.two]: 1, label: "1" });
          }
        } else {
          if (keys.two === "total") {
          } else {
            const newValue = toData[arrIndex][keys.two] + 1;
            toData[arrIndex][keys.two] = newValue;
            toData[arrIndex].label = `${newValue}`;
          }
        }
      });
    } else {
      /* Extract just the key.one of the baseArr  */
      const baseKeyOne = baseArr.map((e) => e[keys.one]);
      dataExtract.forEach((value, index, array) => {
        const arrIndex = array.indexOf(value);
        const baseIndex = baseKeyOne.indexOf(value);
        let newValue;
        if (baseIndex + 1 && index === arrIndex) {
          if (keys.two === "total") {
            newValue = filtered[index][keys.two];
            toData[baseIndex][keys.two] = newValue;
          } else {
            newValue = 1;
            toData[baseIndex][keys.two] = newValue;
          }
        } else if (baseIndex + 1) {
          if (keys.two === "total") {
            newValue = toData[baseIndex][keys.two] + filtered[index][keys.two];
            toData[baseIndex][keys.two] = newValue;
          } else {
            newValue = toData[baseIndex][keys.two] + 1;
            toData[baseIndex][keys.two] = newValue;
          }
        }
        if (keys.two === "total") {
          toData[baseIndex].label = `$ ${newValue}`.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          );
        } else {
          toData[baseIndex].label = `Qty: ${newValue}`;
        }
      });
    }

    return toData;
  }

  return (
    <Row justify="center" align="middle" style={{ height: "100%" }}>
      <TitleS style={{ textAlign: "left", width: "100%" }}>Analytics</TitleS>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Row>
          <Col span={12}>
            <TitleS level={3} style={{ textAlign: "left", margin: 0 }}>
              Total sales
            </TitleS>
          </Col>
          <Col span={12}>
            <Dropdown
              overlay={() => (
                <AnalyticsTimeSettings form={form} setConfigs={setConfigs1} />
              )}
              placement="bottomLeft"
              trigger={["click"]}
            >
              <ButtonS type="primary">
                <CalendarOutlined />
                {textButton1}
              </ButtonS>
            </Dropdown>
          </Col>
        </Row>
        <Divider />
        <Col style={{ height: "40%" }}>
          {orders ? (
            <VictoryChart
              domainPadding={10}
              theme={VictoryNordTheme}
              animate={{ duration: 500 }}
              height={250}
            >
              <VictoryLabel text={textButton1} x={50} y={30} />
              <VictoryAxis
                dependentAxis
                label={"Quantity"}
                style={{
                  tickLabels: { fontSize: 10 },
                }}
              />
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
        <Row>
          <Col span={12}>
            <TitleS level={3} style={{ textAlign: "left", margin: 0 }}>
              Total orders
            </TitleS>
          </Col>
          <Col span={12}>
            <Dropdown
              overlay={() => (
                <AnalyticsTimeSettings form={form} setConfigs={setConfigs2} />
              )}
              placement="bottomLeft"
              trigger={["click"]}
            >
              <ButtonS type="primary">
                <CalendarOutlined />
                {textButton2}
              </ButtonS>
            </Dropdown>
          </Col>
        </Row>
        <Divider />
        <Col style={{ height: "40%" }}>
          {orders ? (
            <VictoryChart
              domainPadding={10}
              theme={VictoryNordTheme}
              animate={{ duration: 500 }}
              height={250}
            >
              <VictoryLabel text={textButton2} x={50} y={30} />
              <VictoryAxis
                dependentAxis
                label={"Quantity"}
                style={{
                  tickLabels: { fontSize: 10 },
                }}
              />
              <VictoryAxis
                style={{ tickLabels: { angle: -90, fontSize: 9 } }}
              />
              <VictoryBar
                labelComponent={<VictoryTooltip />}
                data={dataPlot2Actual}
                x={[keysPlot2.one]}
                y={[keysPlot2.two]}
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
    </Row>
  );
}
