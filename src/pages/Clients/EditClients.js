import React, { useState, useEffect } from "react";
import {
  updateClient,
  getClientDetail,
  deleteClient,
} from "../../services/clients";
import { useHistory } from "react-router-dom";
import { Form, Button, Spin, Divider, Row, Col } from "antd";
import {
  ButtonS,
  InputSWhite,
} from "../../components/styledComponents/antdStyled";
import { TitleS } from "../../components/styledComponents/Typography";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function UpdateClient({
  match: {
    params: { clientsID },
  },
}) {
  const [form] = Form.useForm();
  const history = useHistory();
  const [client, setClient] = useState({});
  const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    async function getData() {
      const { data } = await getClientDetail(clientsID);
      setClient(data);
      form.setFieldsValue(data);
    }
    getData();
  }, []);

  async function handleSubmit(values) {
    setIsDone(true);
    const { data: newClient } = await updateClient(client._id, values);
    setClient(newClient);
    history.push(`/clients`);
  }
  async function handleDelete() {
    await deleteClient(clientsID);
    history.push("/clients");
  }

  return (
    <Row align="center">
      {isDone ? (
        <Col xs={24} sm={18} md={12} lg={8} style={{ height: "100%" }}>
          <Spin indicator={antIcon} style={{ margin: "auto" }} />
        </Col>
      ) : (
        <Col xs={24} sm={18} md={12} lg={8}>
          <TitleS style={{ margin: "2rem" }}> Edit Client </TitleS>
          <Form form={form} layout="horizontal" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name:">
              <InputSWhite />
            </Form.Item>
            <Form.Item name="phone" label="Phone:">
              <InputSWhite />
            </Form.Item>
            <Form.Item name="email" label="Email:">
              <InputSWhite />
            </Form.Item>
            <Form.Item name="address" label="Address:">
              <InputSWhite />
            </Form.Item>
            <ButtonS type="primary" size="middle" htmlType="submit">
              Edit Client
            </ButtonS>
          </Form>
          <Divider />
          <Button type="primary" danger onClick={handleDelete}>
            Delete Client
          </Button>
        </Col>
      )}
    </Row>
  );
}
