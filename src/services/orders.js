import React from 'react'
import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/orders"
    : "/api/orders";

const ordersService = axios.create({ baseURL, withCredentials: true})

export const getAllOrders = () => ordersService.get()

export const getOrderDetail = id => ordersService.get(`/${id}`)

export const createOrder = order => ordersService.post('', order)

export const updateOrder = (id, order) => ordersService.put(`/${id}`, order)