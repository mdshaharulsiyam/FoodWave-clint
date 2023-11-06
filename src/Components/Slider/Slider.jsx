import { Link } from "react-router-dom"
import { MdLocationOn } from 'react-icons/md';
const Slider = ({ item }) => {
    const { FoodName, Quantity, foodimage, location, notes, status, useremail, userephoto, username, _id } = item
    return (
        <div className="bg-yellow-200 bg-opacity-20">
            <div className='container mx-auto flex md:flex-row flex-col-reverse flex-wrap md:justify-center justify-start  gap-2 items-center '>
                <div className='md:w-[49%] w-full flex justify-start items-center text-center md:text-left'>
                    <span>
                        <h2 className='font-extrabold italic md:text-2xl text-2xl py-3 mx-auto md:mx-0 max-w-[510px] opacity-90 text-'>{FoodName}</h2>
                        <span className='text-orange-500 py-2 flex justify-start items-center gap-1 font-extrabold'><MdLocationOn className='text-3xl'/><p>{location}</p></span>
                        <p className="py-1 font-semibold">total {Quantity} pices</p>
                        <p className='md:text-base tracking-[.5px] text- opacity-90'>{notes}</p>
                        <Link to={`/details/${_id}`}><button className='btn py-2 px-7 rounded-sm font-bold bg-orange-500 mt-3'>purchase Now</button></Link>
                    </span>
                </div>
                <div className='md:w-[49%] max-h-[400px] w-full flex md:justify-end justify-center items-center overflow-hidden py-2'>
                    <img className='w-full p-4  object-cover' src={foodimage} alt="" />

                </div>
            </div>
        </div>
    )
}

export default Slider
