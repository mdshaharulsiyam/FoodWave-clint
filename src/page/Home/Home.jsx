import React from 'react'
import Baner from '../../Components/Baner/Baner'
import { Helmet } from 'react-helmet';
import FeaturedFoods from '../../Components/FeaturedFoods/FeaturedFoods';
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>FoodWave | Home</title>
      </Helmet>
      <Baner></Baner>
      <FeaturedFoods></FeaturedFoods>
    </div>
  )
}

export default Home
