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
        <Col pull={6}>
          <Avatar
            {...AvatarProperties}
            size={{ xs: 40, sm: 60, md: 80, lg: 90, xl: 100, xxl: 150 }}
          />
          <Title
            level={1}
            style={{ display: "inline-block", marginLeft: "1rem", color:"#4D5768"}}
          >
            Hi, {user.companyName}
          </Title>
        </Col>
        {/* <p style={{color:"#d3d3d3", textAlign:"left", paddingLeft:"114px"}}>This is all your information!</p> */}
        <Divider />
        <p style={{color:"#4D5768", textAlign:"left", paddingLeft:"110px"}}> 
        Admin: {user.username} {user.userlastname}
        <br/>
        <br/>
        Phone: {user.prefix} {user.cellphone}
        <br/>
        <br/>
        Email: {user.email}
        <br/>
        <br/>
        Address: {user.address}
        <br/>
        <br/>
        </p>


        <Link to="/profile/edit">
          <Button shape="square" style={{float:"right"}}>
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
