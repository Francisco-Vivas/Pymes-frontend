import { useHistory } from "react-router-dom";
import { Form, Input, Button, Select, Upload, Skeleton } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import countryCodes from "country-codes-list";
import { useEffect, useState } from "react";
import { useContextInfo } from "../hooks/auth.hooks";
import axios from "axios";

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
    const dataUpdated = {
      ...value,
      cellphone: value.cellphone || "",
      image,
    };

    await onFinishFn(dataUpdated);

    if (logUpdate) logUpdate(dataUpdated);
    if (isSignup) return history.push("/login");
    return history.push("/profile");
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
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={user}
    >
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
      <Form.Item label="Image:">
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
  ) : (
    <Skeleton loading={!Boolean(user)} active></Skeleton>
  );
};

export default FormDataUser;