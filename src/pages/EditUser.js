import { useEffect } from "react";
import { Row, Col, Button, Typography, Divider, Select } from "antd";
import { useContextInfo } from "../hooks/auth.hooks";
import FormDataUser from "../components/FormDataUser";
import { editUserFn } from "../services/user";

const { Title, Text } = Typography;

const googleUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth/google"
    : "/auth/google";

export default function EditUser({ history }) {
  const { user } = useContextInfo();

  useEffect(() => {
    if (!user) history.push("/");
  }, []);

  return (
    <Row>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Title level={1}>Edit your profile</Title>
        <Text type="secondary">Update your data.</Text>
        <Divider />
        <FormDataUser
          onFinishFn={editUserFn}
          isSignup={false}
          prevData={user}
        />
      </Col>
    </Row>
  );
}
