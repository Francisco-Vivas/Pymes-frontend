import React, { useEffect, useState } from "react";
import { getOrderDetail, updateOrder } from "../../services/orders";
import {
  Divider,
  Button,
  Skeleton,
  Typography,
  Form,
  Select,
  Input,
  List,
} from "antd";
import { TextS, TitleS } from "../../components/styledComponents/Typography";
import { ButtonS, InputS } from "../../components/styledComponents/antdStyled";
import { Link, useHistory } from "react-router-dom";
import Avatar from "antd/lib/avatar/avatar";

const OrderDetail = ({
  match: {
    params: { ordersID },
  },
}) => {
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  // const [order, setOrder] = useState({})
  // const { date, customer, payment, fulfillment, extra, _id } = order

  const [orders, setOrders] = useState({});

  useEffect(() => {
    async function getDetails() {
      const { data } = await getOrderDetail(ordersID);
      setOrders(data);
    }
    getDetails();
  }, [ordersID]);

  async function handleSubmit(values) {
    const updatedOrder = { ...orders, values };
    const { data: newOrder } = await updateOrder(orders._id, updatedOrder);
    setOrders(newOrder);
    // setEdit(false)
  }

  const {
    date,
    customer,
    total,
    payment,
    fulfillment,
    items,
    extra,
    itemsQuantity,
    itemsSalePrice,
    itemsSubtotal,
    orderNum,
  } = orders;

  return (
    // <>{!edit &&
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          <TitleS level={2}>ORDER # {orderNum}</TitleS>
          <TitleS level={5}>Customer: {customer}</TitleS>
        </div>
        <div>
          <TitleS level={5}>{date}</TitleS>
        </div>
      </div>
      <Divider />
      <div>
        <TitleS level={5} style={{ textAlign: "left" }}>
          Order Summary
        </TitleS>
        <div style={{ height: "400px" }}>
          <List
            style={{
              margin: "0.5rem",
              marginTop: "1rem",
            }}
            pagination={{
              pageSize: 4,
            }}
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item, index) => {
              return (
                <List.Item
                  actions={[
                    <p>
                      Subtotal:{" "}
                      {`$${itemsSubtotal[index]}`.replace(
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
                        style={{ marin: "auto" }}
                        size="large"
                      />
                    }
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={
                      <TextS>
                        <small>
                          {`Price: $${itemsSalePrice[index]}`.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}{" "}
                          <br />
                          Quantity: {itemsQuantity[index]}
                        </small>
                      </TextS>
                    }
                  />
                </List.Item>
              );
            }}
          />
        </div>
        <br />
        <TitleS level={4} style={{ float: "right" }}>
          TOTAL ${total}
        </TitleS>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <div>
            {payment === "PAID" ? (
              <p
                style={{
                  backgroundColor: "#A3BE8C",
                  color: "white",
                  padding: "5px 10px",
                  margin: "10px",
                }}
              >
                PAID
              </p>
            ) : (
              <p
                style={{
                  backgroundColor: "#BF616A",
                  color: "white",
                  padding: "5px 10px",
                  margin: "10px",
                }}
              >
                UNPAID
              </p>
            )}
          </div>
          <div>
            {fulfillment === "PENDING" ? (
              <p
                style={{
                  backgroundColor: "#EBCB8B",
                  color: "white",
                  padding: "5px 10px",
                  margin: "10px",
                }}
              >
                PENDING
              </p>
            ) : fulfillment === "FULFILLED" ? (
              <p
                style={{
                  backgroundColor: "#A3BE8C",
                  color: "white",
                  padding: "5px 10px",
                  margin: "10px",
                }}
              >
                FULFILLED
              </p>
            ) : (
              <p
                style={{
                  backgroundColor: "#BF616A",
                  color: "white",
                  padding: "5px 10px",
                  margin: "10px",
                }}
              >
                CANCELLED
              </p>
            )}
          </div>
        </div>
        <div>
          <ButtonS type="secondary" style={{ margin: "10px" }}>
            Export Invoice
          </ButtonS>
          <Link to={`/orders/${orders._id}/edit`}>
            <ButtonS
              type="primary"
              style={{ margin: "10px" }}
              // onClick={() => {setEdit(true)}}
            >
              Edit Order
            </ButtonS>
          </Link>
        </div>
      </div>
    </div>
    // }
    // {edit && <Form form={form} layout="vertical" onSubmit={handleSubmit} initialValues={orders}>
    //     <Form.Item name="date" label="Date:">
    //         <Input />
    //     </Form.Item>
    //     <Form.Item name="customer" label="Customer:">
    //         <InputS />
    //     </Form.Item>
    //     <Form.Item name="payment" label="Payment:">
    //         <Select>
    //             <Select.Option value="UNPAID">UNPAID</Select.Option>
    //             <Select.Option value="PAID">PAID</Select.Option>
    //         </Select>
    //     </Form.Item>
    //     <Form.Item name="fulfillment" label="Fulfillment:">
    //         <Select>
    //             <Select.Option value="PENDING">PENDING</Select.Option>
    //             <Select.Option value="FULFILLED">FULFILLED</Select.Option>
    //             <Select.Option value="CANCELLED">CANCELLED</Select.Option>
    //         </Select>
    //     </Form.Item>
    //     {/* <Form.Item name="items" label="Items:">
    //         <InputNumber />
    //     </Form.Item> */}
    //     <Form.Item name="extra" label="Comments:">
    //         <InputS />
    //     </Form.Item>
    //     <ButtonS type="primary" htmlType="submit" onClick={() => {setEdit(false)}}>Edit Order</ButtonS>
    // </Form>}</>
  );
};

export default OrderDetail;
