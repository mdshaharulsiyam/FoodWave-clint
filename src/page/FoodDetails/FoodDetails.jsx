import React, { useContext, useState } from 'react'
import useAxiosConfig from '../../CustomHooks/useAxiosConfig'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { MdLocationOn } from 'react-icons/md';
import { FoodWaveData } from '../../Context/Context';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
const FoodDetails = () => {
    const { userinfo } = useContext(FoodWaveData)
    const queryClint = useQueryClient()
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
    const { FoodName, location, Quantity, notes, username, useremail, userephoto, status, foodimage, date, _id } = singlefoodData;

    const goback = () => {
        navigate(-1)
    }
    const newdate = new Date()
    const requestDate = newdate.toLocaleString()
    const sendDataToServer = async (requestData) => {
        const res = await axiosrequest.post('/foodrequest', requestData);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'food requested succesfully',
            showConfirmButton: false,
            timer: 1500
        })
    };
    const mutation = useMutation({
        mutationFn: sendDataToServer,
        onSuccess: () => {
            queryClint.invalidateQueries({ queryKey: ['requestedFood'] })
        },
    })
    const sendRequest = e => {
        e.preventDefault()
        const additionalnote = e.target.additionalnote.value;
        const donation = e.target.donation.value;
        if (!userinfo.email) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "please login first",
            });
        }
        const currentDate = new Date();
        const year = currentDate.getUTCFullYear();
        const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, "0");
        const day = currentDate.getUTCDate().toString().padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        const requestData = {
            FoodName, location, Quantity, notes, username, useremail, userephoto, foodimage, date, additionalnote, donation,
            'requestUser': userinfo?.email,
            'requestUserName': userinfo?.displayName,
            'foodid': _id,
            'requastedDate': formattedDate,
            'status': 'pending'
        }
        mutation.mutate(requestData);
        e.target.reset()
    }
    function gologin() {
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please login first",
        });
    }
const modalbtn =document.getElementById('modalbtn')
const close =()=>{
    modalbtn.click()
}
    return (

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>FoodWave | Food Details</title>
            </Helmet>
            <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">

                <div className="lg:col-span-4 mt-10 lg:mt-0">
                    <img className="w-full rounded-xl" src={foodimage} alt="foodimage" />
                </div>
                <div className="lg:col-span-3">
                    <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl md:text-3xl lg:text-4xl dark:text-white">{FoodName}</h1>
                    <p className="mt-3 text-lg text-gray-800 dark:text-gray-400">{notes}</p>
                    <span className='text-orange-500 py-2 flex justify-start items-center gap-1 font-extrabold'><MdLocationOn className='text-3xl' /><p>{location}</p></span>
                    <p>Quantity : {Quantity}</p>
                    <p className='text-xs py-2 font-extrabold'>Expired in {date} <span className='font-semibold pl-5'>status : <span className='font-bold'>{status}</span></span></p>
                    <p>doner info</p>
                    <span className='flex justify-between text-right font-bold items-center gap-1 pt-2'>
                        <img className='w-10 h-10 rounded-full' src={userephoto} alt="userephoto" />
                        <span>
                            <p>{username}</p>
                            <p>{useremail}</p>
                        </span>
                    </span>
                    <button onClick={goback} className='px-8 text-white py-2 bg-red-500 hover:bg-red-700 rounded-lg active:scale-90 mt-3 font-bold mr-3'>back</button>
                    {
                        userinfo?.email ? <button type="button" className="px-8 py-[9px] bg-orange-500 rounded-lg active:scale-90 mt-3 font-bold inline-flex items-center gap-x-2 text-sm  border border-transparent text-white hover:bg-orange-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={() => document.getElementById('my_modal_5').showModal()}>
                            send request
                        </button> : <button onClick={gologin} type="button" className="px-8 py-[9px] bg-orange-500 rounded-lg active:scale-90 mt-3 font-bold inline-flex items-center gap-x-2 text-sm  border border-transparent text-white hover:bg-orange-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                            send request
                        </button>
                    }




                </div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_5" className="modal w-1/2 p-6 rounded-3xl modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div className="modal-action">
                            <form method="dialog" className='flex justify-end'>
                                <button id='modalbtn' className="btn bg-red-500 py-2 px-8 font-bold text-white rounded-md hover:scale-110 transition-all hover:text-black">Close</button>
                            </form>
                        </div>
                        <div className="text-center">
                            <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">request form</h2>
                        </div>
                        <div className="grid gap-y-4">
                            {/* <!-- Form Group --> */}
                            <div>
                                <label for="email" className="block text-sm mb-2 dark:text-white">Food Name</label>
                                <div className="relative">
                                    <input type="text" disabled defaultValue={FoodName} id="email" name="email" className="py-3 border-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                                </div>
                            </div>
                            <div>
                                <div className="relative text-center">
                                    <img className='mx-auto' src={foodimage} alt="" />
                                </div>
                            </div>
                            <div>
                                <label for="email" className="block text-sm mb-2 dark:text-white">Food Id</label>
                                <div className="relative">
                                    <input type="text" disabled defaultValue={_id} id="email" name="id" className="py-3 border-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                                </div>
                            </div>
                            <div>
                                <label for="email" className="block text-sm mb-2 dark:text-white">Food Donator email</label>
                                <div className="relative">
                                    <input type="text" disabled defaultValue={useremail} id="email" name="id" className="py-3 border-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                                </div>
                            </div>
                            <div>
                                <label for="email" className="block text-sm mb-2 dark:text-white">Food Donator Name</label>
                                <div className="relative">
                                    <input type="text" disabled defaultValue={username} id="email" name="id" className="py-3 border-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                                </div>
                            </div>
                            <div>
                                <label for="email" className="block text-sm mb-2 dark:text-white">User email</label>
                                <div className="relative">
                                    <input type="text" disabled defaultValue={userinfo?.email} id="email" name="id" className="py-3 border-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                                </div>
                            </div>
                            <div>
                                <label for="email" className="block text-sm mb-2 dark:text-white">request Date</label>
                                <div className="relative">
                                    <input type="text" disabled defaultValue={requestDate} id="email" name="id" className="py-3 border-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                                </div>
                            </div>
                            <div>
                                <label for="email" className="block text-sm mb-2 dark:text-white">Pickup Location</label>
                                <div className="relative">
                                    <input type="text" disabled defaultValue={location} id="email" className="py-3 border-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                                </div>
                            </div>
                            <div>
                                <label for="email" className="block text-sm mb-2 dark:text-white">Expire Date</label>
                                <div className="relative">
                                    <input type="text" disabled defaultValue={date} id="email" className="py-3 border-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                                </div>
                            </div>

                            <form onSubmit={sendRequest}>
                                <div>
                                    <label for="email" className="block text-sm mb-2 dark:text-white"> Additional Notes</label>
                                    <div className="relative">
                                        <textarea type="text" name="additionalnote" className="py-3 h-24 border-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    </div>
                                </div>
                                <div>
                                    <label for="email" className="block text-sm mb-2 dark:text-white">Donation Money</label>
                                    <div className="relative">
                                        <input type="number" defaultValue={0} placeholder='if want you can donate' name='donation' className="py-3 border-2 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                                    </div>
                                </div>
                                <button onClick={close} id='close' type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-600 mt-2 text-white hover:bg-orange-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">request </button>
                            </form>
                        </div>

                    </div>
                </dialog>
            </div>
            {/* <!-- End Grid --> */}
            <div id="hs-modal-signin" className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-4 sm:p-7">
                            <div className="text-center">
                                <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">request form</h2>
                            </div>

                            <div className="mt-5">

                                {/* <!-- End Form --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FoodDetails
