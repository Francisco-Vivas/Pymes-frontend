import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { getAllSuppliers, deleteSupplier } from "../../services/suppliers";
import { ButtonS } from "../../components/styledComponents/antdStyled"
import { useContextInfo } from '../../hooks/auth.hooks'
import { useHistory } from 'react-router-dom'


export default function Suppliers() {
  // const { user } = useContextInfo()
  const [suppliers, setSuppliers] = useState(null);
  const history = useHistory()

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
    {
      title: "",
      dataIndex: "details",
      key: "details",
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
      details: <Link to={`/suppliers/${supplier._id}`}><ButtonS type="secondary">Supplier Details</ButtonS></Link>,
    }})
    

  return (
    <div>
      <Link to="/suppliers/create-supplier">
        <Button
          style={{
            float: "left",
            color: "#4D5768",
            border: "1px dashed #4D5768",
          }}>
          New Supplier
        </Button>
      </Link>
      <br />
      <br />
      <Table dataSource={dataSource} columns={columns}></Table>
    </div>
  );
}
