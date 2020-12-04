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
    <Row justify="center" align="middle">
      <Col xs={24} sm={24} md={20} lg={15}>
        <Col pull={6}>
          <Avatar
            {...AvatarProperties}
            shape="circle"
          style={{ backgroundColor: "#4D5768", borderColor: "#4D5768" }}
          size={{ xs: 60, sm: 80, md: 100, lg: 120, xl: 150, xxl: 170 }}
        />
          <TitleS
            level={1}
            style={{
              display: "inline-block",
              marginLeft: "1rem",
              color: "#4D5768",
            }}
          >
            Welcome {user.companyName}!
          </TitleS>
        </Col>
        {/* <p style={{color:"#d3d3d3", textAlign:"left", paddingLeft:"114px"}}>This is all your information!</p> */}
        <Divider />
        <p
          style={{ color: "#4D5768", textAlign: "left", paddingLeft: "110px" }}
        >
          Admin: {user.username} {user.userlastname}
          <br />
          <br />
          Phone: {user.prefix} {user.cellphone}
          <br />
          <br />
          Email: {user.email}
          <br />
          <br />
          Address: {user.address}
          <br />
          <br />
        </p>

        <Link to="/profile/edit">
          <ButtonS shape="square" style={{ float: "right" }}>
            Edit profile
          </ButtonS>
        </Link>
      </Col>
    </Row>
  ) : (
    <Skeleton loading={!user} active></Skeleton>
  );
};

export default Profile;
