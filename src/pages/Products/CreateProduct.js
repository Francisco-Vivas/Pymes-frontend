import { Form, Input, InputNumber, Upload, Row, Col } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ButtonS,
  InputS,
  InputSWhite,
} from "../../components/styledComponents/antdStyled";
import { TitleS } from "../../components/styledComponents/Typography";
import { useContextInfo } from "../../hooks/auth.hooks";
import { createProductFn } from "../../services/products";
import axios from "axios";

const cloudinaryAPI =
  "https://api.cloudinary.com/v1_1/franciscovivascodes/image/upload";

export default function CreateProducts() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const { user, login } = useContextInfo();

  async function handleSubmit(values) {
    console.log({ ...values, image });
    const { data: newProduct } = await createProductFn({ ...values, image });
    console.log(newProduct);
    login({ ...user, productsID: [...user.productsID, newProduct._id] });
    return history.push("/products");
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
    data.append("upload_preset", "pymes-productImage");
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

  return (
    <Row justify="center" align="center">
      <Col xs={24} sm={18} md={12} lg={8}>
        <TitleS>New Product</TitleS>
        <Form
          form={form}
          layout="horizontal"
          wrapperCol={24}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Product Name:"
            rules={[
              {
                required: true,
                message: "Please input the product name!",
                min: 0,
              },
            ]}
          >
            <InputSWhite style={{ backgroundColor: "white" }} />
          </Form.Item>
          <Form.Item
            name="salePrice"
            label="Sale Price:"
            rules={[
              {
                required: true,
                message: "Please input a valid value!",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              defaultValue={1000}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item name="wholesalePrice" label="Wholesale Price:">
            <InputNumber
              defaultValue={0}
              style={{ width: "100%" }}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity:"
            rules={[
              {
                required: true,
                message: "Please input a valid quantity!",
              },
            ]}
          >
            <InputNumber defaultValue={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="threshold" label="Alert Low Quantity:">
            <InputNumber style={{ width: "100%" }} defaultValue={0} />
          </Form.Item>

          <Form.Item name="sku" label="SKU:">
            <InputSWhite />
          </Form.Item>

          <Form.Item name="image" label="Product Image:">
            <Upload
              showUploadList={false}
              listType="picture-card"
              beforeUpload={handleUploadFile}
              onPreview={onPreview}
              name="image"
            >
              {image ? (
                <img
                  src={image}
                  alt="product-image"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <ButtonS type="primary" size="middle" htmlType="submit">
            Create Product
          </ButtonS>
        </Form>
      </Col>
    </Row>
  );
}
