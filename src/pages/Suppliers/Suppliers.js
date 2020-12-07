import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { getAllSuppliers } from "../../services/suppliers";
import { ButtonS } from "../../components/styledComponents/antdStyled"


export default function Orders() {
  const [suppliers, setSuppliers] = useState(null);

  useEffect(() => {
    async function getSuppliers(){
      const { data } = await getAllSuppliers()
      setSuppliers(data)
    }
    getSuppliers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
    },
    {
      title: "Last Order",
      dataIndex: "lastOrder",
      key: "lastOrder",
    },
  ];
 
  const dataSource = suppliers?.map((supplier) => {
    return {
      key: supplier._id,
      name: supplier.name,
      phone: supplier.phone,
      email: supplier.email,
      channel: supplier.channel,
      lastOrder: supplier.lastOrder,
      details: <Link to={`/suppliers/${supplier._id}`}><ButtonS type="secondary">Supplier Details</ButtonS></Link>
    }})
    

  return (
    <div>
      <Link to="/suppliers/create-supplier">
        <Button
          style={{
            float: "left",
            color: "#4D5768",
            border: "1px dashed #4D5768",
          }}
        >
          {" "}
          New Supplier{" "}
        </Button>
      </Link>
      <br />
      <br />
      <Table dataSource={dataSource} columns={columns}></Table>
    </div>
  );
}
