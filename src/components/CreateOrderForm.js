import React, { useState } from 'react'
import { Form, Button, Input, InputNumber, Select } from 'antd'
import { createOrder } from '../services/orders'
import { useHistory } from "react-router-dom";
import { useContextInfo } from '../hooks/auth.hooks';


export default function CreateOrderForm({ addOrder }){
    const [form] = Form.useForm()
    const history = useHistory();
    const { user, login } = useContextInfo()

    async function handleSubmit(values) {
    const order = {...values}
    const { data: newOrder } = await createOrder(order);
    console.log(newOrder)
    // addOrder(newOrder)
    login({...user, ordersID: [...user.ordersID, newOrder._id]})
    return history.push("/orders")
    }

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="date" label="Date:">
                <Input />
            </Form.Item>
            <Form.Item name="customer" label="Customer:">
                <Input />
            </Form.Item>
            <Form.Item name="total" label="Total:">
                <Input />
            </Form.Item>
            <Form.Item name="payment" label="Payment:">
                <Select>
                    <Select.Option value="PENDING">PENDING</Select.Option>
                    <Select.Option value="PAID">PAID</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="fulfillment" label="Fulfillment:">
                <Select>
                    <Select.Option value="PENDING">PENDING</Select.Option>
                    <Select.Option value="FULFILLED">FULFILLED</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="items" label="Items:">
                <InputNumber />
            </Form.Item>
            <Form.Item name="extra" label="Extra:">
                <Input />
            </Form.Item>
            <Button type="primary" size="middle" htmlType="submit" style={{color:"white", backgroundColor:"#4D5768"}}>Create Order</Button>
        </Form>
    )
}