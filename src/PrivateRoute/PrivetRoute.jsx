import React, { useContext } from 'react'
import { FoodWaveData } from '../Context/Context'
import { Navigate } from 'react-router-dom'

const PrivetRoute = ({children}) => {
    const { loading ,userinfo } = useContext(FoodWaveData)
    if (loading) {
        return <span className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span>
    }else{
        if (userinfo?.displayName) {
           return {children}
        }else{
            return <Navigate to={'/login'}></Navigate>
        }
    }
  
}

export default PrivetRoute
