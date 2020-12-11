import { useHistory } from "react-router-dom";
import { Form, Select, Upload, Skeleton, message, Spin } from "antd";
import {
  InputS,
  InputSWhite,
  InputPassS,
  ButtonS,
} from "./styledComponents/antdStyled";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import countryCodes from "country-codes-list";
import { useEffect, useState } from "react";
import { useContextInfo } from "../hooks/auth.hooks";
import axios from "axios";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const cloudinaryAPI =
  "https://api.cloudinary.com/v1_1/franciscovivascodes/image/upload";

const { Option } = Select;

const FormDataUser = ({ onFinishFn, isSignup = true, logUpdate = null }) => {
  const [countries, setCountries] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [form] = Form.useForm();
  const { user } = useContextInfo();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
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
      if (user) setImage(user.image);
    }
    getCountryCodes();
  }, []);

  async function onFinish(value) {
    setIsDone(true);
    const dataUpdated = {
      ...value,
      cellphone: value.cellphone || "",
      image,
    };
    try {
      await onFinishFn(dataUpdated);
      if (logUpdate) logUpdate(dataUpdated);
      if (isSignup) return history.push("/login");
      return history.push("/profile");
    } catch (err) {
      console.dir(err.response.data.err.message);
      message.error(err.response.data.err.message);
    }
  }

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  async function handleUploadFile(file) {
    setLoading(true);

    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "pymes-companyImage");
    const {
      data: { secure_url },
    } = await axios.post(cloudinaryAPI, data);

    setImage(secure_url);
    setLoading(false);
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
  ) : user ? (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: "" }}>
        <Option style={{}} value=""></Option>
      </Select>
    </Form.Item>
  ) : (
    <Form.Item initialValue="+57" name="prefix" noStyle>
      <Select style={{ width: "" }}>
        <Option style={{}} value=""></Option>
      </Select>
    </Form.Item>
  );

  return isSignup || user ? (
    <Form
      layout="horizontal"
      wrapperCol={24}
      form={form}
      onFinish={onFinish}
      initialValues={user}
    >
      <Form.Item label="Company Name:" name="companyName">
        {isSignup ? <InputS /> : <InputSWhite />}
      </Form.Item>

      <Form.Item
        label="First Name:"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        {isSignup ? <InputS /> : <InputSWhite />}
      </Form.Item>

      <Form.Item
        label="Last Name:"
        name="userlastname"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        {isSignup ? <InputS /> : <InputSWhite />}
      </Form.Item>

      <Form.Item label="Phone" name="cellphone">
        {isSignup ? (
          <InputS
            className="signin"
            addonBefore={prefixPhoneNum}
            maxLength="10"
          />
        ) : (
          <InputSWhite
            addonBefore={prefixPhoneNum}
            maxLength="10"
            style={{ backgroundColor: "#f0f2f5" }}
          />
        )}
      </Form.Item>

      <Form.Item label="Address:" name="address">
        {isSignup ? <InputS /> : <InputSWhite />}
      </Form.Item>

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
        {isSignup ? <InputS /> : <InputSWhite />}
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
          <InputPassS />
        </Form.Item>
      ) : (
        <></>
      )}

      <Form.Item label="Company Logo:">
        <ImgCrop rotate>
          <Upload
            showUploadList={false}
            listType="picture-card"
            beforeUpload={handleUploadFile}
            onPreview={onPreview}
            name="image"
          >
            {image ? (
              <img src={image} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </ImgCrop>
      </Form.Item>
      {isDone ? (
        <Spin indicator={antIcon} style={{ margin: "auto" }} />
      ) : (
        <ButtonS type="primary" htmlType="submit">
          {isSignup ? "Sign up" : "Edit Profile"}
        </ButtonS>
      )}
    </Form>
  ) : (
    <Skeleton loading={!Boolean(user)} active></Skeleton>
  );
};

export default FormDataUser;
