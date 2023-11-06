import React, { useContext, useState } from 'react'
import Carousel from "nuka-carousel"
import Slider from '../../Components/Slider/Slider'
import { useQuery, } from '@tanstack/react-query'
import useAxiosConfig from '../../CustomHooks/useAxiosConfig'
const Foods = () => {
    const axiosrequest = useAxiosConfig()
    const [sliderData, setSliderData] = useState([])
    const { isPending, error, data } = useQuery({
        queryKey: ['feturedfoodsData'],
        queryFn: () =>
            axiosrequest.get('/feturedfood')
                .then((data) => setSliderData(data.data))
    });
    console.log(sliderData)
    return (
        <div className=''>
            <Carousel dragging={true}>
                {
                    isPending ? <span className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span> : sliderData?.map(item => <Slider key={item._id} item={item}> </Slider>)
                }
            </Carousel>
        </div>
    )
}

export default Foods
