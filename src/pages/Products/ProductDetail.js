import { Col, Divider, Row, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { TextS, TitleS } from "../../components/styledComponents/Typography";
import { getAProductFn } from "../../services/products";

export default function ProductDetail({
  match: {
    params: { productID },
  },
}) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getDetails() {
      const { data } = await getAProductFn(productID);
      setProduct(data);
    }
    getDetails();
  }, []);

  console.log(product);
  return product ? (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} style={{ marginLeft: "2rem" }}>
        <div style={{ textAlign: "left" }}>
          <TitleS level={3}>{product.name.toUpperCase()}</TitleS>
          {product.sku ? <TitleS level={5}>SKU: {product.sku}</TitleS> : " "}
          <Divider />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          {product.quantity === 0 ? (
            <TextS>{product.quantity}</TextS>
          ) : product.quantity <= product.threshold ? (
            <TextS></TextS>
          ) : (
            <TextS></TextS>
          )}
          <TextS>Supplier: {product.supplier || "No info."}</TextS>
          <TextS>Wholesale Price: {product.wholesalePrice}</TextS>
          <TextS>Sale Price Price: {product.salePrice}</TextS>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12}></Col>
    </Row>
  ) : (
    <Skeleton active />
  );
}
