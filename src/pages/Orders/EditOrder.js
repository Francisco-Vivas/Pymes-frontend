import React, { useState, useEffect } from "react";
import { updateOrder, getOrderDetail } from "../../services/orders";
import { useHistory } from "react-router-dom";
import {
  Form,
  Select,
  Typography,
  Divider,
  Row,
  Col,
  Modal,
  List,
  Avatar,
  DatePicker,
  Input,
} from "antd";
import {
  InputSWhite,
  ButtonS,
} from "../../components/styledComponents/antdStyled";
import { TextS, TitleS } from "../../components/styledComponents/Typography";
import CreateClient from "../Clients/CreateClients";
import { getAllClients } from "../../services/clients";
import AddProductModal from "../../components/AddProductModal";

const { Text } = Typography;

export default function UpdateOrder({
  match: {
    params: { ordersID },
  },
}) {
  const [form] = Form.useForm();
  const history = useHistory();
  const [order, setOrder] = useState({});
  const [isModalClient, setIsModalClient] = useState(false);
  const [clients, setClients] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    async function getData() {
      const { data } = await getOrderDetail(ordersID);
      setOrder(data);
      const { data: clientes } = await getAllClients();
      setClients(clientes);
      const products = data.items.map((e, i) => {
        return {
          ...e,
          quantity: data.itemsQuantity[i],
          salePrice: data.itemsSalePrice[i],
          subtotal: data.itemsSubtotal[i],
        };
      });
      setProductsList(products);
      form.setFieldsValue({
        ...data,
        clientID: data.clientID._id,
      });
      setTotalValue(
        products.reduce((acc, cv) => acc + cv.salePrice * cv.quantity, 0)
      );
    }
    getData();
  }, []);

  useEffect(() => {
    async function getClients() {
      const { data } = await getAllClients();
      setClients(data);
    }
    getClients();
  }, [isModalClient]);

  const HandlerAddQuantity = (value) => {
    let isInTheArray = false;
    let newUserItem = productsList.map((e) => {
      if (e._id === value._id && e.salePrice === value.salePrice) {
        isInTheArray = true;
        return { ...e, quantity: e.quantity + value.quantity };
      } else {
        return e;
      }
    });
    newUserItem = isInTheArray ? newUserItem : [...productsList, value];
    setProductsList([...newUserItem]);
    setTotalValue(
      newUserItem.reduce((acc, cv) => acc + cv.salePrice * cv.quantity, 0)
    );
  };

  const handlerRemoveItem = (id) => {
    const newList = productsList.filter((e) => e._id !== id);
    setProductsList(newList);
    setTotalValue(
      newList.reduce((acc, cv) => acc + cv.salePrice * cv.quantity, 0)
    );
  };

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

  async function handleSubmit(values) {
    const updatedOrder = {
      ...values,
      productsList,
      total: totalValue,
    };
    const { data: newOrder } = await updateOrder(order._id, updatedOrder);
    setOrder(newOrder);
    history.push(`/orders/${ordersID}`);
  }

  return (
    order && (
      <Row align="center">
        <Col xs={24} sm={18} md={12} lg={12}>
          <TitleS level={1}>Edit your order</TitleS>
          <Text type="secondary">Update your order details</Text>
          <Divider />
          <Form
            form={form}
            layout="horizontal"
            onFinish={handleSubmit}
            initialValues={order}
          >
            <Form.Item name="date" label="Date:">
              <Input active disabled />
            </Form.Item>

            <Form.Item name="clientID" label="Client:">
              <Select dropdownRender={(menu) => AddClientButton(menu)}>
                {clients.map((e) => (
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
                    key={item._id}
                    actions={[
                      <p>
                        Subtotal:{" "}
                        {`$${item.quantity * item.salePrice}`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )}
                      </p>,
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
                Edit Order
              </ButtonS>
            </div>
          </Form>
        </Col>
      </Row>
    )
  );
}
