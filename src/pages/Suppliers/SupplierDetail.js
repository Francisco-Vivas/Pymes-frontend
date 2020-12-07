import React, { useEffect, useState } from 'react'
import { getSupplierDetail, updateSupplier, deleteSupplier } from '../../services/suppliers'
import { Divider, Button, Skeleton, Typography, Form, Select, Input } from 'antd'
import { TextS, TitleS } from "../../components/styledComponents/Typography"
import { ButtonS, InputS } from "../../components/styledComponents/antdStyled"
import { Link, useHistory } from 'react-router-dom'


const SupplierDetail = ({match: {params: {suppliersID}}}) => {
    const [edit, setEdit] = useState(false)
    const [form] = Form.useForm()
    const history = useHistory()

    
    const [suppliers, setSuppliers] = useState({})

    async function handleDelete(){
        await deleteSupplier(suppliersID)
        history.push('/suppliers')
    }
    
    useEffect(() => {
        async function getDetails(){
            const { data } = await getSupplierDetail(suppliersID)
            setSuppliers(data)
        }
        getDetails()
    }, [suppliersID])

    // async function handleSubmit(values){
    //     const updatedSupplier = { ...suppliers, values }
    //     const { data: newSupplier } = await updateSupplier(suppliers._id, updatedSupplier)
    //     setSuppliers(newSupplier)
    // }

    const { name, phone, email, channel, lastOrder, products } = suppliers

    return (
        <div>
            <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between"}}>
                <div style={{display:"flex", alignItems:"flex-start", flexDirection:"column", }}>
                    <TitleS level={2}>{name}</TitleS>
                    <Divider/>
                    <TitleS level={5}>{phone} </TitleS>
                    <TitleS level={5}>{email}</TitleS>
                    <TitleS level={5}>Channel: {channel}</TitleS>
                </div>
                <div>
                    <Button type="secondary" style={{margin:"-50px", backgroundColor:"#BF616A", color:"white", border: "none"}} onClick={handleDelete}>Delete Supplier</Button>
                    <br/>
                    <Link to={`/suppliers/${suppliers._id}/edit`}><ButtonS type="primary" style={{margin:"30px"}}>Edit Supplier</ButtonS></Link>

                    <TitleS level={5}>Last Order: {lastOrder}</TitleS>
                </div>
            </div>
            <Divider/>
            <div>
                <TitleS level={5} style={{float: "left"}}>Products</TitleS>
                <div style={{height:"400px", overflowY:"scroll"}}>
                    {/* PRODUCTOS */}
                </div>
            </div>
        </div>
    ) 
}

export default SupplierDetail