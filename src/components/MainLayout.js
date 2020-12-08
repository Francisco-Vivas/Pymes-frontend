import { Link, useHistory } from "react-router-dom";
import { Layout, Menu, Divider } from "antd";
import { logoutFn } from "../services/auth";
import { useContextInfo } from "../hooks/auth.hooks";
import { useEffect } from "react";

const { Header, Content, Sider } = Layout;

export default function MainLayout({ children }) {
  const { user, logout } = useContextInfo();
  const history = useHistory();

  const handleLogout = async () => {
    await logoutFn();
    logout();
    history.push("/");
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Header
        className="header"
        style={{
          backgroundColor: "#81A1C1",
          color: "#f0f2f5",
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{
            backgroundColor: "#81A1C1",
            color: "#f0f2f5",
            textAlign: "right",
          }}
        >
          <img src='/images/Pymes-logo.png' style={{height:"50px", float:"left", marginTop:"7px", paddingLeft:"20px"}}/>
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
      <Layout style={{ height: "100%" }}>
        {user ? (
          <Sider
            className="site-layout-background"
            style={{
              width: "20%",
              backgroundColor: "#FFFFFF!important",
              height: "100%",
            }}
          >
            <Menu
              mode="inline"
              style={{
                height: "100%",
                borderRight: 0,
              }}
            >
              <Menu.Item key="1" style={{ color: "#4D5768" }}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" style={{ color: "#4D5768" }}>
                <Link to="/orders">Orders</Link>
              </Menu.Item>
              <Menu.Item key="3" style={{ color: "#4D5768" }}>
                <Link to="/products">Products</Link>
              </Menu.Item>
              <Menu.Item key="4" style={{ color: "#4D5768" }}>
                <Link to="/suppliers">Suppliers</Link>
              </Menu.Item>
              <Menu.Item
                key="5"
                style={{ color: "#4D5768", marginBottom: "100%" }}
              >
                Analytics
              </Menu.Item>
              <Divider />
              <Menu.Item key="7" style={{ color: "#4D5768" }}>
                <Link to="/profile">Profile</Link>
              </Menu.Item>
            </Menu>
          </Sider>
        ) : (
          <> </>
        )}
        {user ? (
          <Layout style={{ backgroundColor: "#F0F2F5" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                backgroundColor: "#F0F2F5",
              }}
            >
              <div className="site-layout-content">{children}</div>
            </Content>
          </Layout>
        ) : (
          <Layout style={{ padding: "0 24px 24px", backgroundColor: "#FFF" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <div className="site-layout-content">{children}</div>
            </Content>
          </Layout>
        )}
      </Layout>
    </Layout>
  );
}
