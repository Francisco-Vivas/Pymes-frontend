import React, { useEffect, useState } from 'react'
import { useContextInfo } from "../hooks/auth.hooks";
import { TitleS } from '../components/styledComponents/Typography'
import { Divider, Statistic, Avatar, List } from 'antd';
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
            
    console.log(products)
    return (
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
            <Statistic title="Total Clients" value={user.clientsID.length} />
            {products.quantity < products.threshold && products.quantity > 0? <LowInventory/> : <></>}
            {products.quantity == 0? <OutOfStock/> : <></>}
        </div>
    )
}