import React, { useState, useEffect } from 'react'
import { updateClient, getClientDetail, deleteClient } from '../../services/clients'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Input, InputNumber, Select, Typography, Divider, Row, Col } from 'antd'
import { InputS, ButtonS, InputSWhite } from '../../components/styledComponents/antdStyled'
import { TitleS } from '../../components/styledComponents/Typography'

const { Text } = Typography

export default function UpdateClient({ match:{ params:{ clientsID }}}){
    const [form] = Form.useForm()
    const history = useHistory()
    const [client, setClient] = useState({})
    const { name, phone, email, address, _id } = client

    useEffect(() => {
        async function getData(){
            const { data } = await getClientDetail(clientsID)
            setClient(data)
        }
        getData()
    }, [])

    async function handleSubmit(values){
        const { data: newClient } = await updateClient(client._id, values)
        setClient(newClient)
        history.push(`/clients`)
    }
    async function handleDelete(){
        await deleteClient(clientsID)
        history.push('/clients')
    }


    return(
        <Row align="center">
            <Col xs={24} sm={18} md={12} lg={8}>
                <TitleS style={{ margin: "2rem" }}> Edit Client </TitleS>
                <Form form={form} layout="horizontal" onFinish={handleSubmit}>
                    <Form.Item name="name" label="Name:">
                        <InputSWhite />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone:">
                        <InputSWhite />
                    </Form.Item>
                    <Form.Item name="email" label="Email:">
                        <InputSWhite />
                    </Form.Item>
                    <Form.Item name="address" label="Address:">
                        <InputSWhite />
                    </Form.Item>
                    <Button type="primary" size="middle" htmlType="submit" style={{color:"white", backgroundColor:"#4D5768"}}>Edit Client</Button>
                </Form>
                <Divider/>
                <Button type="secondary" style={{margin:"-50px", backgroundColor:"#BF616A", color:"white", border: "none"}} onClick={handleDelete}>Delete Client</Button>
            </Col>
        </Row>
    )
}
