import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, Space } from "antd";
import { TextS } from "./styledComponents/Typography";
import { ButtonS } from "./styledComponents/antdStyled";
const { Meta } = Card;

export default function ProductCard({ product }) {
  const colorStatus =
    product.quantity === 0
      ? "#BF616A"
      : product.quantity <= product.threshold
      ? "#EBCB8B"
      : "none";

  const boxShadow =
    product.quantity <= product.threshold
      ? {
          style: { boxShadow: ` 0px 7px 15px -3px ${colorStatus}` },
        }
      : {};

  return (
    <Col key={product._id} xs={24} sm={24} md={6} lg={4}>
      <Card
        {...boxShadow}
        hoverable
        actions={[
          <Link to={`/products/${product._id}`}>
            <TextS type="primary">Details</TextS>
          </Link>,
        ]}
      >
        <Link to={`/products/${product._id}`}>
          <div>
            <div
              style={{
                display: "flex",
                margin: "auto",
              }}
            >
              <img
                style={{
                  height: "8rem",
                  boxSizing: "border-box",
                  width: "100%",
                  margin: "0 auto 1rem",
                  objectFit: "cover",
                }}
                alt={product.name}
                src={product.image}
              />
            </div>
            <Meta
              title={product.name}
              style={{ height: "100%" }}
              description={
                <Space direction="vertical">
                  <TextS>
                    Quantity: <br /> {product.quantity}
                  </TextS>
                  <TextS>
                    <small>
                      Sales price: <br />{" "}
                      {`$${product.salePrice}`.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </small>
                  </TextS>
                </Space>
              }
            />
          </div>
        </Link>
      </Card>
    </Col>
  );
}