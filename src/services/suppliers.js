import React from 'react'
import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/suppliers"
    : "/api/suppliers";

const suppliersService = axios.create({ baseURL, withCredentials: true})

export const getAllSuppliers = () => suppliersService.get()

export const getSupplierDetail = id => suppliersService.get(`/${id}`)

export const createSupplier = supplier => suppliersService.post('/create-supplier', supplier)

export const updateSupplier = (id, supplier) => suppliersService.put(`/${id}`, supplier)

export const deleteSupplier = id => suppliersService.delete(`/${id}`)   