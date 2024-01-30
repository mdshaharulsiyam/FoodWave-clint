import React, { useContext } from 'react'
import { FoodWaveData } from '../../Context/Context'
import { useQuery, useMutation, QueryClient, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { BsSendFill } from 'react-icons/bs';
import useAxiosConfig from '../../CustomHooks/useAxiosConfig';
const AddFeedBack = () => {
    const axiosrequest = useAxiosConfig()
    const { userinfo } = useContext(FoodWaveData)
    const queryClint = useQueryClient()
    const sendDeletRequest = async (data) => {
        axiosrequest.post(`/feedback`, data);
    };
    const mutation = useMutation({
        mutationFn: sendDeletRequest,
        onSuccess: () => {
            Swal.fire({
                title: "feedback added succesfull",
                text: "Your feedback has been added.",
                icon: "success"
            });
            queryClint.invalidateQueries({ queryKey: ['feedback'] })
        },
    })
    const sendfeedback = (e) => {
        e.preventDefault();
        const feedback = e.target.feedback.value;
        if (!userinfo?.email) {
            return Swal.fire({
                title: "opps!!",
                text: "you need to login for send feedback",
                icon: "error"
            });
        }
        if (feedback === '') {
            return Swal.fire({
                title: "opps!!",
                text: "feedback is empty",
                icon: "error"
            });
        }
        if (feedback.length < 50) {
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
        mutation.mutate(data);
        e.target.reset()
    }
    return (
        <div className=' bg-yellow-100 bg-opacity-50 py-10 mt-20'>
            <div className='container mx-auto grid md:grid-cols-2 gap-3 px-2'>
                <div className='sm:flex justify-start items-center gap-4'>
                    <img className='max-w-[90px]' src={userinfo?.photoURL} alt="" />
                    <span>
                        <p className='font-bold'>{userinfo?.displayName}</p>
                        <p>{userinfo?.email}</p>
                    </span>
                </div>
                <div>
                    <h3 className='text-2xl font-bold pb-2'>send your feedback</h3>
                    <form onSubmit={sendfeedback}>
                        <div className="relative inline-block ">
                            <textarea id="hs-textarea-ex-1" name='feedback' className="p-4 pb-12 w-full md:w-[400px] lg:w-[500px] border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="write your feedback"></textarea>
                            <button className='p-2 hover:scale-110 active:scale-95 text-2xl absolute right-0 bottom-1'><BsSendFill></BsSendFill></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddFeedBack
