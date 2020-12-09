import React, { useReducer } from 'react'
import { Row, Col, Table } from 'antd'
// import OrderDetail from '../pages/Orders/OrderDetail'
import { useContextInfo } from "../hooks/auth.hooks";

export default function PrintInvoice({orders}){
    const { user } = useContextInfo();

    const dataSource = orders.products?.map((product) => {
        return {
            key: product._id,
            product: product.name,
            price: product.price,
            quantity: product.quantity
    }})

    const columns = [{
        title: "Product",
        dataIndex: "product",
        key: "product"
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity"
    },
    {
        title: "Unit Price",
        dataIndex: "price",
        key: "price"
    }]

    console.log({orders})

    return (
        <Row>
            <Row>
                <img src={user.image}/>
            </Row>
            <Row>
                <Col>
                    <h2>INVOICE #{orders.orderNum}</h2>
                    <h4>{user.phone}</h4>
                    <h4>{user.email}</h4>
                    {/* <h4>{user.address}</h4> */}
                </Col>
                <Col>
                    <h4>BILL TO:<br/>{orders.customer}</h4>
                    <Table dataSource={dataSource} columns={columns}>
                    </Table>

                </Col>
            </Row>
        </Row>
    )
}