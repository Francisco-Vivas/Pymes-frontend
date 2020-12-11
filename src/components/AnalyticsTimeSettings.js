import { Form, Select, DatePicker, Menu } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ButtonS } from "./styledComponents/antdStyled";

const { RangePicker } = DatePicker;

const AnalyticsTimeSettings = ({ form, setConfigs }) => {
  const [formState, setFormState] = useState({
    dateRange: "last7days",
    rangePicker: [moment().subtract(7, "days"), moment()],
  });

  useEffect(() => {
    form.setFieldsValue(formState);
  }, [formState]);

  function handleOnFinish(value) {
    const rangePicker = moment.range(
      value.rangePicker[0],
      value.rangePicker[1]
    );
    setConfigs({ ...value, rangePicker });
  }

  function handlerDateRangePicker(value) {
    const rangePicker = [];
    switch (value) {
      case "last7days":
        rangePicker.push(moment().subtract(7, "days"));
        break;
      case "last15days":
        rangePicker.push(moment().subtract(15, "days"));
        break;
      case "last30days":
        rangePicker.push(moment().subtract(30, "days"));
        break;
      case "lastMonth":
        rangePicker.push(moment().subtract(1, "months").startOf("month"));
        break;
      case "weekToDate":
        rangePicker.push(moment().startOf("week"));
        break;
      case "monthToDate":
        rangePicker.push(moment().startOf("month"));
        break;
      case "quarterToDate":
        rangePicker.push(moment().startOf("quarter"));
        break;
      case "yearToDate":
        rangePicker.push(moment().startOf("year"));
        break;
      case "custom":
        break;
    }
    if (value !== "custom") {
      if (value !== "lastMonth") {
        rangePicker.push(moment());
      } else {
        rangePicker.push(moment().subtract(1, "months").endOf("month"));
      }
      setFormState({ ...formState, rangePicker, dateRange: value });
    }
  }

  function handleChangeRangePicker(value) {
    setFormState({ dateRange: "custom", rangePicker: value });
  }
  return (
    <Menu>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleOnFinish}
        initialValues={formState}
        style={{ height: "100%", margin: "1rem" }}
      >
        <Form.Item name="dateRange" label="Date range">
          <Select onSelect={handlerDateRangePicker}>
            <Select.Option value="last7days">Last 7 days</Select.Option>
            <Select.Option value="last15days">Last 15 days</Select.Option>
            <Select.Option value="last30days">Last 30 days</Select.Option>
            <Select.Option value="lastMonth">Last Month</Select.Option>
            <Select.Option value="weekToDate">Week to date</Select.Option>
            <Select.Option value="monthToDate">Month to date</Select.Option>
            <Select.Option value="quarterToDate">Quarter to date</Select.Option>
            <Select.Option value="yearToDate">Year to date</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="rangePicker">
          <RangePicker onCalendarChange={handleChangeRangePicker} />
        </Form.Item>
        <ButtonS type="secondary" htmlType="submit">
          Apply
        </ButtonS>
      </Form>
    </Menu>
  );
};

export default AnalyticsTimeSettings;
