import React, { useContext, useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery, } from '@tanstack/react-query'
import useAxiosConfig from '../../CustomHooks/useAxiosConfig'
import FeaturedFoodsCud from './FeaturedFoodsCud'
import { Link } from 'react-router-dom'
import { FoodWaveData } from '../../Context/Context'
const FeaturedFoods = () => {
  const axiosrequest = useAxiosConfig()
  const [feturedFoodsData, setFeturedFoodsData] = useState([])
  const { isPending, error, data } = useQuery({
    queryKey: ['feturedfoodsData'],
    queryFn: () =>
      axiosrequest.get('/feturedfood')
        .then((data) => setFeturedFoodsData(data.data))
  });

  return (
    <div className='container mx-auto py-10 mt-5'>
      <h2 className='text-center text-4xl font-semibold pb-10'>Featured Foods</h2>
      <div className='grid md:grid-cols-2 md:gap-14 lg:grid-cols-3 lg:gap-5 relative'>
        {
          isPending ? <span className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span> : feturedFoodsData.map(item => <FeaturedFoodsCud key={item._id} item={item}></FeaturedFoodsCud>)
        }
      </div>
      {
        !isPending &&  <span className='flex justify-center items-center py-9'><Link className='py-3 px-12 hover:bg-orange-300 bg-orange-500 hover:scale-110 rounded-lg font-extrabold transition-all' to={'/foods'}>show all</Link></span>
      }
    </div>
  )
}

export default FeaturedFoods
