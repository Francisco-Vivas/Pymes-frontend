import React from 'react'
import { Layout, Menu, Divider, Button } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useContextInfo } from "../hooks/auth.hooks"
import { logoutFn } from "../services/auth";


const { Header, Content, Sider } = Layout;

export default function LandingPage(){
    const { logout } = useContextInfo()
    const { user } = useContextInfo()
    const history = useHistory()

    const handleLogout = async () => {
        await logoutFn();
        logout();
        history.push("/");
    };

    return(
    <div>
        <Header className="header" style={{ backgroundColor: "#81A1C1" }}>
            <div className="logo" />
            <Menu
            theme="dark"
            mode="horizontal"
            style={{ backgroundColor: "#81A1C1", textAlign:"right" }}
            >
            {user ? (
                <>
                <Menu.Item key="1" style={{ color: "#dce9ed" }}>
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item
                    onClick={handleLogout}
                    key="3"
                    style={{ color: "#dce9ed" }}
                >
                    Log Out
                </Menu.Item>
                </>
            ) : (
                <>
                <Menu.Item key="1" style={{ color: "#dce9ed" }}>
                    <Link to="/login">Log In</Link>
                </Menu.Item>
                <Menu.Item key="2" style={{ color: "#dce9ed" }}>
                    <Link to="/signup">Sign Up</Link>
                </Menu.Item>
                </>
            )}
            </Menu>
        </Header>
        <div style={{display:"flex", height:"600px", alignItems:"center"}}>
            <div style={{display:"flex", flexDirection:"column", width:"50%"}}>
                <h1 style={{textAlign:"left", color:"#4D5768", paddingLeft:"150px", fontSize:"2.2rem"}}>
                    HELPING YOUR MICROBUSINESS <br/>WORK IN MACRO WAYS
                </h1>
                <h3 style={{textAlign:"left", color:"#4D5768", paddingLeft:"150px"}}>
                    Pymes is your ally when it comes to the organization of your business<br/>
                    Keep track of your orders, clients, suppliers and much more!<br/>
                    What are your waiting to sign up?!
                </h3>
                <br/>
                <br/>
                <Link to="/signup">
                    <Button shape="square" style={{float:"left", marginLeft:"150px"}}>
                        Sign Up!
                    </Button>
                </Link>
            </div>
            <div style={{width:"50%", }}>
                {/* IMAGEN PRINCIPAL DEL LANDING PAGE */}
            </div>
        </div>
        <div style={{backgroundColor: "#E7EEF5"}}>
            <h1 style={{paddingTop:"25px", color:"#4D5768"}}>PARTNERS</h1>
            <div style={{display:"flex", height:"200px", alignItems:"center", justifyContent:"space-around"}}>
                <img src='https://cdn.logojoy.com/wp-content/uploads/2018/08/23162125/apple-logo-1024x728.png' style={{height:"150px"}}/>
                <img src='https://cdn.logojoy.com/wp-content/uploads/2018/08/23162125/apple-logo-1024x728.png' style={{height:"150px"}}/>
                <img src='https://cdn.logojoy.com/wp-content/uploads/2018/08/23162125/apple-logo-1024x728.png' style={{height:"150px"}}/>
                <img src='https://cdn.logojoy.com/wp-content/uploads/2018/08/23162125/apple-logo-1024x728.png' style={{height:"150px"}}/>
                <img src='https://cdn.logojoy.com/wp-content/uploads/2018/08/23162125/apple-logo-1024x728.png' style={{height:"150px"}}/>
            </div>
        </div>
        <div style={{backgroundColor:"#4D5768", height:"500px"}}>
        {/* Caracteristica 1 */}
        </div>
        <div style={{backgroundColor:"white", height:"500px"}}>
        {/* Caracteristica 2 */}
        </div>
        <div style={{backgroundColor:"#E7EEF5", height:"500px"}}>
        {/* Caracteristica 3 */}
        </div>
        <div style={{backgroundColor:"white", height:"500px"}}>
        {/* Call to action */}
        </div>
    </div>
    )
}