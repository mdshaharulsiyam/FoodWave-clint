import React from 'react'

const FeedBackItems = ({item}) => {
    return (
        <div className='p-4 h-72 overflow-hidden mx-2 bg-yellow-500 flex justify-center bg-opacity-25 rounded-xl shadow items-center'>
            <span>
                <div className='flex justify-start items-center gap-2'>
                    <img className='h-10 w-10 rounded-full' src={item.photoURL} alt="" />
                    <p className='font-bold'>{item.displayName}</p>
                </div>
                <p className='pt-2 font-semibold'>{item.feedback}</p>
            </span>
        </div>
    )
}

export default FeedBackItems
