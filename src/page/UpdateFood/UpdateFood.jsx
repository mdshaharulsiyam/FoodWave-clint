import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosConfig from '../../CustomHooks/useAxiosConfig'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet'
import { useForm } from "react-hook-form";
import { FoodWaveData } from '../../Context/Context'
import axios from 'axios'
const UpdateFood = () => {
    const { userinfo } = useContext(FoodWaveData)
    const param = useParams()
    const queryClient = useQueryClient()
    const axiosrequest = useAxiosConfig()
    const [singlefoodData, setSingleFoodData] = useState([])
    const [sendingData, setsendindData] = useState(false)
    const { register, handleSubmit, } = useForm();
    const { id } = param
    const { isLoading, err, fooddata, refetch } = useQuery({
        queryKey: ['singlefoodsData',],
        queryFn: () =>
            axiosrequest.get(`/singlefood?id=${id}`)
                .then((data) => setSingleFoodData(data.data))
    });
    const updateform = document.getElementById('updateform')
    const sendDataToServer = async (formData) => {
        axiosrequest.put(`/foods?id=${id}`, formData);
    };
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: sendDataToServer,
        onSuccess: () => {
            setsendindData(false)
            navigate('/manageFood')
            // updateform.reset()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'food updated succesfully',
                showConfirmButton: false,
                timer: 1500
            })
            // queryClient.invalidateQueries({ queryKey: ['singlefoodsData'] })
        },
    })
    const formSubmit = async (data) => {
        const formData = new FormData()
        let { date, location, FoodName, Quantity, notes, foodimage } = data
        setsendindData(true)
        if (date === '') {
            date = singlefoodData?.date
        } else {

            const insertedDate = new Date(date);
            const year = insertedDate.getUTCFullYear();
            const month = (insertedDate.getUTCMonth() + 1).toString().padStart(2, "0");
            const day = insertedDate.getUTCDate().toString().padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;
            console.log(date, insertedDate, formattedDate)
            date = formattedDate

        }
        FoodName === '' ? FoodName = singlefoodData?.FoodName : FoodName = FoodName
        location === '' ? location = singlefoodData?.location : location = location
        Quantity === '' ? Quantity = singlefoodData?.Quantity : Quantity = Quantity
        notes === '' ? notes = singlefoodData?.notes : notes = notes
        if (foodimage.length > 0) {
            const res = await axios.post("https://api.imgbb.com/1/upload?key=5201d474546c521dc75dd9c96eea7a84", { image: foodimage[0] }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res.data.success) {
                foodimage = res.data.data.display_url
                const newData = {
                    FoodName, location, Quantity, foodimage, foodimage, notes, date,
                    'username': userinfo?.displayName,
                    'useremail': userinfo?.email,
                    'userephoto': userinfo?.photoURL,
                    'status': 'avaulable'
                }

                console.log(newData)
                mutation.mutate(newData);
                console.log(foodimage);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: 'unable to update image'
                });
            }
        }
        // foodimage === '' ? foodimage = singlefoodData?.foodimage : foodimage = foodimage

    }

    return (
        <div className='bg-black bg-opacity-5 py-8 relative'>
            <Helmet>
                <title>FoodWave | Update Food</title>
            </Helmet>
            {
                sendingData && <span className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span>
            }
            <div className="container mx-auto max-w-3xl">
                {/* <!-- Title --> */}
                <h4 className="text-3xl text-center text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-gray-200">
                    Update Dish
                </h4>

                {/* <!-- End Title --> */}
                {/* <!-- Form --> */}
                <form id='updateform' onSubmit={handleSubmit(formSubmit)}>

                    <div className="mb-4">
                        <label htmlFor="location">Food Name</label>
                        <input className='py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400' {...register("FoodName",)} defaultValue={singlefoodData?.FoodName} />
                    </div>
                    <div className='grid md:grid-cols-2 md:gap-2'>
                        <div className="mb-4">
                            <label htmlFor="location">Expired Date</label>
                            <input
                                type="date"
                                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                {...register("date",)}
                                defaultValue={singlefoodData?.date}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="location">Food Quantity</label>
                            <input
                                type="number"
                                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                {...register("Quantity",)}
                                defaultValue={singlefoodData?.Quantity}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location">Pickup Location</label>
                        <input className='py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400' {...register("location",)} defaultValue={singlefoodData?.location} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location">Additional Notes</label>
                        <textarea className='py-3 px-4 h-36 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400' {...register("notes",)} defaultValue={singlefoodData?.notes} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location">image url</label>
                        <input type='file' className='py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400' {...register("foodimage",)} defaultValue={singlefoodData?.foodimage} />
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

export default UpdateFood
