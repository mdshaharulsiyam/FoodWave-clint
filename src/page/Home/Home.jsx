import React from 'react'
import Baner from '../../Components/Baner/Baner'
import { Helmet } from 'react-helmet';
import FeaturedFoods from '../../Components/FeaturedFoods/FeaturedFoods';
import AddFeedBack from '../../Components/AddFeedback/AddFeedBack';
import FeedBack from '../../Components/FeedBack/FeedBack';
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>FoodWave | Home</title>
      </Helmet>
      <Baner></Baner>
      <FeaturedFoods></FeaturedFoods>
      <FeedBack></FeedBack>
      <AddFeedBack></AddFeedBack>
    </div>
  )
}

export default Home
