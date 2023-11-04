import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'

const Root = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <h2 className='text-8xl'>ite asjdh</h2>
        </div>
    )
}

export default Root
