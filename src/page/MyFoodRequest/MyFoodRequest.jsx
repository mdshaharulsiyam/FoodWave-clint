import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { FoodWaveData } from '../../Context/Context';
import { Link, useParams } from 'react-router-dom';
import useAxiosConfig from '../../CustomHooks/useAxiosConfig';
import { Helmet } from 'react-helmet';
import { Table, Thead, Tbody, Tr, Image, Th, Td, Tooltip, Button } from '@chakra-ui/react'
import { useTable, useSortBy } from 'react-table';
import { useMemo } from 'react';
import Swal from 'sweetalert2';
import RequestedCard from '../../Components/RequestedCard/RequestedCard';
const MyFoodRequest = () => {
    const axiosrequest = useAxiosConfig()
    const [requestedData, setrequestedData] = useState([])
    const { userinfo } = useContext(FoodWaveData)
    console.log(requestedData.length)
    const { isLoading, err, fooddata } = useQuery({
        queryKey: ['managesingleFood', userinfo?.email],
        queryFn: () =>
            axiosrequest.get(`/requestfood?email=${userinfo?.email}`)
                .then((data) => setrequestedData(data.data))
    });
    return (
        <div className='container mx-auto '>
            <h3 className='text-center font-bold text-4xl py-8'>my Food Request</h3>
            <div className='grid lg:grid-cols-2 gap-3 '>
                {
                    requestedData.map(item => <RequestedCard key={item._id} item={item}></RequestedCard>)
                }
            </div>
        </div>
    )
}

export default MyFoodRequest
