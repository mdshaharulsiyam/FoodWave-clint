import React, { useState } from 'react'
import useAxiosConfig from '../../CustomHooks/useAxiosConfig';
import { useQuery, useMutation } from '@tanstack/react-query'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };
    return (
        <div className='container mx-auto mb-9'>
            <h3 className='text-center font-bold text-4xl pb-14'>feedbacks</h3>
            <Carousel swipeable={false}
                draggable={true}
                showDots={true}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px">
                {
                    isLoading ? <span className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span> : feedbackdata?.map(item => <div className='p-4 h-72 overscroll-auto mx-2 bg-yellow-500 flex justify-center bg-opacity-25 rounded-xl shadow items-center' key={item._id}>
                        <span>
                            <div className='flex justify-start items-center gap-2'>
                                <img className='h-10 w-10 rounded-full' src={item.photoURL} alt="" />
                                <p className='font-bold'>{item.displayName}</p>
                            </div>
                            <p className='pt-2 font-semibold'>{item.feedback}</p>
                        </span>
                    </div>)
                }
            </Carousel>
        </div>
    )
}

export default FeedBack
