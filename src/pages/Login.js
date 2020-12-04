import { Link } from "react-router-dom";
import { Row, Col, Form, Input, Typography, Button, Divider } from "antd";
import { loginFn } from "../services/auth";
import { useContextInfo } from "../hooks/auth.hooks";
import { useEffect } from "react";

const { Title, Text } = Typography;

const Login = ({ history }) => {
  const { user, login } = useContextInfo();

  useEffect(() => {
    if (user) history.push("/dashboard");
  }, []);

  const googleUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/auth/google"
      : "/auth/google";

  const onFinish = async (value) => {
    const { data } = await loginFn(value);
    login(data);
    history.push("/");
  };

  return (
    <Row>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Title level={1}>Login</Title>
        <Text type="secondary">It's awesome to see you again!</Text>
        <Divider />
        <Form
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
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
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" shape="round">
              Login
            </Button>
          </Form.Item>

          <p>
            If you don't have an account yet, you can create an account{" "}
            <Link to="/signup">here</Link>.
          </p>
        </Form>
        <Divider>or</Divider>
        <a href={googleUrl}>
          <Button block shape="round">
            Login with Google
          </Button>
        </a>
      </Col>
    </Row>
  );
};

export default Login;
