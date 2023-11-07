import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import Carousel from "nuka-carousel"
import Slider from '../../Components/Slider/Slider'
import { useQuery } from '@tanstack/react-query'
import useAxiosConfig from '../../CustomHooks/useAxiosConfig'
import FeaturedFoodsCud from '../../Components/FeaturedFoods/FeaturedFoodsCud'
import { useForm } from "react-hook-form";
const Foods = () => {
    const axiosrequest = useAxiosConfig()
    const { register, } = useForm();
    const [sliderData, setSliderData] = useState([])
    const [search, setsearch] = useState(false)
    const [filtervalue, setfiltervalue] = useState('')
    const [shortitem, setshortitem] = useState('none')
    const [shorby, setsortby] = useState('none')
    const [foodData, setFoodData] = useState([])
    const { isPending, error, data } = useQuery({
        queryKey: ['feturedfoodsData'],
        queryFn: () =>
            axiosrequest.get('/feturedfood')
                .then((data) => setSliderData(data.data))
    });
    const { isLoading, err, fooddata, refetch } = useQuery({
        queryKey: ['foodsData', shortitem, shorby, filtervalue],
        queryFn: () =>
            axiosrequest.get(`/foods?shortitem=${shortitem}&shorby=${shorby}&search=${filtervalue}`)
                .then((data) => setFoodData(data.data))
    });
    // handel search
    const handelsearch = () => {
        setsearch(!search)
    }
    return (
        <div className=''>
            <Carousel autoplay={true} autoplayInterval={2000} wrapAround={true} dragging={true}>
                {
                    isPending ? <span className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span> : sliderData?.map(item => <Slider key={item._id} item={item}> </Slider>)
                }
            </Carousel>
            <h3 className='text-center text-4xl font-semibold py-16'>Available Foods</h3>
            <div className='container mx-auto py-4 flex justify-between items-center'>
                <span>
                    <label className='text-lg font-bold'>short by</label> <br />
                    <select className='border-4 mr-3' onInput={(e) => setshortitem(e.target.value)} {...register("sortmethode")}>
                        <option value="none">none</option>
                        <option value="date">date</option>
                        <option value="quantity">quantity</option>
                    </select>
                    {
                        shortitem === 'date' && <select className='border-4' onInput={(e) => setsortby(e.target.value)} {...register(" ")}>
                            <option selected value="expierdsoon">expierd soon</option>
                            <option value="expierd later">expierd later</option>
                        </select>
                    }
                    {
                        shortitem === 'quantity' && <select className='border-4' onInput={(e) => setsortby(e.target.value)} {...register(" ")}>
                            <option selected value="largest">largest</option>
                            <option value="smaler">smaler</option>
                        </select>
                    }
                </span>
                <span className="relative">
                    <input onKeyUp={e => setfiltervalue(e.target.value)}
                        type="text"
                        placeholder="Search"
                        className="py-2 pl-10 pr-4 w-64 border-4 rounded-full focus:outline-none focus:ring focus:border-orange-400"
                    />
                    <FaSearch onClick={handelsearch} className="absolute top-[50%] translate-y-[-50%] right-3 text-2xl hover:text-orange-700 cursor-pointer active:scale-95 hover:scale-110 text-gray-500" />
                </span>
            </div>
            <div className='grid md:grid-cols-2 md:gap-14 lg:grid-cols-3 lg:gap-5 relative container mx-auto '>
                {
                    isLoading ? <span className='absolute top-[50%] my-28 left-[50%] -translate-x-[50%] -translate-y-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span> : foodData.map(item => <FeaturedFoodsCud key={item._id} item={item}></FeaturedFoodsCud>)
                }

            </div>
            {
                !isLoading && foodData.length <= 0 && <div>
                    <h4 className='text-center text-red-500 font-bold text-2xl'>no food found</h4>
                    <img className='text-center mx-auto' src='/nodata.webp'></img>

                </div>
            }
        </div>
    )
}

export default Foods
