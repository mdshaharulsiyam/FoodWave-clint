import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import Swal from 'sweetalert2';
import { FoodWaveData } from '../../Context/Context';
import useAxiosConfig from '../../CustomHooks/useAxiosConfig';
import axios from 'axios';
const AddFood = () => {
    const { userinfo } = useContext(FoodWaveData)
    const [sendingData, setsendindData] = useState(false)
    const axiosrequest = useAxiosConfig()
    const { register, handleSubmit, } = useForm();
    const addfoodform = document.getElementById('addfoodform')
    // send post request using axios 
    const sendDataToServer = async (newData) => {
        const res = await axiosrequest.post(`/foods?useremail=${userinfo?.email}`, newData);
        setsendindData(false)
        console.log(newData)
        addfoodform.reset()
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'food added succesfully',
            showConfirmButton: false,
            timer: 1500
        })
    };

    // tanstack query 
    const mutation = useMutation({
        mutationFn: sendDataToServer,
        onSuccess: () => {
            QueryClient.invalidateQueries({ queryKey: ['feturedfoodsData'] })
        },
    })
    //   get form data 
    const formSubmit = async (data) => {
        // setsendindData(true)
        const { date } = data
        // console.log(data)
        const insertedDate = new Date(date);
        const year = insertedDate.getUTCFullYear();
        const month = (insertedDate.getUTCMonth() + 1).toString().padStart(2, "0");
        const day = insertedDate.getUTCDate().toString().padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        const res = await axios.post("https://api.imgbb.com/1/upload?key=5201d474546c521dc75dd9c96eea7a84", { image: data.foodimage[0] }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            data.foodimage = res.data.data.display_url
            const newData = {
                ...data,
                'userephoto': userinfo?.photoURL,
                'useremail': userinfo?.email,
                'username': userinfo?.displayName,
                'date': formattedDate,
                'status': 'avaulable'

            }
            mutation.mutate(newData);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: 'unable to upload food image'
              });
        }

    }

    return (
        <div className='bg-black bg-opacity-5 py-8 relative'>
            <Helmet>
                <title>FoodWave | Add Food</title>
            </Helmet>
            {
                sendingData && <span className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span>
            }
            <div className="container mx-auto max-w-3xl">
                {/* <!-- Title --> */}
                <h4 className="text-3xl text-center text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-gray-200">
                    Add Dish
                </h4>

                {/* <!-- End Title --> */}
                {/* <!-- Form --> */}
                <form id='addfoodform' onSubmit={handleSubmit(formSubmit)}>

                    <div className="mb-4">
                        <label htmlFor="location">Food Name</label>
                        <input className='py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400' {...register("FoodName", { required: 'plese sellect food name', })} placeholder="Food name" />
                    </div>
                    <div className='grid md:grid-cols-2 md:gap-2'>
                        <div className="mb-4">
                            <label htmlFor="location">Expired Date</label>
                            <input
                                type="date"
                                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                {...register("date", { required: 'please sellsect date', })}
                                placeholder="Expired Date"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="location">Food Quantity</label>
                            <input
                                type="number"
                                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                {...register("Quantity", { required: 'please sellect pick up location', })}
                                placeholder="Food Quantity"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location">Pickup Location</label>
                        <input className='py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400' {...register("location", { required: 'plese sellect food name', })} placeholder="Pickup Location" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location">image url</label>
                        <input type='file' className='py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400' {...register("foodimage", { required: 'plese sellect food name', })} placeholder="food image url" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location">Additional Notes</label>
                        <textarea className='py-3 px-4 h-36 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400' {...register("notes", { required: 'plese sellect food name', })} placeholder="Additional Notes" />
                    </div>

                    <div className="grid">
                        <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 sm:p-4">add food</button>
                    </div>
                </form>

                {/* <!-- End Form --> */}
            </div>
        </div>
    )

}

export default AddFood
