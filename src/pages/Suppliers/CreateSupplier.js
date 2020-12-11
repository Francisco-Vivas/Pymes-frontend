import React, { useState } from "react";
import { Form, Col, Row, Divider, List, DatePicker } from "antd";
import { createSupplier } from "../../services/suppliers";
import { useHistory } from "react-router-dom";
import { useContextInfo } from "../../hooks/auth.hooks";
import {
  ButtonS,
  InputSWhite,
} from "../../components/styledComponents/antdStyled";
import { TitleS } from "../../components/styledComponents/Typography";
import Avatar from "antd/lib/avatar/avatar";
import AddProductModal from "../../components/AddProductModal";

export default function CreateSupplier({}) {
  const [form] = Form.useForm();
  const history = useHistory();
  const { user, login } = useContextInfo();
  const [isModal, setIsModal] = useState(false);
  const [productsList, setProductsList] = useState([]);

  async function handleSubmit(values) {
    const supplier = { ...values, products: productsList.map((e) => e._id) };
    const { data: newSupplier } = await createSupplier(supplier);
    login({ ...user, suppliersID: [...user.suppliersID, newSupplier._id] });
    return history.push("/suppliers");
  }
  const handlerRemoveItem = (id) => {
    setProductsList(productsList.filter((e) => e._id !== id));
  };

  const HandlerAddProduct = (value) => {
    console.log(value);
    const newProduct = productsList.find((e) => e._id === value._id)
      ? productsList
      : [...productsList, value];
    setProductsList([...newProduct]);
  };

  return (
    <Row justify="center" align="middle" gutter={[16, 16]}>
      <Col xs={24} sm={18} md={12} lg={8}>
        <TitleS level={1}>New Supplier</TitleS>
        <Divider />
        <Form form={form} layout="horizontal" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name:">
            <InputSWhite />
          </Form.Item>
          <Form.Item name="phone" label="Phone:">
            <InputSWhite />
          </Form.Item>
          <Form.Item name="email" label="Email:">
            <InputSWhite />
          </Form.Item>
          <Form.Item name="channel" label="Channel:">
            <InputSWhite />
          </Form.Item>
          <Form.Item name="lastOrder" label="Last Order:">
            <DatePicker />
          </Form.Item>

          <AddProductModal
            isModal={isModal}
            setIsModal={setIsModal}
            HandlerAddQuantity={HandlerAddProduct}
            isSupplier={true}
          />

          <List
            style={{
              margin: "0.5rem",
            }}
            pagination={{
              pageSize: 4,
            }}
            itemLayout="horizontal"
            dataSource={productsList}
            renderItem={(item) => {
              return (
                <List.Item
                  actions={[
                    <ButtonS onClick={() => handlerRemoveItem(item._id)} danger>
                      Remove
                    </ButtonS>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.image} style={{ marin: "auto" }} />
                    }
                    title={item.name}
                  />
                </List.Item>
              );
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <ButtonS
              type="secondary"
              style={{ marginBottom: "1.5rem" }}
              onClick={() => setIsModal(!isModal)}
            >
              Add Items
            </ButtonS>

            <ButtonS type="primary" htmlType="submit">
              Add New Supplier
            </ButtonS>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
