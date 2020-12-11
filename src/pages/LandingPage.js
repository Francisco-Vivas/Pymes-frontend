import React from "react";
import { Layout, Button, Row, Col } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useContextInfo } from "../hooks/auth.hooks";
import { logoutFn } from "../services/auth";
import { ButtonS } from "../components/styledComponents/antdStyled";
import { TitleS } from "../components/styledComponents/Typography";

const { Header, Content, Sider } = Layout;

export default function LandingPage() {
  const { logout } = useContextInfo();
  const { user } = useContextInfo();
  const history = useHistory();

  const handleLogout = async () => {
    await logoutFn();
    logout();
    history.push("/");
  };

  return (
    <Row justify="center" align="middle">
      <Col
        span={24}
        style={{ display: "flex", height: "600px", alignItems: "center" }}
      >
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          span={12}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TitleS
            level={1}
            style={{
              textAlign: "left",
              color: "#4D5768",
              paddingLeft: "9rem",
              fontSize: "2.5rem",
            }}
          >
            HELPING YOUR MICROBUSINESS <br />
            WORK IN MACRO WAYS
          </TitleS>
          <TitleS
            level={5}
            style={{
              textAlign: "left",
              color: "#4D5768",
              paddingLeft: "9rem",
            }}
          >
            Pymes is your ally when it comes to the organization of your
            business
            <br />
            Keep track of your orders, clients, suppliers and much more!
            <br />
            What are your waiting to sign up?!
          </TitleS>
          <br />
          <br />
          <Link to="/signup">
            <Button
              shape="square"
              style={{
                float: "left",
                marginLeft: "150px",
                color: "white",
                backgroundColor: "#4D5768",
                border: "none",
              }}
            >
              Sign Up!
            </Button>
          </Link>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} span={12} style={{}}>
          <img src="/images/1.png" style={{ height: "400px" }} />
        </Col>
      </Col>
      <Col span={24} style={{ backgroundColor: "#E7EEF5", padding: "1.5rem" }}>
        <TitleS
          level={1}
          style={{
            paddingTop: "1.5rem",
            color: "#4D5768",
            fontSize: "2rem",
            width: "100%",
          }}
        >
          PARTNERS
        </TitleS>
        <Row
          justify="space-around"
          align="middle"
          style={{ paddingBottom: "0.5rem" }}
        >
          <Col xs={24} sm={12} md={12} lg={4} xl={4} span={4}>
            <img src="/images/Amarea.png" style={{ height: "150px" }} />
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4} span={4}>
            <img src="/images/Area.png" style={{ height: "100px" }} />
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4} span={4}>
            <img src="/images/4.png" style={{ height: "150px" }} />
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4} span={4}>
            <img src="/images/CS.png" style={{ height: "150px" }} />
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4} span={4}>
            <img src="/images/5.png" style={{ height: "150px" }} />
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ padding: "30px", backgroundColor: "#88C0D0" }}>
        <h1 style={{ textAlign: "center", color: "white", fontSize: "2rem" }}>
          FOCUS ON YOUR GROWTH, LET US TAKE CARE OF THE REST
        </h1>
      </Col>

      <Col
        span={24}
        style={{
          backgroundColor: "white",
          padding: "4rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={{ paddingLeft: "10rem" }}
        >
          <TitleS
            level={1}
            style={{ fontSize: "2rem", color: "#4D5768", textAlign: "left" }}
          >
            GET EVERYTHING IN ONE PLACE
          </TitleS>
          <h4 style={{ color: "#4D5768", textAlign: "left" }}>
            Get notifications when inventory is below a specific quantity, which
            <br />
            you get to specify.
            <br />
            Visualize a summary of useful data un the dashboard, along with some
            of your
            <br />
            top products, and get all your orders, clients, suppliers and
            products' information in one useful place.
          </h4>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <img src="/images/2.png" style={{ height: "17rem" }} />
        </Col>
      </Col>
      <Col
        span={24}
        style={{
          backgroundColor: "#81A1C1",
          padding: "5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <img src="/images/3.png" style={{ height: "20rem" }} />
        </Col>

        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={{ paddingLeft: "150px" }}
        >
          <TitleS
            level={1}
            style={{ fontSize: "2rem", color: "white", textAlign: "left" }}
          >
            PREMIUM ANALYTICS{" "}
          </TitleS>
          <h4 style={{ color: "white", textAlign: "left" }}>
            Get detailed analytics and projections from your sales and
            customers.
            <br />
            Visualize in friendly graphics sales over specific periods of time,
            <br />
            among many other usefull information.
          </h4>
        </Col>
      </Col>

      <div style={{ backgroundColor: "#E7EEF5", height: "30px" }}>
        <p style={{ fontSize: "11px", paddingTop: "5px" }}>
          PYMES 2020 © Francisco Vivas & Maria Eugenia Reyna
        </p>
      </div>
    </Row>
  );
}
