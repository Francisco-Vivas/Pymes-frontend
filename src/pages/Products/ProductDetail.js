import { Col, Divider, Row, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ButtonS } from "../../components/styledComponents/antdStyled";
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

  const colorQuantity =
    product?.quantity <= 0
      ? "#BF616A"
      : product?.quantity <= product?.threshold
      ? "#EBCB8B"
      : "#4d5768";
  return product ? (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div style={{ marginLeft: "2rem" }}>
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
              fontWeight: "bold",
            }}
          >
            <TextS style={{ color: colorQuantity }}>
              Quantity {product.quantity}{" "}
            </TextS>
            <TextS>
              Supplier:{" "}
              {(
                <Link to={`/suppliers/${product.supplierID?._id}`}>
                  {product.supplierID?.name}
                </Link>
              ) || "No info."}
            </TextS>
            <TextS style={{ marginTop: "2rem" }}>
              Wholesale Price:{" "}
              <span style={{ marginLeft: "2rem" }}>
                {`$${product.wholesalePrice}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}
              </span>
            </TextS>
            <TextS>
              Sale Price Price:{" "}
              <span style={{ marginLeft: "2rem" }}>
                {`$${product.salePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </TextS>
          </div>
          <div></div>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                style={{
                  height: "auto",
                  width: "84%",
                  boxSizing: "border-box",
                }}
              />
            ) : (
              <TextS>No image available (but you can always edit it).</TextS>
            )}
          </div>
          <div style={{ textAlign: "right", margin: "2rem 4rem" }}>
            <Link to={`/products/${product._id}/edit`}>
              <ButtonS type="primary">Edit Product</ButtonS>
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  ) : (
    <Skeleton active />
  );
}
