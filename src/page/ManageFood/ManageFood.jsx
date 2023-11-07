import React, { useContext, useState } from 'react'
import { FoodWaveData } from '../../Context/Context'
import useAxiosConfig from '../../CustomHooks/useAxiosConfig'
import { useQuery, useMutation } from '@tanstack/react-query'
const ManageFood = () => {
    const {userinfo}=useContext(FoodWaveData)
    const axiosrequest = useAxiosConfig()
    const [managefoodData,setManageFoodData]=useState([])
    const {email} = userinfo;
    const { isLoading, err, fooddata, refetch } = useQuery({
        queryKey: ['manageFood',email],
        queryFn: () =>
            axiosrequest.get(`/myfood?email=${email}`)
                .then((data) => setManageFoodData(data.data))
    });
    console.log(managefoodData)
  return (
    <div>
      
    </div>
  )
}

export default ManageFood
