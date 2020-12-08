import React, { useState } from 'react'
import { Form, Button, Input, InputNumber, Select, DatePicker, Row, Col } from 'antd'
import { createSupplier } from '../../services/suppliers'
import { useHistory } from "react-router-dom";
import { useContextInfo } from '../../hooks/auth.hooks';
import { InputS, InputSWhite } from '../../components/styledComponents/antdStyled'
import { TitleS } from '../../components/styledComponents/Typography'


export default function CreateSupplier({ addSupplier }){
    const [form] = Form.useForm()
    const history = useHistory();
    const { user, login } = useContextInfo()

    async function handleSubmit(values) {
    const supplier = {...values}
    const { data: newSupplier } = await createSupplier(supplier);
    login({...user, suppliersID: [...user.suppliersID, newSupplier._id]})
    return history.push("/suppliers")
    }

    return (
    <Row align="center">
    <Col xs={24} sm={18} md={12} lg={8}>
        <TitleS style={{ margin: "2rem" }}> New Supplier </TitleS>
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
            <Form.Item name="channel" label="Channel:">
                <InputSWhite />
            </Form.Item>
            {/* PRODUCTS */}
            <Form.Item name="lastOrder" label="Last Order:">
                <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Button type="primary" size="middle" htmlType="submit" style={{color:"white", backgroundColor:"#4D5768"}}>Create Order</Button>
        </Form>
    </Col>
    </Row>
    )
}