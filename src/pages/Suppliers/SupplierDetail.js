import React, { useEffect, useState } from "react";
import { getSupplierDetail, deleteSupplier } from "../../services/suppliers";
import { Divider, Button, List, Row } from "antd";
import { TitleS } from "../../components/styledComponents/Typography";
import { ButtonS } from "../../components/styledComponents/antdStyled";
import { Link, useHistory } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

const SupplierDetail = ({
  match: {
    params: { suppliersID },
  },
}) => {
  const [edit, setEdit] = useState(false);
  const history = useHistory();

  const [suppliers, setSuppliers] = useState({});

  async function handleDelete() {
    await deleteSupplier(suppliersID);
    history.push("/suppliers");
  }

  useEffect(() => {
    async function getDetails() {
      const { data } = await getSupplierDetail(suppliersID);
      setSuppliers(data);
    }
    getDetails();
  }, [suppliersID]);

  const { name, phone, email, channel, lastOrder, products } = suppliers;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <TitleS level={2}>{name}</TitleS>
          <Divider />
          <TitleS level={5}>{phone} </TitleS>
          <TitleS level={5}>{email}</TitleS>
          <TitleS level={5}>Channel: {channel}</TitleS>
        </div>
        <div>
          <Button
            type="secondary"
            style={{
              margin: "-50px",
              backgroundColor: "#BF616A",
              color: "white",
              border: "none",
            }}
            onClick={handleDelete}
          >
            Delete Supplier
          </Button>
          <br />
          <Link to={`/suppliers/${suppliers._id}/edit`}>
            <ButtonS type="primary" style={{ margin: "30px" }}>
              Edit Supplier
            </ButtonS>
          </Link>

          <TitleS level={5}>Last Order: {lastOrder}</TitleS>
        </div>
      </div>
      <Divider />
      <div style={{ height: "100%" }}>
        <TitleS level={5} style={{ textAlign: "left" }}>
          Products
        </TitleS>
        <Row
          key="a"
          gutter={[16, 16]}
          style={{
            padding: "1rem",
            paddingBottom: "0",
            marginTop: "1rem",
            height: "auto",
            overflowY: "scroll",
          }}
        >
          <List
            style={{
              margin: "0.5rem",
              width: "100%",
            }}
            pagination={{
              pageSize: 6,
            }}
            dataSource={suppliers.products}
            renderItem={(item) => {
              return <ProductCard product={item} isSupplier={true} />;
            }}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
          />
        </Row>
      </div>
    </div>
  );
};

export default SupplierDetail;
