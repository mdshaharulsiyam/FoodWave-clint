import React from 'react'
import { useQueryClient, useMutation, } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosConfig from '../../CustomHooks/useAxiosConfig';
const RequestedCard = ({ item ,requestedData ,setrequestedData}) => {
    const { username, location, date, requastedDate, donation, status, foodimage, requestUser ,_id } = item
    const axiosrequest = useAxiosConfig()
    const sendDeletRequest = async (query) => {
        axiosrequest.delete(`/myrequest?id=${query.id}&email=${query.email}`);
    };
    const queryClint= useQueryClient()
    const mutation = useMutation({
        mutationFn: sendDeletRequest,
        onSuccess: () => {
            const newData = requestedData.filter(item => item._id !== _id)
            setrequestedData(newData)
            Swal.fire({
                title: "cancel request succesfull",
                text: "Your food has been canceled.",
                icon: "success"
            });
            // queryClint.invalidateQueries({ queryKey: ['managesingleFood'] })
        },
    })
    const cancelRequest = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const query = {
                    id,
                    email: requestUser
                }
                mutation.mutate(query);
            }
        });
    }
    return (
        <div className='flex justify-start items-center gap-[2%]'>
            <div className='w-[48%] '>
                <img className='w-full object-cover' src={foodimage} alt="" />
            </div>
            <div className='w-1/2'>
                <h2 className=' font-semibold'>Donar : {username}</h2>
                <p className='text-xs font-bold'>location {location}</p>
                <p>request date : {requastedDate}</p>
                <p className='text-sm font-bold'>Expire in {date}</p>
                <p>status  <span className='bg-orange-50 font-bold'>{status !== 'Deliverd' ? 'avilable' : status}</span></p>
                <p>donation : {donation} taka</p>
                {
                    status !== 'Deliverd' ? <button onClick={() => cancelRequest(item._id)} className='bg-red-500 py-1 px-3 text-white rounded-md active:scale-90 transition-all hover:bg-red-300 hover:text-black font-bold'>cancel request</button> : <button className='bg-red-500 py-1 px-3 text-white rounded-md transition-all hover:bg-red-300 hover:text-black font-bold'>Deliverd</button>
                }
            </div>
        </div>
    )
}

export default RequestedCard
