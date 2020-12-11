import React from 'react'

export default function OutOfStock({ sku }){
    return(
        <div style={{backgroundColor:"#BF616A", color:"white", padding:"10px", textAlign:"center", width:"450px", height:"30px", paddingBottom:"30px", display:"flex", margin:"11px"}}>
            <img src='/images/out.png' style={{height:"25px", margin:"-2px 30px"}}/>
            <p><b>You are out of product {sku}</b></p>
        </div>
    )
}