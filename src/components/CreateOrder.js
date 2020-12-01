import React, { useState } from 'react'
import { Form, Button, Input, InputNumber, Select, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { createJob } from '../services/jobs'
import axios from 'axios'

const CreateOrderForm = ({ addOrder }) => {
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

  // company,
  // location,
  // description,
  // salary,
  // skills,
  // image,
  // status,

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="title" label="Title:">
        <Input />
      </Form.Item>
      <Form.Item name="company" label="Company:">
        <Input />
      </Form.Item>
      <Form.Item name="location" label="Location:">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description:">
        <Input />
      </Form.Item>
      <Form.Item name="salarymin" label="Salary min:">
        <InputNumber />
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
      <Form.Item name="status" label="Status:">
        <Select>
          <Select.Option value="WISHLIST">Wishlist</Select.Option>
          <Select.Option value="APPLIED">Applied</Select.Option>
          <Select.Option value="INTERVIEW">Interview</Select.Option>
          <Select.Option value="OFFER">Offer</Select.Option>
          <Select.Option value="REJECTED">Rejected</Select.Option>
        </Select>
      </Form.Item>
      <Button type="primary" block size="middle" htmlType="submit">Create</Button>
    </Form>
  )
}

export default 