import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../services/orders";
import { ButtonS } from "../../components/styledComponents/antdStyled";

export default function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    async function getOrders() {
      const { data } = await getAllOrders();
      setOrders(data);
    }
    getOrders();
  }, []);

  const columns = [
    {
      title: "Order #",
      dataIndex: "orderNum",
      key: "orderNum",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Client",
      dataIndex: "clientID",
      key: "clientID",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Fulfillment",
      dataIndex: "fulfillment",
      key: "fulfillment",
    },
    {
      title: "Comments",
      dataIndex: "extra",
      key: "extra",
    },
    {
      title: "",
      dataIndex: "details",
      key: "details",
    },
  ];

  const dataSource = orders?.map((order) => {
    return {
      key: order._id,
      orderNum: order.orderNum,
      date: order.date,
      clientID: order.clientID?.name,
      total: `$ ${order.total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      payment: order.payment,
      fulfillment: order.fulfillment,
      extra: order.extra,
      details: (
        <Link to={`/orders/${order._id}`}>
          <ButtonS type="secondary">Order Details</ButtonS>
        </Link>
      ),
    };
  });

  return (
    <div>
      <Link to="/orders/create-order">
        <Button
          style={{
            float: "left",
            color: "#4D5768",
            border: "1px dashed #4D5768",
          }}
        >
          {" "}
          New Order{" "}
        </Button>
      </Link>
      <br />
      <br />
      <Table dataSource={dataSource} columns={columns}></Table>
    </div>
  );
}
