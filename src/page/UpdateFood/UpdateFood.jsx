import { useQuery, useMutation } from '@tanstack/react-query'
import useAxiosConfig from '../../CustomHooks/useAxiosConfig'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet'
import { useForm } from "react-hook-form";
import { FoodWaveData } from '../../Context/Context'
const UpdateFood = () => {
    const { userinfo } = useContext(FoodWaveData)
    const param = useParams()
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
    // const { FoodName, location, Quantity, notes, username, useremail, userephoto, status, foodimage, date, _id } = singlefoodData;
    const sendDataToServer = async (formData) => {
        axiosrequest.put(`/foods?id=${id}`, formData);
        setsendindData(false)
        addfoodform.reset()
    };
    const mutation = useMutation({
        mutationFn: sendDataToServer,
        onSuccess: () => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'food updated succesfully',
                showConfirmButton: false,
                timer: 1500
            })
            QueryClient.invalidateQueries({ queryKey: ['feturedfoodsData'] })
        },
    })
    const formSubmit = (data) => {
        const formData = new FormData()
        const { newfoodimage, date, location, FoodName, Quantity, notes } = data
        // setsendindData(true)
        if (date === '') {
            formData.append('date', singlefoodData?.date)
        } else {
            const currentDate = new Date()
            const insertedDate = new Date(date);
            if (currentDate > insertedDate) {
                return Swal.fire(
                    'opps!!',
                    `Expired Date should not be passed date`,
                    'error'
                )
            }
            const year = insertedDate.getUTCFullYear();
            const month = (insertedDate.getUTCMonth() + 1).toString().padStart(2, "0");
            const day = insertedDate.getUTCDate().toString().padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;
            console.log(date,insertedDate,formattedDate)
            formData.append('date', formattedDate)

        }
        FoodName === '' ? formData.append('FoodName', singlefoodData?.FoodName) : formData.append('FoodName', FoodName)
        location === '' ? formData.append('location', singlefoodData?.location) : formData.append('location', location)
        Quantity === '' ? formData.append('Quantity', singlefoodData?.Quantity) : formData.append('Quantity', Quantity)
        notes === '' ? formData.append('notes', singlefoodData?.notes) : formData.append('notes', notes)
       
        formData.append('username', userinfo?.displayName)
        formData.append('useremail', userinfo?.email)
        formData.append('userephoto', userinfo?.photoURL)
        formData.append('status', 'avaulable')
        if (!newfoodimage.length <= 0) {
            const file = newfoodimage[0]
            formData.append('file', file)
        } else {
            formData.append('foodimage', singlefoodData?.foodimage)
        }
        // console.log(formData)
        mutation.mutate(formData);
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
                <form id='addfoodform' onSubmit={handleSubmit(formSubmit)}>

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
                        <label for="profile-pic">Choose a new Food Image</label>
                        <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600" {...register("newfoodimage",)} placeholder="Choose Food Image" />
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
