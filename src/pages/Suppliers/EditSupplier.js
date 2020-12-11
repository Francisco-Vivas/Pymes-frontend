import React, { useState, useEffect } from "react";
import { updateSupplier, getSupplierDetail } from "../../services/suppliers";
import { Link, useHistory } from "react-router-dom";
import { Form, Row, Col, Divider, List, Avatar } from "antd";
import {
  ButtonS,
  InputSWhite,
} from "../../components/styledComponents/antdStyled";
import { TextS, TitleS } from "../../components/styledComponents/Typography";
import AddProductModal from "../../components/AddProductModal";

export default function EditSupplier({
  match: {
    params: { suppliersID },
  },
}) {
  const [form] = Form.useForm();
  const history = useHistory();
  const [supplier, setSupplier] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await getSupplierDetail(suppliersID);
      setSupplier(data);
      setProductsList(data.products);
      form.setFieldsValue(data);
    }
    getData();
  }, []);

  async function handleSubmit(values) {
    const newValues = { ...values, products: productsList.map((e) => e._id) };
    console.log(newValues);
    const { data: newSupplier } = await updateSupplier(supplier._id, newValues);
    setSupplier(newSupplier);
    history.push(`/suppliers/${suppliersID}`);
  }

  const handlerRemoveItem = (id) => {
    setProductsList(productsList.filter((e) => e._id !== id));
  };

  const HandlerAddProduct = (values) => {
    console.log("HandlerAddProduct", values);
    const newUserItem = Object.keys(values).map((key) => {
      return values[key];
    });
    setProductsList([...newUserItem]);
  };

  return (
    supplier && (
      <Row justify="center" align="middle" gutter={[16, 16]}>
        <Col xs={24} sm={18} md={12} lg={8}>
          <TitleS level={1}>Edit your supplier</TitleS>
          <TextS type="secondary">Update your supplier details</TextS>
          <Divider />
          <Form
            form={form}
            layout="horizontal"
            onFinish={handleSubmit}
            initialValues={supplier}
          >
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
              <InputSWhite />
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
                      <ButtonS
                        onClick={() => handlerRemoveItem(item._id)}
                        danger
                      >
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
                Edit Supplier
              </ButtonS>
            </div>
          </Form>
        </Col>
      </Row>
    )
  );
}
