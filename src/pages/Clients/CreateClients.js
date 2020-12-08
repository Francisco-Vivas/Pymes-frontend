import React, { useState } from 'react'
import { Form, Button, Input, InputNumber, Select, DatePicker, Row, Col } from 'antd'
import { createClient } from '../../services/clients'
import { useHistory } from "react-router-dom";
import { useContextInfo } from '../../hooks/auth.hooks';
import { InputS, InputSWhite } from '../../components/styledComponents/antdStyled'
import { TitleS } from '../../components/styledComponents/Typography'


export default function CreateClient({ addClient }){
    const [form] = Form.useForm()
    const history = useHistory();
    const { user, login } = useContextInfo()

    async function handleSubmit(values) {
    const client = {...values}
    const { data: newClient } = await createClient(client);
    login({...user, clientsID: [...user.clientsID, newClient._id]})
    return history.push("/clients")
    }

    return (
    <Row align="center">
    <Col xs={24} sm={18} md={12} lg={8}>
        <TitleS style={{ margin: "2rem" }}> New Client </TitleS>
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
            <Button type="primary" size="middle" htmlType="submit" style={{color:"white", backgroundColor:"#4D5768"}}>Create Client</Button>
        </Form>
    </Col>
    </Row>
    )
}