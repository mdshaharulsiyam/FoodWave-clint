import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';

const FeaturedFoodsCud = ({ item }) => {
    console.log(item)
    const { FoodName, Quantity, foodimage, location, notes, status, useremail, userephoto, username, _id } = item
    return (
        <div className='w-full overflow-hidden p-3 box-border shadow-2xl rounded-xl'>
            <img className='w-full h-[330px] object-cover rounded-2xl bg-black bg-opacity-20' src={foodimage} alt="foodimage" />
            <span className='flex justify-start gap-2 items-center'>
            <h3 className='text-xl font-bold'>{FoodName}</h3>
            <p>Quantity : {Quantity}</p>
            </span>
            <span className='text-orange-500 py-2 flex justify-start items-center gap-1 font-extrabold'><MdLocationOn className='text-3xl' /><p>{location}</p></span>
            <span className='flex justify-between text-right font-bold items-center gap-1 text-xs'>
                <img className='w-10 h-10 rounded-full' src={userephoto} alt="userephoto" />
                <span>
                    <p>{username}</p>
                    <p>{useremail}</p>
                </span>
            </span>
            <Link className='block mx-auto text-center py-1 hover:bg-orange-300 transition-all bg-orange-500 rounded-lg my-2 font-extrabold'>request now</Link>
        </div>
    )
}

export default FeaturedFoodsCud
