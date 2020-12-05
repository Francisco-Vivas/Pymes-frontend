import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProductsFn } from "../../services/products";

export default function Products() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function getProducts() {
      const { data } = getAllProductsFn();
      if (data) setProducts(data);
    }
  }, []);
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
