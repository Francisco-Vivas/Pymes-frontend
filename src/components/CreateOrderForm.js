import React, { useState } from "react";
import { Form, Avatar, List, Select, DatePicker } from "antd";
import { createOrder } from "../services/orders";
import { useHistory } from "react-router-dom";
import { useContextInfo } from "../hooks/auth.hooks";
import { ButtonS, InputSWhite } from "./styledComponents/antdStyled";
import { TextS, TitleS } from "./styledComponents/Typography";
import AddProductModal from "./AddProductModal";

export default function CreateOrderForm() {
  const [form] = Form.useForm();
  const history = useHistory();
  const { user, login } = useContextInfo();
  const [isModal, setIsModal] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const [items, setItems] = useState([]);
  const [itemsQuantity, setItemsQuantity] = useState([]);
  const [itemsSalePrice, setItemsSalePrice] = useState([]);
  const [itemsSubtotal, setItemsSubtotal] = useState([]);

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
    setTotalValue(
      productsList.reduce((acc, cv) => acc + cv.salePrice * cv.quantity, 0)
    );
    for (let item of productsList) {
      setItems([...items, item._id]);
      setItemsQuantity([...itemsQuantity, item.quantity]);
      setItemsSalePrice([...itemsSalePrice, item.salePrice]);
      setItemsSubtotal([...itemsSubtotal, item.salePrice * item.quantity]);
    }
  };

  async function handleSubmit(values) {
    const order = {
      ...values,
      items,
      itemsQuantity,
      itemsSalePrice,
      itemsSubtotal,
      total: totalValue,
      date: values.date.format("YYYY-MM-DD"),
    };
    const { data: newOrder } = await createOrder(order);
    login({ ...user, ordersID: [...user.ordersID, newOrder._id] });
    return history.push("/orders");
  }

  return (
    <Form
      form={form}
      layout="horizontal"
      onFinish={handleSubmit}
      initialValues={{
        fulfillment: "PENDING",
        payment: "UNPAID",
      }}
    >
      <Form.Item name="date" label="Date:">
        {/* <InputSWhite /> */}
        <DatePicker style={{ width: "100%" }} />
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

      <Form.Item name="extra" label="Comments:">
        <InputSWhite />
      </Form.Item>

      <AddProductModal
        isModal={isModal}
        setIsModal={setIsModal}
        HandlerAddQuantity={HandlerAddQuantity}
      />

      <List
        style={{
          margin: "0.5rem",
        }}
        pagination={{
          pageSize: 3,
        }}
        itemLayout="horizontal"
        dataSource={productsList}
        renderItem={(item) => {
          return (
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
          );
        }}
      />

      <TitleS level={5}>
        TOTAL : ${`${totalValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </TitleS>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <ButtonS
          type="secondary"
          style={{ marginBottom: "1.5rem" }}
          onClick={() => setIsModal(!isModal)}
        >
          Add Items
        </ButtonS>

        <ButtonS type="primary" htmlType="submit" size="middle">
          Create Order
        </ButtonS>
      </div>
    </Form>
  );
}
