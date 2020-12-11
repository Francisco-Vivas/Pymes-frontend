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
        <Col>
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
        <Col style={{ display: "flex" }}>
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
          <Card style={{ margin: "10px", width: "155px" }}>
            <Statistic
              title="Total Sales"
              value={user.ordersID ? user.ordersID.length : 0}
            />
          </Card>
        </Col>
      </Row>
    </Row>
  ) : (
    <Skeleton active />
  );
}
