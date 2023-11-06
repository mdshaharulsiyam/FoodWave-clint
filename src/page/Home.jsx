import React from 'react'
import Baner from '../Components/Baner/Baner'
import { Helmet } from 'react-helmet';
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>FoodWave | Home</title>
        <meta name="description" content="This is a description of my page." />
      </Helmet>
      <Baner></Baner>
    </div>
  )
}

export default Home
