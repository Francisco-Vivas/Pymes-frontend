import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { getAllClients, deleteClient } from "../../services/clients";
import { ButtonS } from "../../components/styledComponents/antdStyled"
import { useContextInfo } from '../../hooks/auth.hooks'
import { useHistory } from 'react-router-dom'


export default function Clients() {
  // const { user } = useContextInfo()
  const [clients, setClients] = useState(null);
  const history = useHistory()

  useEffect(() => {
    async function getClients(){
      const { data } = await getAllClients()
      setClients(data)
    }
    getClients();
    
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
    },
  ];
 
  const dataSource = clients?.map((client) => {
    return {
      key: client._id,
      name: client.name,
      phone: client.phone,
      email: client.email,
      address: client.address,
      edit: <Link to={`/clients/${client._id}/edit`}><ButtonS type="secondary">Edit Client</ButtonS></Link>,
    }
})
  
    return (
    <div>
      <Link to="/clients/create-client">
        <Button
          style={{
            float: "left",
            color: "#4D5768",
            border: "1px dashed #4D5768",
          }}>
          New Client
        </Button>
      </Link>
      <br />
      <br />
      <Table dataSource={dataSource} columns={columns}></Table>
    </div>
  );
}
