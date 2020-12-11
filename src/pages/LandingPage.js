import React from "react";
import { Layout, Button, Row } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useContextInfo } from "../hooks/auth.hooks";
import { logoutFn } from "../services/auth";
import { ButtonS } from '../components/styledComponents/antdStyled'
import { TitleS } from '../components/styledComponents/Typography'

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
            src="/images/4.png"
            style={{ height: "150px" }}
          />
          <img
            src="/images/5.png"
            style={{ height: "150px" }}
          />
        </div>
      </div>
      <div style={{padding:"30px", backgroundColor:"#88C0D0"}}>
        <h1 style={{textAlign:"center", color:"white", fontSize:"2rem"}}>FOCUS ON YOUR GROWTH, LET US TAKE CARE OF THE REST</h1>
      </div>

      <div style={{ backgroundColor: "white", height: "400px", display:"flex", alignItems:"center" }}>
        <div style={{paddingLeft:"150px"}}>
          <h1 style={{fontSize:"2rem", color:"#4D5768", textAlign:"left"}}>GET EVERYTHING IN ONE PLACE</h1>
          <h4 style={{color:"#4D5768", textAlign:"left"}}>
          Get notifications when inventory is below a specific quantity, which
          <br/>
          you get to specify. 
          <br/>
          Visualize a summary of useful data un the dashboard, along with some of your 
          <br/>
          top products, and get all your orders, clients, suppliers and products' information in one useful place.
          </h4>
        </div>
        <img src='/images/2.png' style={{height:"250px", paddingLeft:"150px"}}/>
      </div>
      <div style={{ backgroundColor: "#81A1C1", height: "400px", display:"flex", alignItems:"center", paddingLeft:"150px"}}>
        <img src='/images/3.png' style={{height:"350px"}}/>
        <div style={{paddingLeft:"150px"}}>
          <h1 style={{fontSize:"2rem", color:"white", textAlign:"left"}}>PREMIUM ANALYTICS </h1>
          <h4 style={{color:"white", textAlign:"left"}}>
            Get detailed analytics and projections from your sales and customers.
            <br/> 
            Visualize in friendly graphics sales over specific periods of time,
            <br/>
            among many other usefull information.
          </h4>
        </div>
      </div>
     
      <div style={{ backgroundColor: "#E7EEF5", height: "30px" }}>

        <p style={{fontSize:"11px", paddingTop:"5px"}}>PYMES 2020 © Francisco Vivas & Maria Eugenia Reyna</p>
      </div>
    </div>
  );
}
