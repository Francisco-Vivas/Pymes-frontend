import React, { useState } from 'react'
import { Form, Button, Input, InputNumber, Select, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { createJob } from '../services/jobs'
import axios from 'axios'

export default function CreateOrderForm({ addOrder }){
  const [order] = Form.useForm()

  async function handleSubmit(values) {

    const order = {...values}

    const { data: newOrder } = await createOrder(order);
    addOrder(newOrder);
    form.resetFields()}

  async function handleUploadFile(file) {
    // console.log(info);
    setLoading(true)
    const data = new FormData()

    data.append('file', file)
    data.append('upload_preset', 'huntfake')

    const { data: { secure_url } } = await axios.post(cloudinaryAPI, data)

    setImg(secure_url);
    setLoading(false)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );



  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="order" label="Order #:">
        <Input />
      </Form.Item>
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
      <Form.Item name="salarymax" label="Salary max:">
        <InputNumber />
      </Form.Item>
      <Form.Item name="skills" label="Skills:">
        <Select mode="tags" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="image" label="Image:">
        <Upload
          name="image"
          showUploadList={false}
          beforeUpload={handleUploadFile}

        >
          {img ? <img src={img} style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>
      
      <Button type="primary" block size="middle" htmlType="submit">Create</Button>
    </Form>
  )
}