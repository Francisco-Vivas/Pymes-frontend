import React, { useEffect, useState } from 'react'
import { useContextInfo } from "../hooks/auth.hooks";
import { TitleS } from '../components/styledComponents/Typography'
import { Divider, Statistic, Avatar, Card, Skeleton } from 'antd';
import { getAvailableProductsFn } from '../services/products'
import LowInventory from '../components/LowInventory'
import OutOfStock from '../components/OutOfStock'


export default function Dashboard(){
const { user } = useContextInfo()
const [products, setProducts] = useState(null);


useEffect(() => {
    async function getAvailableProducts() {
        const { data } = await getAvailableProductsFn();
        setProducts(data);
        console.log(data)
    }
    getAvailableProducts();
    }, []);
            



    return products ? (
        <div>
            <div style={{display:"flex", alignContent:"center"}}>
                <div>
                    <Avatar size={100} src={user.image} style={{marginRight:"30px"}} />
                </div>
                <div>
                    <TitleS style={{textAlign:"left", marginTop:"30px"}}>Welcome {user.companyName}!</TitleS>
                    <Divider/>
                </div>
            </div>
                    <p style={{color:"#969696", textAlign:"left"}}>Here's what's happening in your business</p>
            <Divider/>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <div>
                {products.map((product) => product.quantity < product.threshold && product.quantity > 0 ? <LowInventory sku={product.sku} key={product._id}/> : <></>)}
                {products.map((product) => product.quantity == 0 ? <OutOfStock sku={product.sku} key={product._id}/> : <></>)}
                </div>
                <div style={{display:"flex"}}>
                    <Card style={{margin:"10px", width:"155px"}}><Statistic title="Total Suppliers" value={user.suppliersID.length} /></Card>
                    <Card style={{margin:"10px", width:"155px"}}><Statistic title="Total Clients" value={user.clientsID.length} /></Card>
                    <Card style={{margin:"10px", width:"155px"}}><Statistic title="Total Sales" value={user.ordersID.length} /></Card>
                </div>
            </div>
        
        </div>
    ) : (
        <Skeleton active/>
    )
}