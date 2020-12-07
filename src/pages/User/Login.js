import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Divider, message } from "antd";
import { loginFn } from "../../services/auth";
import { useContextInfo } from "../../hooks/auth.hooks";
import { useEffect } from "react";
import { TitleS, TextS } from "../../components/styledComponents/Typography";
import {
  InputS,
  InputPassS,
  ButtonS,
} from "../../components/styledComponents/antdStyled";

const Login = ({ history }) => {
  const { user, login } = useContextInfo();
  if (user) history.goBack();

  useEffect(() => {
    if (user) history.push("/");
  }, []);

  const googleUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/auth/google"
      : "/auth/google";

  const onFinish = async (value) => {
    try {
<<<<<<< HEAD
    const { data } = await loginFn(value);
    login(data);
    history.push("/");
    } catch(err) {
      message.error("Error with email or password")
=======
      const { data } = await loginFn(value);
      login(data);
      history.push("/");
    } catch (err) {
      message.error("Error with email or password");
>>>>>>> 4ec568df3a0d1f914664939828c7a82c58ed4d11
    }
  };

  return (
    <Row justify="center" align="middle" gutter={[16, 16]}>
      <Col>
        <TitleS level={1}>LOGIN</TitleS>
        <TextS type="secondary">Is awesome to see you again!</TextS>
        <Divider />
        <Form
          layout="horizontal"
          wrapperCol={24}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <InputS />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <InputPassS />
          </Form.Item>

          <Form.Item>
            <ButtonS type="primary" htmlType="submit">
              Login
            </ButtonS>
          </Form.Item>

          <TextS>
            If you don't have an account yet, you can create an account{" "}
            <Link to="/signup">here</Link>.
          </TextS>
        </Form>
        <Divider>or</Divider>
        <a href={googleUrl}>
          <Button>Login with Google</Button>
        </a>
      </Col>
    </Row>
  );
};

export default Login;
