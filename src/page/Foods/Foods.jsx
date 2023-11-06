import React, { useContext, useState } from 'react'
import Carousel from "nuka-carousel"
import Slider from '../../Components/Slider/Slider'
import { useQuery, } from '@tanstack/react-query'
import useAxiosConfig from '../../CustomHooks/useAxiosConfig'
import FeaturedFoodsCud from '../../Components/FeaturedFoods/FeaturedFoodsCud'
const Foods = () => {
    const axiosrequest = useAxiosConfig()
    const [sliderData, setSliderData] = useState([])
    const [foodData, setFoodData] = useState([])
    const { isPending, error, data } = useQuery({
        queryKey: ['feturedfoodsData'],
        queryFn: () =>
            axiosrequest.get('/feturedfood')
                .then((data) => setSliderData(data.data))
    });
    const { isfatching, err, fooddata } = useQuery({
        queryKey: ['foodsData'],
        queryFn: () =>
            axiosrequest.get('/foods')
                .then((data) => setFoodData(data.data))
    });
    console.log(foodData)
    return (
        <div className=''>
            <Carousel autoplay={true} autoplayInterval={2000} wrapAround={true} dragging={true}>
                {
                    isPending ? <span className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span> : sliderData?.map(item => <Slider key={item._id} item={item}> </Slider>)
                }
            </Carousel>
            <div>
                
            </div>
            <div className='grid md:grid-cols-2 md:gap-14 lg:grid-cols-3 lg:gap-5 relative pt-32 container mx-auto '>
                {
                    isfatching ? <span className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span> : foodData?.map(item => <FeaturedFoodsCud key={item._id} item={item}></FeaturedFoodsCud>)
                }
            </div>
        </div>
    )
}

export default Foods
