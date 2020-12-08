import React, { useState } from 'react'
import { Form, Button, Input, InputNumber, Select } from 'antd'
import { createSupplier } from '../../services/suppliers'
import { useHistory } from "react-router-dom";
import { useContextInfo } from '../../hooks/auth.hooks';
import { InputS } from '../../components/styledComponents/antdStyled'


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
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name:">
                <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone:">
                <InputS />
            </Form.Item>
            <Form.Item name="email" label="Email:">
                <InputS />
            </Form.Item>
            <Form.Item name="channel" label="Channel:">
                <InputS />
            </Form.Item>
            {/* PRODUCTS */}
            <Form.Item name="lastOrder" label="Last Order:">
                <InputS />
            </Form.Item>
            <Button type="primary" size="middle" htmlType="submit" style={{color:"white", backgroundColor:"#4D5768"}}>Create Order</Button>
        </Form>
    )
}