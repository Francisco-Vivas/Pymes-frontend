import React from 'react'


export default function LowInventory({ sku }){

    return (
        <div style={{backgroundColor:"#EBCB8B", color:"white", padding:"10px", textAlign:"center", 
        width:"450px", height:"30px", paddingBottom:"30px", display:"flex", margin:"11px"}}>
            <img src='/images/alert.png' style={{height:"25px", margin:"-2px 30px"}}/>
            <p><b>Product {sku} is running low</b></p>
        </div>
    )
}