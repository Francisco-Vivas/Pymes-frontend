import React, { useEffect, useState } from 'react'
import { getOrderDetail, updateOrder } from '../../services/orders'
import { Divider, Button, Skeleton, Typography, Form, Select, Input } from 'antd'
import { TextS, TitleS } from "../../components/styledComponents/Typography"
import { ButtonS, InputS } from "../../components/styledComponents/antdStyled"
import { Link, useHistory } from 'react-router-dom'


const OrderDetail = ({match: {params: {ordersID}}}) => {
    const [edit, setEdit] = useState(false)
    const [form] = Form.useForm()
    const history = useHistory()

    
    const [orders, setOrders] = useState({})
    
    useEffect(() => {
        async function getDetails(){
            const { data } = await getOrderDetail(ordersID)
            setOrders(data)
        }
        getDetails()
    }, [ordersID])

    async function handleSubmit(values){
        const updatedOrder = { ...orders, values }
        console.log(updatedOrder)
        const { data: newOrder } = await updateOrder(orders._id, updatedOrder)
        setOrders(newOrder)
    }

    const { orderNum, date, customer, total, payment, fulfillment, items, extra } = orders

    return (
        // <>{!edit && 
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
                <br/>
                <TitleS level={4} style={{float:"right"}}>TOTAL ${total}</TitleS>
            </div>
            <br/>
            <br/>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <div style={{display:"flex"}}>
                    <div>
                        {payment === 'PAID' ? 
                        (<p style={{backgroundColor:"#A3BE8C", color:"white", padding:"5px 10px", margin:"10px"}}>PAID</p>) :
                        (<p style={{backgroundColor:"#BF616A", color:"white", padding:"5px 10px", margin:"10px"}}>UNPAID</p>)}
                    </div>
                    <div>
                        {fulfillment === 'PENDING' ? 
                        (<p style={{backgroundColor:"#EBCB8B", color:"white", padding:"5px 10px", margin:"10px"}}>PENDING</p>) :
                        fulfillment === 'FULFILLED' ? (<p style={{backgroundColor:"#A3BE8C", color:"white", padding:"5px 10px", margin:"10px"}}>FULFILLED</p>) : 
                        (<p style={{backgroundColor:"#BF616A", color:"white", padding:"5px 10px", margin:"10px"}}>CANCELLED</p>)}
                    </div>
                </div>
                <div>
                    <ButtonS type="secondary" style={{margin:"10px"}}>Export Invoice</ButtonS>
                    <Link to={`/orders/${orders._id}/edit`}><ButtonS type="primary" style={{margin:"10px"}}
                    >Edit Order</ButtonS></Link>
                </div>
            </div>
        </div>
    ) 
}

export default OrderDetail