import React, { useState, useEffect } from "react";
import {
  Form,
  Avatar,
  List,
  Select,
  DatePicker,
  Input,
  Divider,
  Modal,
} from "antd";
import { createOrder } from "../services/orders";
import { getAllClients } from "../services/clients";
import { useHistory } from "react-router-dom";
import { useContextInfo } from "../hooks/auth.hooks";
import { ButtonS, InputSWhite } from "./styledComponents/antdStyled";
import { TextS, TitleS } from "./styledComponents/Typography";
import AddProductModal from "./AddProductModal";
import CreateClient from "../pages/Clients/CreateClients";

export default function CreateOrderForm() {
  const [form] = Form.useForm();
  const history = useHistory();
  const { user, login } = useContextInfo();
  const [isModal, setIsModal] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [clients, setClients] = useState([]);
  const [isModalClient, setIsModalClient] = useState(false);

  useEffect(() => {
    async function getClients() {
      const { data } = await getAllClients();
      setClients(data);
    }
    getClients();
  }, [isModalClient]);

  const HandlerAddQuantity = (values) => {
    const newUserItem = Object.keys(values)
      .map((key) => {
        return values[key];
      })
      .filter((e) => e.quantity);

    setProductsList(newUserItem);
    setTotalValue(
      newUserItem.reduce((acc, cv) => acc + cv.salePrice * cv.quantity, 0)
    );
  };

  async function handleSubmit(values) {
    const order = {
      ...values,
      productsList,
      total: totalValue,
      date: values.date.format("YYYY-MM-DD"),
    };
    const { data: newOrder } = await createOrder(order);
    login({ ...user, ordersID: [...user.ordersID, newOrder._id] });
    return history.push("/orders");
  }

  const AddClientButton = (menu) => (
    <div>
      {menu}
      <Divider style={{ margin: "4px 0" }} />
      <ModalClient />
      <ButtonS
        type="secondary"
        onClick={() => setIsModalClient(!isModalClient)}
      >
        New Client
      </ButtonS>
    </div>
  );

  const ModalClient = () => (
    <Modal
      visible={isModalClient}
      title="New Client"
      okText="Done"
      cancelText="Cancel"
      onCancel={() => setIsModalClient(false)}
      onOk={() => setIsModalClient(false)}
    >
      <CreateClient inAModal={true} setIsModalClient={setIsModalClient} />
    </Modal>
  );

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
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="clientID" label="Client:">
        <Select dropdownRender={(menu) => AddClientButton(menu)}>
          {clients?.map((e) => (
            <Select.Option value={e._id}>{e.name}</Select.Option>
          ))}
        </Select>
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
                avatar={
                  <Avatar
                    src={item.image}
                    size="large"
                    style={{ marin: "auto" }}
                  />
                }
                title={item.name}
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
