import { useEffect } from "react";
import { Row, Col, Form, Input, Button, Typography, Divider } from "antd";
import { signupFn } from "../services/auth";
import { useContextInfo } from "../hooks/auth.hooks";

const { Title, Text } = Typography;

const googleUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth/google"
    : "/auth/google";

const Signup = ({ history }) => {
  const [form] = Form.useForm();
  const { user } = useContextInfo();

  useEffect(() => {
    if (user) history.push("/");
  }, []);

  async function onFinish(value) {
    await signupFn(value);
    history.push("/login");
  }

  return (
    <Row>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Title level={1}>Sign up</Title>
        <Text type="secondary">Welcome!</Text>
        <Divider />
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email:"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password:"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="userlastname"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Company Name" name="companyName">
            <Input />
          </Form.Item>
          {/* ######################## NUMBER ########################### */}
          <Form.Item label="Cellphone Number" name="cellphone">
            <Input />
          </Form.Item>

          <Button type="primary" block htmlType="submit">
            Sign up
          </Button>
        </Form>
        <Divider>or</Divider>
        <a href={googleUrl}>
          <Button block shape="round">
            Sing up with Google
          </Button>
        </a>
      </Col>
    </Row>
  );
};

export default Signup;
