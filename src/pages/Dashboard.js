import React, { useEffect, useState } from "react";
import { useContextInfo } from "../hooks/auth.hooks";
import { TextS, TitleS } from "../components/styledComponents/Typography";
import { Divider, Statistic, Avatar, Card, Skeleton, Row, Col } from "antd";
import { getAvailableProductsFn } from "../services/products";
import LowInventory from "../components/LowInventory";
import OutOfStock from "../components/OutOfStock";

export default function Dashboard() {
  const { user } = useContextInfo();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function getAvailableProducts() {
      const { data } = await getAvailableProductsFn();
      setProducts(data);
    }
    getAvailableProducts();
  }, []);

  return products ? (
    <Row justify="center" align="middle">
      <Row style={{ width: "100%" }}>
        <Col span={24} style={{ display: "flex", alignContent: "center" }}>
          <Col>
            <Avatar
              size={100}
              src={user.image}
              style={{ marginRight: "30px" }}
            />
          </Col>
          <Col>
            <TitleS style={{ textAlign: "left", marginTop: "30px" }}>
              Welcome {user.companyName}!
            </TitleS>
          </Col>
        </Col>
        <Col span={24}>
          <TextS style={{ color: "#969696", width: "100%", textAlign: "left" }}>
            Here's what's happening in your business
          </TextS>
        </Col>
        <Divider />
      </Row>
      <Row style={{ width: "100%" }} justify="space-between">
        <TitleS level={4} style={{ textAlign: "left" }}>
          NOTIFICATIONS
        </TitleS>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          span={12}
          style={{ overflowY: "scroll", margin: "auto" }}
        >
          {products?.map((product) =>
            product.quantity < product.threshold && product.quantity > 0 ? (
              <LowInventory sku={product.sku} key={product._id} />
            ) : (
              <></>
            )
          )}
          {products?.map((product) =>
            product.quantity == 0 ? (
              <OutOfStock sku={product.sku} key={product._id} />
            ) : (
              <></>
            )
          )}
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          span={12}
          style={{ display: "flex" }}
        >
          <Card style={{ margin: "10px", width: "155px" }}>
            <Statistic
              title="Total Suppliers"
              value={user.suppliersID ? user.suppliersID.length : 0}
            />
          </Card>
          <Card style={{ margin: "10px", width: "155px" }}>
            <Statistic
              title="Total Clients"
              value={user.clientsID ? user.clientsID.length : 0}
            />
          </Card>
          <Card
            style={{
              margin: "3px",
              width: "50%",
              height: "110px",
              marginTop: "10px",
            }}
          >
            <Statistic title="Total Products" value={user.productsID.length} />
          </Card>
          <Card style={{ margin: "10px", width: "155px" }}>
            <Statistic
              title="Total Sales"
              value={user.ordersID ? user.ordersID.length : 0}
            />
          </Card>
        </Col>
      </Row>
      <Row style={{ width: "100%" }} justify="space-between">
        <div>
          <br />
          <div>
            <TitleS level={4} style={{ textAlign: "left" }}>
              TOP PRODUCTS
            </TitleS>
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Card
              hoverable
              style={{ width: "30%", height: "70%", margin: "5px" }}
            >
              <img
                src={products[0].image}
                style={{ width: "100%", textAlign: "center" }}
              />
              <Divider style={{ margin: "5px" }} />
              <p style={{ fontSize: "0.7rem", margin: "0px" }}>
                {products[0].name}
              </p>
            </Card>
            <Card
              hoverable
              style={{ width: "30%", height: "70%", margin: "5px" }}
            >
              <img
                src={products[1].image}
                style={{ width: "100%", textAlign: "center" }}
              />
              <Divider style={{ margin: "5px" }} />
              <p style={{ fontSize: "0.7rem", margin: "0px" }}>
                {products[1].name}
              </p>
            </Card>
            <Card
              hoverable
              style={{ width: "30%", height: "70%", margin: "5px" }}
            >
              <img
                src={products[2].image}
                style={{ width: "100%", textAlign: "center" }}
              />
              <Divider style={{ margin: "5px" }} />
              <p style={{ fontSize: "0.7rem", margin: "0px" }}>
                {products[2].name}
              </p>
            </Card>
          </div>
        </div>
      </Row>
    </Row>
  ) : (
    <Skeleton active />
  );
}
