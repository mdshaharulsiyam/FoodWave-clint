import React from 'react'

const RequestedCard = ({ item }) => {
    console.log(item)
    const { username, location, date, requastedDate, donation, status, foodimage } = item
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
                <p>status  <span className='bg-orange-50 font-bold'>{status !== 'Deliverd'?'avilable':status}</span></p>
                <p>donation : {donation} taka</p>
                {
                    status !== 'Deliverd' && <button>cancel request</button>
                }
            </div>
        </div>
    )
}

export default RequestedCard
