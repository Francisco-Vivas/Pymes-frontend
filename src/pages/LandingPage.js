import React from "react";
import { Layout, Button, Row } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useContextInfo } from "../hooks/auth.hooks";
import { logoutFn } from "../services/auth";
import { ButtonS } from '../components/styledComponents/antdStyled'

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
    <div>
      <div style={{ display: "flex", height: "600px", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <h1
            style={{
              textAlign: "left",
              color: "#4D5768",
              paddingLeft: "150px",
              fontSize: "2.5rem",
            }}
          >
            HELPING YOUR MICROBUSINESS <br />
            WORK IN MACRO WAYS
          </h1>
          <h4
            style={{
              textAlign: "left",
              color: "#4D5768",
              paddingLeft: "150px",
            }}
          >
            Pymes is your ally when it comes to the organization of your business
            <br />
            Keep track of your orders, clients, suppliers and much more!
            <br />
            What are your waiting to sign up?!
          </h4>
          <br />
          <br />
          <Link to="/signup">
            <Button
              shape="square"
              style={{ float: "left", marginLeft: "150px", color:"white", backgroundColor:"#4D5768", border:"none" }}
            >
              Sign Up!
            </Button>
          </Link>
        </div>
        <div style={{ width: "50%" }}>
          <img src="/images/1.png" style={{height:"400px"}}/>
        </div>
      </div>
      <div style={{ backgroundColor: "#E7EEF5" }}>
        <h1 style={{ paddingTop: "25px", color: "#4D5768", fontSize:"2rem" }}>PARTNERS</h1>
        <div
          style={{
            display: "flex",
            height: "200px",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <img
            src="/images/Amarea.png"
            style={{ height: "150px" }}
          />
          <img
            src="/images/Area.png"
            style={{ height: "100px" }}
          />
          <img
            src="/images/CS.png"
            style={{ height: "150px" }}
          />
          <img
            src="https://cdn.logojoy.com/wp-content/uploads/2018/08/23162125/apple-logo-1024x728.png"
            style={{ height: "150px" }}
          />
          <img
            src="https://cdn.logojoy.com/wp-content/uploads/2018/08/23162125/apple-logo-1024x728.png"
            style={{ height: "150px" }}
          />
        </div>
      </div>
      <div style={{ backgroundColor: "#4D5768", height: "400px", display:"flex", alignItems:"center", paddingLeft:"150px"}}>
        <img src='/images/3.png' style={{height:"350px"}}/>
        <div style={{paddingLeft:"150px"}}>
          <h1 style={{fontSize:"2rem", color:"white", textAlign:"left"}}>PREMIUM ANALYTICS </h1>
          <h4 style={{color:"white"}}>Get detailed analytics and projections from your sales and customers</h4>
        </div>
      </div>
      <div style={{ backgroundColor: "white", height: "500px", display:"flex", alignItems:"center" }}>
        <div style={{paddingLeft:"150px"}}>
          <h1 style={{fontSize:"2rem", color:"#4D5768", textAlign:"left"}}>GET NOTIFICATIONS </h1>
          <h4 style={{color:"#4D5768"}}>Get notifications when inventory is low, payments are due, and more!</h4>
        </div>
        <img src='/images/2.png' style={{height:"250px", paddingLeft:"150px"}}/>
      </div>
      <div style={{ backgroundColor: "#E7EEF5", height: "500px" }}>
        {/* Caracteristica 3 */}
      </div>
      <div style={{ backgroundColor: "white", height: "500px" }}>
        {/* Call to action */}
      </div>
    </div>
  );
}
