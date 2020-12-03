import { useEffect } from "react";
import { Row, Col, Typography, Divider, Skeleton } from "antd";
import { useContextInfo } from "../hooks/auth.hooks";
import FormDataUser from "../components/FormDataUser";
import { editUserFn } from "../services/user";

const { Title, Text } = Typography;

export default function EditProfile({ history }) {
  const { user, login } = useContextInfo();

  // useEffect(() => {
  //   if (!user) history.push("/");
  // }, []);

  return user ? (
    <Row>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Title level={1}>Edit your profile</Title>
        <Text type="secondary">Update your data.</Text>
        <Divider />
        <FormDataUser
          onFinishFn={editUserFn}
          isSignup={false}
          logUpdate={login}
        />
      </Col>
    </Row>
  ) : (
    <>
      <Skeleton loading={!Boolean(user)} active avatar></Skeleton>
      <Skeleton loading={!Boolean(user)} active></Skeleton>
    </>
  );
}
