import React from 'react'
import Baner from '../../Components/Baner/Baner'
import { Helmet } from 'react-helmet';
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>FoodWave | Home</title>
      </Helmet>
      <Baner></Baner>
    </div>
  )
}

export default Home
