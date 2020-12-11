import React, { useEffect, useState } from 'react'
import { useContextInfo } from "../hooks/auth.hooks";
import { TitleS } from '../components/styledComponents/Typography'
import { Divider, Statistic, Avatar, Card, Skeleton } from 'antd';
import { getAllProductsFn, getAvailableProductsFn } from '../services/products'
import LowInventory from '../components/LowInventory'
import OutOfStock from '../components/OutOfStock'


export default function Dashboard(){
const { user } = useContextInfo()
const [products, setProducts] = useState(null);


useEffect(() => {
    async function getAllProducts() {
        const { data } = await getAllProductsFn();
        setProducts(data);
    }
    getAllProducts();
    }, []);



    console.log(products)
    console.log(user)

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
            <div style={{display:"flex", justifyContent:"space-evenly"}}>
                <div>
                    <TitleS level={4} style={{textAlign:"left"}}>SUMMARY</TitleS>
                    <div style={{display:"flex", margin:"10px", width:"100%"}}>
                        <Card style={{margin:"3px", width:"57%", height:"110px", marginTop:"10px"}}><Statistic title="Total Suppliers" value={user.suppliersID.length} /></Card>
                        <Card style={{margin:"3px", width:"50%", height:"110px", marginTop:"10px"}}><Statistic title="Total Clients" value={user.clientsID.length} /></Card>
                        <Card style={{margin:"3px", width:"55%", height:"110px", marginTop:"10px"}}><Statistic title="Total Products" value={user.productsID.length} /></Card>
                        <Card style={{margin:"3px", width:"50%", height:"110px", marginTop:"10px"}}><Statistic title="Total Sales" value={user.ordersID.length} /></Card>
                    </div>
                    <div>
                        <br/>
                        <div>
                            <TitleS level={4} style={{textAlign:"left"}}>TOP PRODUCTS</TitleS>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <div>
                        <TitleS level={4} style={{textAlign:"left"}}>NOTIFICATIONS</TitleS>
                    </div>
                    <div>
                        {products.map((product) => product.quantity < 1 ? <OutOfStock sku={product.sku} key={product._id}/> : <></>)}
                        {products.map((product) => product.quantity < product.threshold && product.quantity > 0 ? <LowInventory sku={product.sku} key={product._id}/> : <></>)}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Skeleton active/>
    )
}