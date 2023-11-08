import React from 'react'
import { Link } from 'react-router-dom'

const Baner = () => {
  return (
    <div className="bg-[url('/baner.png')] bg-no-repeat bg-cover py-16">
      <div className='sm:flex text-center sm:text-left justify-between items-center gap-5 container mx-auto'>
        <div className='w-[50%]'>
          <h2 className='text-white text-4xl font-bold pb-4'>Healthy Eating is important part of lifestyle</h2>
          <p className='translate-x-1'>FoodWave is a community-driven initiative that connects those with surplus food to those who need it most. It's a simple concept with a powerful impact. Share what you can spare, and ensure that no one goes hungry. Join us in spreading love, one meal at a time</p>
          <h3 className='text-xl font-bold text-white py-3 drop-shadow-2xl'>Are you starving?</h3>
          <Link to={'/foods'} className='active:scale-95 font-bold py-1 px-4 bg-lime-500 rounded-md'>see food items</Link>
        </div>
        <img className='drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] ' src="/banercontent.webp" alt="" />
      </div>

    </div>
  )
}

export default Baner
