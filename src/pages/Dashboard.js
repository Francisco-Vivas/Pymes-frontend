import React from 'react'
import { TitleS } from '../components/styledComponents/Typography'
import { useContextInfo } from '../hooks/auth.hooks'



export default function Dashboard(){
    const { user } = useContextInfo
    console.log(user)
    return (
        <TitleS>Welcome Amarea!</TitleS>
    )
}