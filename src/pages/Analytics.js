import { useEffect, useState } from "react";
import { Col, Dropdown, Form, Row, Skeleton } from "antd";
import { TitleS } from "../components/styledComponents/Typography";
import { getAllOrders } from "../services/orders";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";
import AnalyticsTimeSettings from "../components/AnalyticsTimeSettings";
import { ButtonS } from "../components/styledComponents/antdStyled";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

export default function Analytics() {
  const [orders, setOrders] = useState(null);
  const [ordersFiltered, setOrdersFiltered] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);
  const [dataPlot, setDataPlot] = useState([]);
  const [keys, setKeys] = useState({ one: "date", two: "quantity" });
  const [justValues, setJustValues] = useState(false);
  const [form] = Form.useForm();

  function settingDataToPlot(filtered, newArr = true, baseArr = []) {
    const toData = newArr ? [] : baseArr;

    if (newArr) {
      const dataExtract = filtered.map((e) => e[keys.one]);
      dataExtract.forEach((value, index, array) => {
        const arrIndex = array.indexOf(value);
        if (index === arrIndex) {
          toData.push({ [keys.one]: value, [keys.two]: 1 });
        } else {
          toData[arrIndex][keys.two] += 1;
        }
      });
    } else {
      const baseKeyOne = baseArr.map((e) => e[keys.one]);
      const dataExtract = filtered.map((e) => e[keys.one]);
      dataExtract.forEach((value, index, array) => {
        const arrIndex = array.indexOf(value);
        const baseIndex = baseKeyOne.indexOf(value);
        if (baseIndex + 1 && index === arrIndex) {
          toData[baseIndex][keys.two] = 1;
        } else {
          toData[baseIndex][keys.two] += 1;
        }
      });
    }

    return toData;
  }

  function fromNowToWhen(date, value = 7, type = "D") {
    let day = 0,
      month = 0,
      year = 0;
    switch (type) {
      case "D":
        day = value;
        break;
      case "M":
        month = value;
        break;
      case "Y":
        year = value;
        break;
      default:
        break;
    }
    return new Date(
      date?.getFullYear() - year,
      date?.getMonth() - month,
      date?.getDate() - day
    );
  }

  /* Generates all dates between two Dates */
  function generateInBetweenersDates(date, value = 7, type = "D") {
    const arrOut = [];
    for (let i = 1; i <= value + 1; i++) {
      const newDate = fromNowToWhen(date, i, type);
      const month =
        newDate.getMonth() + 1 < 10
          ? "0" + (newDate.getMonth() + 1)
          : newDate.getMonth() + 1;
      const day =
        newDate.getDate() + 1 < 10
          ? "0" + (newDate.getDate() + 1)
          : newDate.getDate() + 1;
      arrOut.push({
        [keys.one]: `${newDate.getFullYear()}-${month}-${day}`,
        [keys.two]: 0,
      });
    }
    return arrOut;
  }

  /* Generates all dates between two moments */
  function generateAllDates(
    momentStart = moment().subtract(8, "days"),
    momentStop = moment(),
    dateRange = "last7days"
  ) {
    let initValue = 0,
      endtValue = 0,
      formated = [];
    const arrOut = [];
    if (dateRange === "quarterToDate" || dateRange === "yearToDate") {
      initValue = momentStart.month();
      endtValue = momentStop.month();
      formated = ["M", "MMM"];
    } else {
      initValue = momentStart.date();
      endtValue = momentStop.date();
      formated = ["d", "MMM Do"];
    }
    console.log(initValue, endtValue, formated[0]);

    for (let i = 0; i < endtValue - initValue; i++) {
      arrOut.push({
        [keys.one]: momentStart.add(1, formated[0]).format(formated[1]),
        [keys.two]: 0,
      });
    }

    return moment("2020-12-10");
  }

  function settingMomentsToPlot(filtered, newArr = true, baseArr = []) {
    const toData = newArr ? [] : baseArr;

    if (newArr) {
      const dataExtract = filtered.map((e) => e[keys.one]);
      dataExtract.forEach((value, index, array) => {
        const arrIndex = array.indexOf(value);
        if (index === arrIndex) {
          toData.push({ [keys.one]: value, [keys.two]: 1 });
        } else {
          toData[arrIndex][keys.two] += 1;
        }
      });
    } else {
      const baseKeyOne = baseArr.map((e) => e[keys.one]);
      const dataExtract = filtered.map((e) => e[keys.one]);
      dataExtract.forEach((value, index, array) => {
        const arrIndex = array.indexOf(value);
        const baseIndex = baseKeyOne.indexOf(value);
        if (baseIndex + 1 && index === arrIndex) {
          toData[baseIndex][keys.two] = 1;
        } else {
          toData[baseIndex][keys.two] += 1;
        }
      });
    }

    return toData;
  }

  function filterOrders(orders, sinceThisTime) {
    return orders.filter((e) => new Date(`${e.date}T05:00`) >= sinceThisTime);
  }

  useEffect(() => {
    async function getOrders() {
      const { data } = await getAllOrders();
      setOrders(data);
      const date = new Date();
      const sinceThisTime = fromNowToWhen(date, 15, "D");
      setCurrentDate(date);

      const filtered = data.filter(
        (e) => new Date(`${e.date}T05:00`) >= sinceThisTime
      );

      setOrdersFiltered(filtered);
      const baseArr = generateInBetweenersDates(date, 15, "D");
      const toPlot = settingDataToPlot(filtered, justValues, baseArr);
      setDataPlot(toPlot);
    }
    getOrders();
    console.log(generateAllDates());
  }, []);

  useEffect(() => {
    const baseArr = generateInBetweenersDates(currentDate, 15, "D");
    const toPlot = settingDataToPlot(ordersFiltered, justValues, baseArr);
    setDataPlot(toPlot);
  }, [keys]);

  const victoryConfigs = dataPlot.length
    ? {
        data: dataPlot,
        x: [keys.one],
        y: [keys.two],
      }
    : {};

  return (
    <Row justify="center" align="middle">
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <TitleS style={{ textAlign: "left" }}>Analytics</TitleS>
        <Dropdown
          overlay={() => <AnalyticsTimeSettings form={form} />}
          placement="bottomLeft"
          trigger={["click"]}
        >
          <ButtonS type="primary">Config</ButtonS>
        </Dropdown>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Col>
          {ordersFiltered ? (
            <VictoryChart domainPadding={25} theme={VictoryTheme.material}>
              <VictoryAxis dependentAxis />

              <VictoryAxis style={{ tickLabels: { angle: -45 } }} />
              <VictoryBar
                {...victoryConfigs}
                style={{ data: { fill: "#81a1c1" } }}
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
