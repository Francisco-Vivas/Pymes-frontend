import { Link, useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import { logoutFn } from "../services/auth";
import { useContextInfo } from "../hooks/auth.hooks";

const { Header, Content, Sider } = Layout;

export default function MainLayout({ children }) {
  const { logout } = useContextInfo();
  const history = useHistory();
  const { user } = useContextInfo();

  const handleLogout = async () => {
    await logoutFn();
    logout();
    history.push("/");
  };

  return (
    <Layout>
      <Header className="header" style={{ backgroundColor: "#164166" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ backgroundColor: "#164166" }}
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
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
            {/* <SubMenu key="sub1" title="subnav 1"> */}
            <Menu.Item key="1" style={{ color: "#164166" }}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" style={{ color: "#164166" }}>
              <Link to="/orders">Orders</Link>
            </Menu.Item>
            <Menu.Item key="3" style={{ color: "#164166" }}>
              Products
            </Menu.Item>
            <Menu.Item key="4" style={{ color: "#164166" }}>
              Suppliers
            </Menu.Item>
            <Menu.Item key="5" style={{ color: "#164166" }}>
              Analytics
            </Menu.Item>
            <Menu.Item key="6" style={{ color: "#164166" }}>
              Social
            </Menu.Item>
            {/* </SubMenu> */}
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
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
      </Layout>
    </Layout>
  );
}