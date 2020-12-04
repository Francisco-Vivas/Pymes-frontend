import { useEffect } from "react";
import { Row, Col, Button, Divider } from "antd";
import { signupFn } from "../services/auth";
import { useContextInfo } from "../hooks/auth.hooks";
import FormDataUser from "../components/FormDataUser";
import { TitleS } from "../components/styledComponents/Typography";

const googleUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth/google"
    : "/auth/google";

export default function Signup({ history }) {
  const { user } = useContextInfo();

  useEffect(() => {
    if (user) history.push("/dashboard");
  }, []);

  return (
    <Row justify="center" align="middle">
      <Col>
        <TitleS level={1}>SIGN UP</TitleS>
        <br />
        <FormDataUser onFinishFn={signupFn} isSignup={true} />
        <Divider>or</Divider>
        <a href={googleUrl}>
          <Button>Sing up with Google</Button>
        </a>
      </Col>
    </Row>
  );
}
