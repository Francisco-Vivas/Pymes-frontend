import React, { useState } from "react";
import { Form, Button, Modal, Avatar, List, Select } from "antd";
import { createOrder } from "../services/orders";
import { useHistory } from "react-router-dom";
import { useContextInfo } from "../hooks/auth.hooks";
import { ButtonS, InputS, InputSWhite } from "./styledComponents/antdStyled";
import SearchBarList from "./SearchBarList";
import { TextS, TitleS } from "./styledComponents/Typography";

function AddProduct({ isModal = false, setIsModal, HandlerAddQuantity }) {
  const [modalForm] = Form.useForm();
  return (
    <Modal
      visible={isModal}
      title="Add your products"
      okText="Done"
      cancelText="Cancel"
      onCancel={() => setIsModal(false)}
      onOk={() => setIsModal(false)}
    >
      <SearchBarList HandlerAddQuantity={HandlerAddQuantity} />
    </Modal>
  );
}

export default function CreateOrderForm({ addOrder }) {
  const [form] = Form.useForm();
  const history = useHistory();
  const { user, login } = useContextInfo();
  const [isModal, setIsModal] = useState(false);
  const [productsList, setProductsList] = useState([]);
  console.log(productsList);
  const HandlerAddQuantity = (value) => {
    let isInTheArray = false;
    let newUserItem = productsList.map((e) => {
      if (e.name === value.name) {
        isInTheArray = true;
        return { ...e, quantity: e.quantity + value.quantity };
      } else {
        return e;
      }
    });
    newUserItem = isInTheArray ? newUserItem : [...productsList, value];
    setProductsList([...newUserItem]);
  };

  async function handleSubmit(values) {
    const order = { ...values };
    const { data: newOrder } = await createOrder(order);
    login({ ...user, ordersID: [...user.ordersID, newOrder._id] });
    return history.push("/orders");
  }

  return (
    <Form form={form} layout="horizontal" onFinish={handleSubmit}>
      <Form.Item name="date" label="Date:">
        <InputSWhite />
      </Form.Item>
      <Form.Item name="customer" label="Customer:">
        <InputSWhite />
      </Form.Item>
      <Form.Item name="payment" label="Payment:">
        <Select>
          <Select.Option value="UNPAID">UNPAID</Select.Option>
          <Select.Option value="PAID">PAID</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="fulfillment" label="Fulfillment:">
        <Select>
          <Select.Option value="PENDING">PENDING</Select.Option>
          <Select.Option value="FULFILLED">FULFILLED</Select.Option>
          <Select.Option value="CANCELLED">CANCELLED</Select.Option>
        </Select>
      </Form.Item>

      <AddProduct
        isModal={isModal}
        setIsModal={setIsModal}
        HandlerAddQuantity={HandlerAddQuantity}
      />

      <List
        style={{ margin: "1rem" }}
        itemLayout="horizontal"
        dataSource={productsList}
        renderItem={(item) => (
          <List.Item
            actions={[
              <p>
                Subtotal:{" "}
                {`$${item.quantity * item.salePrice}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}
              </p>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.image} style={{ marin: "auto" }} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={
                <TextS>
                  <small>
                    {`Price: $${item.salePrice}`.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}{" "}
                    <br />
                    Quantity: {item.quantity}
                  </small>
                </TextS>
              }
            />
          </List.Item>
        )}
      />
      <TitleS level={5}>
        TOTAL : $
        {`${productsList.reduce(
          (acc, cv) => acc + cv.salePrice * cv.quantity,
          0
        )}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </TitleS>

      <ButtonS
        type="secondary"
        style={{ marginBottom: "1.5rem" }}
        onClick={() => setIsModal(!isModal)}
      >
        Add Items
      </ButtonS>

      <Form.Item name="extra" label="Comments:">
        <InputSWhite />
      </Form.Item>

      <ButtonS type="primary" htmlType="submit" size="middle">
        Create Order
      </ButtonS>
    </Form>
  );
}
