import React, { useEffect, useState } from 'react'
import { getOrderDetail, updateOrder } from '../services/orders'
import { Divider, Button, Skeleton, Typography } from 'antd'
import { TextS, TitleS } from "../components/styledComponents/Typography"


const OrderDetail = ({match: {params: {ordersID}}}) => {
    
    const [orders, setOrders] = useState({})
    
    useEffect(() => {
        async function getDetails(){
            const { data } = await getOrderDetail(ordersID)
            setOrders(data)
        }
        getDetails()
    }, [ordersID])

    const { orderNum, date, customer, total, payment, fulfillment, items, extra } = orders

    return (
        <div>
            <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between"}}>
                <div>
                    <TitleS level={2}>ORDER # {orderNum}</TitleS>
                    <TitleS level={5}>Customer: {customer}</TitleS>
                </div>
                <div>
                    <TitleS level={5}>{date}</TitleS>
                </div>
            </div>
            <Divider/>
            <div>
                <TitleS level={5} style={{float: "left"}}>Order Summary</TitleS>
                <div style={{height:"400px", overflowY:"scroll"}}>
                    {/* PRODUCTOS */}
                </div>
                <TitleS level={5}>TOTAL {total}</TitleS>
            </div>
            <div>
                <div style={{display:"flex"}}>
                    <div>
                        {payment === 'UNPAID' ? 
                        (<p style={{backgroundColor:"#BF616A", color:"white", padding:"5px"}}>UNPAID</p>) :
                        (<p style={{backgroundColor:"#A3BE8C", color:"white", padding:"5px"}}>PAID</p>)}
                    </div>
                    <div>

                    </div>
                </div>
                <div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    ) 
    // : (
    //     <Skeleton active />
    // )
}

export default OrderDetail