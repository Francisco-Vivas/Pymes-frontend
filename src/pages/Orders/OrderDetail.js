import React, { useEffect, useState, useRef, useCallback } from "react";
import { getOrderDetail } from "../../services/orders";
import ReactToPrint from "react-to-print";
import PrintInvoice from "../../components/PrintInvoice";
import { Col, Divider, List, Row, Skeleton } from "antd";
import { TextS, TitleS } from "../../components/styledComponents/Typography";
import { ButtonS } from "../../components/styledComponents/antdStyled";
import { Link } from "react-router-dom";
import Avatar from "antd/lib/avatar/avatar";
import { useContextInfo } from "../../hooks/auth.hooks";

const OrderDetail = ({
  match: {
    params: { ordersID },
  },
}) => {
  const [orders, setOrders] = useState(null);
  const { user } = useContextInfo();

  const componentRef = useRef();

  useEffect(() => {
    async function getDetails() {
      const { data } = await getOrderDetail(ordersID);
      setOrders({ ...data });
    }
    getDetails();
  }, []);

  const {
    date,
    clientID,
    total,
    payment,
    fulfillment,
    items,
    extra,
    itemsQuantity,
    itemsSalePrice,
    itemsSubtotal,
    orderNum,
  } = orders || {};

  return orders ? (
    <Row justify="center" align="middle">
      <Row
        justify="space-between"
        style={{ width: "100%" }}
        // style={{
        //   display: "flex",
        //   alignItems: "flex-end",
        //   justifyContent: "space-between",
        // }}
      >
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={{ textAlign: "left" }}
        >
          <TitleS level={2}>ORDER # {orderNum}</TitleS>
          <TitleS level={5}>Client: {clientID?.name}</TitleS>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={{ textAlign: "right", marginTop: "auto" }}
        >
          <TitleS level={5}>{date}</TitleS>
        </Col>
      </Row>
      <Divider />
      <Row style={{ width: "100%" }}>
        <Row style={{ width: "100%" }}>
          <TitleS level={5} style={{ textAlign: "left", width: "100%" }}>
            Order Summary
          </TitleS>
          <Col span={24} style={{ height: "100%" }}>
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
              style={{ width: "100%" }}
              renderItem={(item, index) => {
                return (
                  <List.Item
                    key={index._id}
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
                          shape="square"
                          size={64}
                          src={item.image}
                          style={{ marin: "auto" }}
                        />
                      }
                      title={item.name}
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
          </Col>
          <br />
        </Row>
        <br />
        <TitleS level={4} style={{ textAlign: "right", width: "100%" }}>
          TOTAL ${total}
        </TitleS>
        <br />
        <Row
          justify="space-between"
          align="middle"
          style={{
            width: "100%",
          }}
        >
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            span={12}
            style={{ display: "flex" }}
          >
            <Row
              justify="space-around"
              align="middle"
              style={{
                width: "100%",
              }}
            >
              <Col>
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
              </Col>
              <Col>
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
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} span={12}>
            <Row
              justify="space-around"
              align="middle"
              style={{
                width: "100%",
              }}
            >
              <Col>
                <ReactToPrint
                  trigger={() => (
                    <ButtonS type="secondary" style={{ margin: "10px" }}>
                      Export Invoice
                    </ButtonS>
                  )}
                  content={() => componentRef.current}
                />
                <Col style={{ display: "none" }}>
                  <PrintInvoice
                    ref={componentRef}
                    orders={orders}
                    user={user}
                  />
                </Col>
              </Col>
              <Link to={`/orders/${orders._id}/edit`}>
                <ButtonS type="primary" style={{ margin: "10px" }}>
                  Edit Order
                </ButtonS>
              </Link>
            </Row>
          </Col>
        </Row>
      </Row>
    </Row>
  ) : (
    <Skeleton active />
  );
};

export default OrderDetail;
