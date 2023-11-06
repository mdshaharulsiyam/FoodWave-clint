import React, { useState } from 'react'
import {QueryClient, QueryClientProvider, useQuery,} from '@tanstack/react-query'
import useAxiosConfig from '../../CustomHooks/useAxiosConfig'
import FeaturedFoodsCud from './FeaturedFoodsCud'
const FeaturedFoods = () => {
    const axiosrequest = useAxiosConfig()
    const [feturedFoodsData , setFeturedFoodsData]=useState([])
    console.log(feturedFoodsData)
    const { isPending, error, data } = useQuery({
        queryKey: ['feturedfoodsData'],
        queryFn: () =>
          axiosrequest.get('/feturedfood')
            .then((data) => setFeturedFoodsData(data.data))
      });
      
  return (
    <div className='container mx-auto py-10 mt-5'>
      <h2 className='text-center text-4xl font-semibold pb-10'>Featured Foods</h2>
      <div className='grid md:grid-cols-2 md:gap-14 lg:grid-cols-3 lg:gap-5'>
        {
            feturedFoodsData.map(item=> <FeaturedFoodsCud key={item._id} item={item}></FeaturedFoodsCud>)
        }
      </div>
    </div>
  )
}

export default FeaturedFoods
