import React, { useState } from 'react'
import {QueryClient, QueryClientProvider, useQuery,} from '@tanstack/react-query'
import useAxiosConfig from '../../CustomHooks/useAxiosConfig'
const FeaturedFoods = () => {
    const axiosrequest = useAxiosConfig()
    const [feturedFoodsData , setFeturedFoodsData]=useState([])
    const { isPending, error, data } = useQuery({
        queryKey: ['feturedfoodsData'],
        queryFn: () =>
          axiosrequest.get('/feturedfood')
            .then((data) => setFeturedFoodsData(data.data))
      });
      
  return (
    <div className='container mx-auto py-10 mt-5'>
      <h2 className='text-center text-4xl font-semibold pb-10'>Featured Foods</h2>
    </div>
  )
}

export default FeaturedFoods
