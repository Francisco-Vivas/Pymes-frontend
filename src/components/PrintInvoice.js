import React, { useReducer, Component } from "react";
import { Row, Col, Table, Divider } from "antd";
// import OrderDetail from '../pages/Orders/OrderDetail'
// import { useContextInfo } from "../hooks/auth.hooks";

export default class PrintInvoice extends Component {
  constructor(props) {
    super();
    this.state = {
      columns: [
        {
          title: "Product",
          dataIndex: "product",
          key: "product",
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Unit Price",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "Subtotal",
          dataIndex: "subtotal",
          key: "subtotal",
        },
      ],
    };
  }

  render() {
    const { user, orders } = this.props;
    const { columns } = this.state;

    const dataSource = orders.items.map((element, index) => {
      return {
        key: orders.items[index]._id,
        product: orders.items[index].name,
        price: orders.itemsSalePrice[index],
        quantity: orders.itemsQuantity[index],
        subtotal: orders.itemsSubtotal[index],
      };
    });

    return (
      <div
        stlye={{
          height: "750px",
          width: "563px",
          margin: "48px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <img
            src={user.image}
            style={{ height: "100px", marginTop: "48px" }}
          />
        </div>
        <div>
          <div style={{ marginLeft: "48px" }}>
            <h2 style={{ textAlign: "left", color: "black" }}>
              INVOICE #{orders.orderNum}
            </h2>
            <h4 style={{ textAlign: "left", color: "black" }}>{user.phone}</h4>
            <h4 style={{ textAlign: "left", color: "black" }}>{user.email}</h4>
            <Divider />
          </div>
          <div style={{ margin: "48px", textAlign: "left" }}>
            <h4>
              <b>Order Date:</b> {orders.date}
            </h4>
            <h4>
              <b>BILL TO:</b> {orders.date}
            </h4>
            <Divider />
            <br />
            <br />
            <Table
              dataSource={dataSource}
              columns={columns}
              style={{ color: "grey" }}
              pagination={false}
            ></Table>
            <Divider />
            <h4 style={{ textAlign: "right" }}>
              <b>TOTAL</b> ${orders.total}
            </h4>
            <Divider />
            <br />
            <br />
            <p style={{ textAlign: "left" }}>
              Thank you for shopping at {user.companyName}
              <br />
              Sincerely yours,
              <br />
              <br />
              <b>The {user.companyName} Team</b>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
