import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Divider, Skeleton, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContextInfo } from "../hooks/auth.hooks";
import { ButtonS } from "../components/styledComponents/antdStyled";
import { TextS, TitleS } from "../components/styledComponents/Typography";

const Profile = ({ history }) => {
  const { user } = useContextInfo();

  const AvatarProperties = user
    ? { src: user.image }
    : {
        icon: <UserOutlined />,
      };

  return user ? (
    <>
      <Row justify="Start" align="middle">
        <Avatar
          {...AvatarProperties}
          shape="circle"
          style={{ backgroundColor: "#4D5768", borderColor: "#4D5768" }}
          size={{ xs: 60, sm: 80, md: 100, lg: 120, xl: 150, xxl: 170 }}
        />
        <TitleS level={1} style={{ marginLeft: "3rem" }}>
          Welcome {user.companyName}!
        </TitleS>
      </Row>
      <Row justify="center" align="middle">
        <Space direction="vertical" align="start">
          <TextS type="secondary">
            Admin: {user.username} {user.userlastname}
          </TextS>
          <TextS>Phone: {user.cellphone}</TextS>
          <TextS>Email: {user.email}</TextS>
          <TextS>Address: {user.address}</TextS>
        </Space>
      </Row>
      <Row justify="end" align="bottom">
        <Link to="/profile/edit">
          <ButtonS type="primary">Edit profile</ButtonS>
        </Link>
      </Row>
    </>
  ) : (
    <Skeleton loading={!user} active></Skeleton>
  );
};

export default Profile;
