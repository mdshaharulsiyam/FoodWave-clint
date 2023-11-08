import React, { useContext } from 'react'
import { FoodWaveData } from '../../Context/Context'
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosConfig from '../../CustomHooks/useAxiosConfig';
const AddFeedBack = () => {
    const axiosrequest = useAxiosConfig()
    const { userinfo } = useContext(FoodWaveData)
    console.log(userinfo)

    const sendDeletRequest = async (query) => {
        axiosrequest.post(`/feedback`);
    };
    const mutation = useMutation({
        mutationFn: sendDeletRequest,
        onSuccess: () => {
            Swal.fire({
                title: "feedback added succesfull",
                text: "Your feedback has been added.",
                icon: "success"
            });
            QueryClient.invalidateQueries({ queryKey: ['managerequestdata'] })
        },
    })
    const sendfeedback = (e) => {
        e.preventDefault();
        const feedback = e.target.feedback.value;
        if (feedback === '') {
            return Swal.fire({
                title: "opps!!",
                text: "feedback is empty",
                icon: "error"
            });
        }
        if (feedback.length < 50 ) {
            return Swal.fire({
                title: "opps!!",
                text: "feedback will be more then 50 charecter",
                icon: "error"
            });
        }
        const data = {
            ...userinfo,
            feedback
        }
        // console.log(data)
        mutation.mutate(data);
    }
    return (
        <div className=' bg-yellow-100 py-10 '>
            <div className='container mx-auto grid md:grid-cols-2 gap-3 px-2'>
                <div className='flex justify-start items-center gap-4'>
                    <img className='max-w-[90px]' src={userinfo?.photoURL} alt="" />
                    <span>
                        <p className='font-bold'>{userinfo?.displayName}</p>
                        <p>{userinfo?.email}</p>
                    </span>
                </div>
                <div>
                    <form onSubmit={sendfeedback}>
                        <h3 className='text-2xl font-bold pb-2'>send your feedback</h3>
                        <div class="relative">
                            <textarea id="hs-textarea-ex-1" name='feedback' class="p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="write your feedback"></textarea>
                            <div class="absolute bottom-px inset-x-px p-2 rounded-b-md bg-white dark:bg-slate-900">
                                <div class="flex justify-end items-center">
                                    <button type="submit" class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        <svg class="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddFeedBack
