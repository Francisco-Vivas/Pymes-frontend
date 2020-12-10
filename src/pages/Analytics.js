import { useEffect, useState } from "react";
import { Col, Row, Skeleton } from "antd";
import { TitleS } from "../components/styledComponents/Typography";
import { getAllOrders } from "../services/orders";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";

export default function Analytics() {
  const [orders, setOrders] = useState(null);
  const [ordersFiltered, setOrdersFiltered] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);
  const [dataPlot, setDataPlot] = useState([]);
  const [keys, setKeys] = useState({ one: "date", two: "quantity" });
  const [justValues, setJustValues] = useState(false);

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
      <Col xs={24} sm={24} md={20} lg={15}>
        <TitleS style={{ textAlign: "left" }}>Analytics</TitleS>
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
