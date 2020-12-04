import React, { useState, useEffect } from 'react'
import CreateOrderForm from '../components/CreateOrderForm'

export default function CreateOrders(){
    const [orders, setOrders] = useState(null)
    
    function addOrder(order){
        setOrders([...orders, order])
    }
    
    return(
        <CreateOrderForm addOrder={addOrder}/ >
    )
}