import React from "react";
import { useHistory } from "react-router-dom";

const history = useHistory();

const FormDataUser = ({ countries, onFinishFn, isSignup = true }) => {
  const [form] = Form.useForm();

  async function onFinish(value) {
    await onFinishFn({
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
      {isSignup ? (
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
      ) : (
        <></>
      )}

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
        {isSignup ? "Sign up" : "Edit Profile"}
      </Button>
    </Form>
  );
};

export default FormDataUser;
