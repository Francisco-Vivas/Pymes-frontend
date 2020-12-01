import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Modal, Button } from 'antd';
import CreateOrderForm from '../components/CreateOrderForm'


export default function Orders(){

  const [orders, setOrders] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // useEffect(() => {
  //   async function getOrders(){
  //     const { data } = await getAllOrders()
  //     setOrders(data)
  //   }
  //   getOrders()
  // }, [])

  function addOrder(order){
    setOrders([...orders, order])
    setShowModal(false)
  }

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



  return (
    <div>
      <Button type="dashed" style={{float:"left", color:"#ec4767"}}
      onClick={() => setShowModal(true)}
      > New Order </Button>
      <br/>
      <br/>
      <Table
        columns={columns}>
      </Table>
      <Modal
        visible={showModal}
        title="Create New Order"
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        footer={null}>
          <CreateOrderForm addOrder={addOrder}/>
      </Modal>
    </div>
  )}