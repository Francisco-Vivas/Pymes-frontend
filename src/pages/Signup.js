import { useEffect } from "react";
import { Row, Col, Button, Typography, Divider, Select } from "antd";
import { signupFn } from "../services/auth";
import { useContextInfo } from "../hooks/auth.hooks";
import FormDataUser from "../components/FormDataUser";

const { Title, Text } = Typography;

const googleUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth/google"
    : "/auth/google";

export default function Signup({ history }) {
  const { user } = useContextInfo();

  useEffect(() => {
    if (user) history.push("/");
  }, []);

  return (
    <Row>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Title level={1}>Sign up</Title>
        <Text type="secondary">Welcome!</Text>
        <Divider />
        <FormDataUser onFinishFn={signupFn} isSignup={true} />
        <Divider>or</Divider>
        <a href={googleUrl}>
          <Button block shape="round">
            Sing up with Google
          </Button>
        </a>
      </Col>
    </Row>
  );
}
