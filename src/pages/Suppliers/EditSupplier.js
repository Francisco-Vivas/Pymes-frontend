import React, { useState, useEffect } from 'react'
import { updateSupplier, getSupplierDetail } from '../../services/suppliers'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Input, InputNumber, Select, Typography, Divider } from 'antd'
import { InputS, ButtonS } from '../../components/styledComponents/antdStyled'
import { TitleS } from '../../components/styledComponents/Typography'

const { Text } = Typography

export default function EditSupplier({ match:{ params:{ suppliersID }}}){
    const [form] = Form.useForm()
    const history = useHistory()
    const [supplier, setSupplier] = useState({})
    const { name, phone, email, channel, lastOrder, products, _id } = supplier

    useEffect(() => {
        async function getData(){
            const { data } = await getSupplierDetail(suppliersID)
            setSupplier(data)
        }
        getData()
    }, [])

    async function handleSubmit(values){
        const { data: newSupplier } = await updateSupplier(supplier._id, values)
        setSupplier(newSupplier)
        history.push(`/suppliers/${suppliersID}`)
    }


    return supplier && (
        <div>
        <TitleS level={1}>Edit your supplier</TitleS>
        <Text type="secondary">Update your supplier details</Text>
        <Divider />
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={supplier}>
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
            {/* PRODUCTS!!! */}
            <Form.Item name="lastOrder" label="Last Order:">
                <InputS />
            </Form.Item>
            <ButtonS type="primary" size="middle" htmlType="submit">Edit Supplier</ButtonS>
        </Form>
        </div>
    )
}
