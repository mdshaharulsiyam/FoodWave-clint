import React from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from "react-hook-form";
import { useState } from "react";
const AddFood = () => {
    // const [data, setData] = useState("");
    const { register, handleSubmit , formState: { errors }} = useForm();
    const formSubmit = (data) => {
        console.log(data)
    }
    return (
        <div className='bg-black bg-opacity-5 py-8 relative'>
            <Helmet>
                <title>FoodWave | Add Food</title>
            </Helmet>
            {/* {
                    loading && <span className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span>
                } */}
            <div className="container mx-auto max-w-3xl">
                {/* <!-- Title --> */}
                <h4 className="text-3xl text-center text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-gray-200">
                    Add Dish
                </h4>

                {/* <!-- End Title --> */}
                {/* <!-- Form --> */}
                <form onSubmit={handleSubmit(formSubmit)}>

                    <div className="mb-4">
                    <label htmlFor="location">Food Name</label>
                        <input classNameName='py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400' {...register("Food Name", { required: 'plese sellect food name', maxLength: 20 })} placeholder="First name" />
                    </div>
                    <div>
                        <div classNameName="mb-4">
                            <label htmlFor="location">Date</label>
                            <input
                                type="date"
                                classNameName="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                {...register("date", { required: 'please sellsect date', maxLength: 100 })}
                                placeholder="Enter location"
                            />
                        </div>
                        <div classNameName="mb-4">
                            <label htmlFor="location">Location:</label>
                            <input
                                classNameName="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                {...register("location", { required: 'please sellect pick up location', maxLength: 100 })}
                                placeholder="Enter location"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label for="profile-pic">Choose Food Image</label>
                        <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600" {...register("foodimage", { maxLength: 20 })} placeholder="First name" />
                    </div>

                    <div className="grid">
                        <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 sm:p-4">sign up</button>
                    </div>
                </form>

                {/* <!-- End Form --> */}
            </div>
        </div>
    )

}

export default AddFood
