import { useState } from "react";
import { Form, Row, Col, Spin } from "antd";
import { createClient } from "../../services/clients";
import { useHistory } from "react-router-dom";
import { useContextInfo } from "../../hooks/auth.hooks";
import {
  ButtonS,
  InputSWhite,
} from "../../components/styledComponents/antdStyled";
import { TitleS } from "../../components/styledComponents/Typography";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function CreateClient({
  addClient,
  inAModal = false,
  setIsModalClient,
}) {
  const [form] = Form.useForm();
  const history = useHistory();
  const { user, login } = useContextInfo();
  const [isDone, setIsDone] = useState(false);

  async function handleSubmit(values) {
    setIsDone(true);
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
      {isDone ? (
        <Col xs={24} sm={18} md={12} lg={8} style={{ height: "100%" }}>
          <Spin indicator={antIcon} style={{ margin: "auto" }} />
        </Col>
      ) : (
        <Col {...sizes}>
          <TitleS style={{ margin: "2rem" }}> New Client </TitleS>
          <Form form={form} layout="horizontal" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              label="Name:"
              rules={[
                {
                  required: true,
                  message: "Please input the client's name!",
                },
              ]}
            >
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
      )}
    </Row>
  );
}
