import React from 'react'
import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/clients"
    : "/api/clients";

const clientsService = axios.create({ baseURL, withCredentials: true})

export const getAllClients = () => clientsService.get()

export const getClientDetail = id => clientsService.get(`/${id}`)

export const createClient = client => clientsService.post('/create-client', client)

export const updateClient = (id, client) => clientsService.put(`/${id}`, client)

export const deleteClient = id => clientsService.delete(`/${id}`)   