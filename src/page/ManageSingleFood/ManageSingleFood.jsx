import { useQuery, useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { FoodWaveData } from '../../Context/Context';
import { Link, useParams } from 'react-router-dom';
import useAxiosConfig from '../../CustomHooks/useAxiosConfig';
import { Helmet } from 'react-helmet';
import { Table, Thead, Tbody, Tr, Image, Th, Td, Tooltip, Button } from '@chakra-ui/react'
import { useTable, useSortBy } from 'react-table';
import { useMemo } from 'react';
const ManageSingleFood = () => {
    const params = useParams()
    const axiosrequest = useAxiosConfig()
    const { id } = params
    const [manageFoodData, setManageFoodData] = useState([])
    const [requestedData, setrequestedData] = useState([])
    const { userinfo } = useContext(FoodWaveData)
    const { isLoading, err, fooddata } = useQuery({
        queryKey: ['managesingleFood', userinfo?.email],
        queryFn: () =>
            axiosrequest.get(`/managefood?email=${userinfo?.email}&id=${id}`)
                .then((data) => setManageFoodData(data.data))
    });
    const { ispending, error, requestdata } = useQuery({
        queryKey: ['managerequestdata', userinfo?.email],
        queryFn: () =>
            axiosrequest.get(`/foodrequest?email=${userinfo?.email}&id=${id}`)
                .then((data) => setrequestedData(data.data))
    });
    console.log(requestedData)
    const { FoodName, Quantity, foodimage, location, notes, status, useremail, userephoto, username, _id, date, } = manageFoodData
    const currentDate = new Date(date)
    const year = currentDate.getUTCFullYear();
    const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getUTCDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const columns = useMemo(() => [
        {
            Header: 'Name',
            accessor: 'FoodName',
        },
        {
            Header: 'Date',
            accessor: 'date',
        },
        {
            Header: 'Quantity',
            accessor: 'Quantity',
        },
        {
            Header: 'Location',
            accessor: 'location',
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
        {
            Header: 'foodimage',
            accessor: 'foodimage',
            Cell: ({ row }) => <Image className='mx-auto' src={row.values.foodimage} width="60px" />
        },
        // {
        //     Header: 'Actions',
        //     accessor: 'actions',
        //     Cell: ({ row }) => (
        //         <div className='flex justify-center items-center text-2xl gap-2'>
        //             <Tooltip label="manage">
        //                 <button className='hover:scale-125 hover:rotate-180 transition-all' onClick={() => handleViewDetails(row)}><FcSettings /></button>
        //             </Tooltip>
        //             <Tooltip label="Edit">
        //                 <button className='hover:scale-125 transition-all' onClick={() => handleEdit(row)}><FaEdit /></button>
        //             </Tooltip>
        //             <Tooltip label="delete">
        //                 <button className='hover:scale-125 hover:text-red-600 transition-all' onClick={() => handleDelete(row)}><AiTwotoneDelete /></button>
        //             </Tooltip>
        //         </div>
        //     ),
        // },
    ], []);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: requestedData,
    }, useSortBy);
    return (
        <>
            <div className="bg-yellow-200 bg-opacity-20">
                <Helmet>
                    <title>FoodWave | Manage Request</title>
                </Helmet>
                <div className='container mx-auto flex md:flex-row flex-col-reverse flex-wrap md:justify-center justify-start  gap-2 items-center '>
                    <div className='md:w-[49%] max-h-[400px] w-full flex md:justify-end justify-center items-center overflow-hidden py-2'>
                        <img className='w-full p-4  object-cover' src={foodimage} alt="" />
                    </div>
                    <div className='md:w-[49%] w-full flex justify-start items-center text-center md:text-left'>
                        <span>
                            <h2 className='font-extrabold italic md:text-2xl text-2xl py-3 mx-auto md:mx-0 max-w-[510px] opacity-90 text-'>{FoodName}</h2>
                            <p className="py-1 font-semibold">total {Quantity} pices</p>
                            <p className='text-xs py-1 font-extrabold'>Expired in {formattedDate}</p>
                            <p className='md:text-base tracking-[.5px] text- opacity-90'>{notes}</p>

                        </span>
                    </div>
                </div>
            </div>
            <div>
                <h4 className='text-center font-bold text-4xl my-6'>request for this food</h4>
                <div className='px-3'>
                    <Table className='text-center mx-auto w-full' variant='striped' colorScheme='teal' {...getTableProps()} >
                        <Thead>
                            {headerGroups.map(headerGroup => (
                                <Tr className='font-extrabold text-xl uppercase text-orange-500 ' {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <Th className='px-2 py-3' {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</Th>
                                    ))}
                                </Tr>
                            ))}
                        </Thead>
                        <Tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <Tr className='py-2' {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return (
                                                <Td className='py-4 border-4 border-orange-300' {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                            );
                                        })}
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default ManageSingleFood
