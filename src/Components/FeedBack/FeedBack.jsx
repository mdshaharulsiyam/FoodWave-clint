import React, { useState } from 'react'
import useAxiosConfig from '../../CustomHooks/useAxiosConfig';
import { useQuery, useMutation } from '@tanstack/react-query'
import 'react-multi-carousel/lib/styles.css';
import Carousel from "nuka-carousel"
import FeedBackItems from './FeedBackItems';
const FeedBack = () => {
  const axiosrequest = useAxiosConfig()
  const [feedbackdata, setfeedbackdata] = useState([])
  const { isLoading, err, fooddata, refetch } = useQuery({
    queryKey: ['feedback',],
    queryFn: () =>
      axiosrequest.get(`/feedback`)
        .then((data) => setfeedbackdata(data.data))
  });
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className='container mx-auto mb-9 relative'>
      <h3 className='text-center font-bold text-4xl pb-14'>feedbacks</h3>
      {
        isLoading ? <span className='absolute top-[90%] left-[50%] -translate-x-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span> : <Carousel slidesToScroll={2} dragging={true} slidesToShow={2} >
          {
            feedbackdata?.map(item => <FeedBackItems  key={item._id} item={item}></FeedBackItems >)
          }
        </Carousel>
      }
    </div>
  )
}

export default FeedBack
