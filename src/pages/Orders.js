import React, { useState } from 'react'
import { Table, Tag, Space, Radio } from 'antd';
const { Columns } = Table

export default function Orders(){
  const columns = [
    {
      title: 'Order #',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: 'Date',
      dataIndex: 'gate',
      key: 'gate',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Payment',
      key: 'payment',
      dataIndex: 'payment',
      render: payments => (
        <span>
          {payments.map(payment => {
            let color = payment === "PAID" ? 'green' : 'red';
            return (
              <Tag color={color} key={payment}>
                {payment.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Fulfillment',
      key: 'fulfillment',
      dataIndex: 'fulfillment',
      render: fulfillments => (
        <span>
          {fulfillments.map(fulfillment => {
            let color = fulfillment === "FULFILLED" ? 'green' : 'red';
            return (
              <Tag color={color} key={fulfillment}>
                {fulfillment.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Send Invoice',
      key: 'invoice',
      render: () => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
    {
      title: 'Extra',
      dataIndex: 'extra',
      key: 'extra',
    }
  ];

const [data, setData] = useData(null)




  return (
  <Table
    columns={columns}
  />
  <Button type=>Add </Button>
  )}