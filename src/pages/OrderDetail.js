import React, { useEffect } from 'react'
import { getOrderDetail, updateOrder } form '../services/orders'
import { Divider, Button } from 'antd'


export default function OrderDetail({match: {params: {ordersID}}}) => {
    const [orders, setOrders] = useState({})

    useEffect(() => {
        async function getDetails(){
            const { data } = await getOrderDetail(ordersID)
            setOrders(data)
        }
        getDetails()
    }, [ordersID])

    const { orderNum, date, customer, total, payment, fulfillment, items, extra } = order

    return order.orderNum ? (
        <div>
            <div style={{display:"flex"}}>
                <div>
                    <h1>ORDER # {order.orderNum}</h1>
                    <br/>
                    <h3>Customer: {order.customer}</h3>
                </div>
                <div>
                    <h3>{order.date}</h3>
                </div>
            </div>
            <Divider/>
            <div>

            </div>
            <div>

            </div>
        </div>
    )

}