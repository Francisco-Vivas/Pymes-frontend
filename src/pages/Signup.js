import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Button,
  Typography,
  Divider,
  Select,
} from "antd";
import { signupFn } from "../services/auth";
import { useContextInfo } from "../hooks/auth.hooks";
import countryCodes from "country-codes-list";

const { Title, Text } = Typography;
const { Option } = Select;

const googleUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth/google"
    : "/auth/google";

export default function Signup({ history }) {
  const [countries, setCountries] = useState(null);
  const [form] = Form.useForm();
  const { user } = useContextInfo();

  useEffect(() => {
    if (user) history.push("/");
    async function getCountryCodes() {
      const countryCodesNames = countryCodes.customList(
        "countryCode",
        "(+{countryCallingCode}) {countryNameEn}"
      );
      const countryCodesValues = countryCodes.customList(
        "countryCode",
        "+{countryCallingCode}"
      );
      setCountries({ countryCodesNames, countryCodesValues });
    }
    getCountryCodes();
  }, []);

  async function onFinish(value) {
    await signupFn({
      ...value,
      cellphone: `${value.prefix}${value.cellphone}`,
    });
    history.push("/login");
  }

  const prefixPhoneNum = countries ? (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: "8rem", fontSize: "0.8rem" }}>
        {Object.keys(countries.countryCodesNames).map((key) => (
          <Option
            style={{}}
            key={key}
            value={countries.countryCodesValues[key]}
          >
            {countries.countryCodesNames[key]}
          </Option>
        ))}
      </Select>
    </Form.Item>
  ) : (
    <Form.Item initialValue="+57" name="prefix" noStyle>
      <Select style={{ width: "" }}>
        <Option stlye={{}} value="">
          (+57) Colombia
        </Option>
      </Select>
    </Form.Item>
  );

  return (
    <Row>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Title level={1}>Sign up</Title>
        <Text type="secondary">Welcome!</Text>
        <Divider />
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email:"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password:"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="userlastname"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Company Name" name="companyName">
            <Input />
          </Form.Item>

          <Form.Item label="Cellphone Number / WhatsApp" name="cellphone">
            <Input addonBefore={prefixPhoneNum} maxLength="10" />
          </Form.Item>

          <Button shape="round" type="primary" block htmlType="submit">
            Sign up
          </Button>
        </Form>
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
