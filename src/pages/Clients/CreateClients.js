import React from "react";
import { Form, Row, Col } from "antd";
import { createClient } from "../../services/clients";
import { useHistory } from "react-router-dom";
import { useContextInfo } from "../../hooks/auth.hooks";
import {
  ButtonS,
  InputSWhite,
} from "../../components/styledComponents/antdStyled";
import { TitleS } from "../../components/styledComponents/Typography";

export default function CreateClient({
  addClient,
  inAModal = false,
  setIsModalClient,
}) {
  const [form] = Form.useForm();
  const history = useHistory();
  const { user, login } = useContextInfo();

  async function handleSubmit(values) {
    const client = { ...values };
    const { data: newClient } = await createClient(client);
    login({ ...user, clientsID: [...user.clientsID, newClient._id] });
    return inAModal ? setIsModalClient(false) : history.push("/clients");
  }

  const sizes = inAModal
    ? {
        span: 24,
      }
    : { xs: 24, sm: 18, md: 12, lg: 8 };

  return (
    <Row align="center">
      <Col {...sizes}>
        <TitleS style={{ margin: "2rem" }}> New Client </TitleS>
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
          <ButtonS type="primary" htmlType="submit">
            Create Client
          </ButtonS>
        </Form>
      </Col>
    </Row>
  );
}
