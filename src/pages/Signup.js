import { useEffect } from "react";
import { Row, Col, Button, Divider } from "antd";
import { signupFn } from "../services/auth";
import { useContextInfo } from "../hooks/auth.hooks";
import FormDataUser from "../components/FormDataUser";
import { Titles } from "../components/styledComponents/Typography";

const googleUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth/google"
    : "/auth/google";

export default function Signup({ history }) {
  const { user } = useContextInfo();

  useEffect(() => {
    if (user) history.push("/");
  }, []);

  return (
    <Row justify="center" align="middle">
      <Col>
        <Titles level={1}>SIGN UP</Titles>
        <br />
        <FormDataUser onFinishFn={signupFn} isSignup={true} />
        <Divider>or</Divider>
        <a href={googleUrl}>
          <Button block shape="round">
            Sing up with Google
          </Button>
        </a>
      </Col>
    </Row>
  );
}
