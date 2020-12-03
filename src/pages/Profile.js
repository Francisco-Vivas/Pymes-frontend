import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Typography, Button, Divider, Skeleton, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContextInfo } from "../hooks/auth.hooks";

const { Title, Text } = Typography;

const Profile = ({ history }) => {
  const { user } = useContextInfo();

  // useEffect(() => {
  //   if (!user) history.push("/");
  // }, []);

  const AvatarProperties = user
    ? { src: user.image }
    : {
        icon: <UserOutlined />,
      };

  return user ? (
    <Row>
      <Col xs={24} sm={24} md={20} lg={15}>
        <Col>
          <Avatar
            {...AvatarProperties}
            size={{ xs: 40, sm: 60, md: 80, lg: 90, xl: 100, xxl: 150 }}
          />
          <Title
            level={1}
            style={{ display: "inline-block", marginLeft: "1rem" }}
          >
            Hi, {user.companyName}
          </Title>
        </Col>
        <Text type="secondary">This is all your information!</Text>
        <Divider />
        <Link to="/profile/edit">
          <Button block shape="round">
            Edit profile
          </Button>
        </Link>
      </Col>
    </Row>
  ) : (
    <Skeleton loading={!user} active></Skeleton>
  );
};

export default Profile;
