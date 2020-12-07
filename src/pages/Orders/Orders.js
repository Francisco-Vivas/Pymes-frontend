import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../services/orders";
import { ButtonS } from "../../components/styledComponents/antdStyled"


export default function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    async function getOrders(){
      const { data } = await getAllOrders()
      setOrders(data)
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
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
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
      // render: payments => (
      //   <span>
      //     {payments?.map(payment => {
      //       let color = payment === "PAID" ? 'green' : 'red';
      //       return (
      //         <Tag color={color} key={payment}>
      //           {payment.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </span>
      // ),
    },
    {
      title: "Fulfillment",
      dataIndex: "fulfillment",
      key: "fulfillment",
      // render: fulfillments => (
      //   <span>
      //     {fulfillments.map(fulfillment => {
      //       let color = fulfillment === "FULFILLED" ? 'green' : 'red';
      //       return (
      //         <Tag color={color} key={fulfillment}>
      //           {fulfillment.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </span>
      // ),
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
      customer: order.customer,
      total: order.total,
      payment: order.payment,
      fulfillment: order.fulfillment,
      extra: order.extra,
      details: <Link to={`/orders/${order._id}`}><ButtonS type="secondary">Order Details</ButtonS></Link>
    }})
    

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
      {/* <Modal
        visible={showModal}
        title="Create New Order"
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        footer={null}>
      </Modal> */}
    </div>
  );
}