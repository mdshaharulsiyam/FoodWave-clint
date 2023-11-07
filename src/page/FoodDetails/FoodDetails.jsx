import React, { useState } from 'react'
import useAxiosConfig from '../../CustomHooks/useAxiosConfig'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { MdLocationOn } from 'react-icons/md';
const FoodDetails = () => {
    const param = useParams()
    const navigate = useNavigate()
    const axiosrequest = useAxiosConfig()
    const [singlefoodData, setSingleFoodData] = useState([])
    const { id } = param
    const { isLoading, err, fooddata, refetch } = useQuery({
        queryKey: ['singlefoodsData',],
        queryFn: () =>
            axiosrequest.get(`/singlefood?id=${id}`)
                .then((data) => setSingleFoodData(data.data))
    });
    const { FoodName, location, Quantity, notes, username, useremail, userephoto, status, foodimage, date } = singlefoodData;
    const currentDate = new Date(date)
    const year = currentDate.getUTCFullYear();
    const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getUTCDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const goback=()=>{
        navigate(-1)
    }
    return (
        // <!-- Hero -->
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            {/* <!-- Grid --> */}
            <div class="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">

                <div class="lg:col-span-4 mt-10 lg:mt-0">
                    <img class="w-full rounded-xl" src={foodimage} alt="foodimage" />
                </div>
                <div class="lg:col-span-3">
                    <h1 class="block text-2xl font-bold text-gray-800 sm:text-3xl md:text-3xl lg:text-4xl dark:text-white">{FoodName}</h1>
                    <p class="mt-3 text-lg text-gray-800 dark:text-gray-400">{notes}</p>
                    <span className='text-orange-500 py-2 flex justify-start items-center gap-1 font-extrabold'><MdLocationOn className='text-3xl' /><p>{location}</p></span>
                    <span className='flex justify-start gap-2 items-center'>
                        <h3 className='text-xl font-bold'>{FoodName}</h3>
                        <p>Quantity : {Quantity}</p>
                    </span>
                    <p className='text-xs py-2 font-extrabold'>Expired in {formattedDate} <span className='font-semibold pl-5'>status : <span className='font-bold'>{status}</span></span></p>
                    <p>doner info</p>
                    <span className='flex justify-between text-right font-bold items-center gap-1 pt-2'>
                        <img className='w-10 h-10 rounded-full' src={userephoto} alt="userephoto" />
                        <span>
                            <p>{username}</p>
                            <p>{useremail}</p>
                        </span>
                    </span>
                    <button onClick={goback} className='px-8 py-2 bg-orange-500 rounded-lg active:scale-90 mt-3 font-bold'>back</button> <button className='px-8 py-2 bg-orange-500 rounded-lg active:scale-90 mt-3 font-bold'>send request</button>


                </div>
            </div>
            {/* <!-- End Grid --> */}
        </div>

    )
}

export default FoodDetails
