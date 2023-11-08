import { useQuery, useMutation,QueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { FoodWaveData } from '../../Context/Context';
import { Link, useParams } from 'react-router-dom';
import useAxiosConfig from '../../CustomHooks/useAxiosConfig';
import { Helmet } from 'react-helmet';
import { Table, Thead, Tbody, Tr, Image, Th, Td, Tooltip, Button } from '@chakra-ui/react'
import { useTable, useSortBy } from 'react-table';
import { useMemo } from 'react';
import Swal from 'sweetalert2';
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
            Header: 'name',
            accessor: 'username',
        },
        {
            Header: 'Date',
            accessor: 'date',
        },
        {
            Header: 'User email',
            accessor: 'requestUser',
        },
        {
            Header: 'userephoto',
            accessor: 'userephoto',
            Cell: ({ row }) => <Image className='mx-auto' src={row.values.userephoto} width="60px" />
        },
        {
            Header: 'status',
            accessor: 'status',
            Cell: ({ row }) => <><p>{row.values.status}</p> <Button onClick={() => getvalue(row)} className='text-xs uppercase font-serif rounded-md bg-orange-500 hover:scale-105 active:scale-90 py-1 px-2' data-hs-overlay="#hs-modal-recover-account">change</Button> </>
        },
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
    const sendDeletRequest = async (query) => {
        axiosrequest.delete(`/foodrequest?foodId=${query.foodid}&email=${query.email}&requester=${query.data}`);
    };
    const mutation = useMutation({
        mutationFn: sendDeletRequest,
        onSuccess: () => {
            Swal.fire({
                title: "Deliverd succesfull",
                text: "Your food has been Deliverd.",
                icon: "success"
            });
            QueryClient.invalidateQueries({ queryKey: ['managerequestdata'] })
        },
    })
    const [data,setdata]=useState(null)
    const getvalue = (row)=>{
        setdata(row.original.requestUser)
    }
    const handeldaliver =e=>{
        e.preventDefault()
        const status = e.target.status.value
        if (status === 'pending') {
            return   Swal.fire({
                title: "stutas!",
                text: "set status to pending succesfully",
                icon: "success"
            });
        }
        const foodid = id
        const email = userinfo?.email
        const query = {
            email,
            data,
            foodid
        }
        mutation.mutate(query);
    }
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

            <div id="hs-modal-recover-account" class="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div class="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-4 sm:p-7">
                            <div class="mt-5">
                                <form onSubmit={handeldaliver}>
                                    <div class="grid gap-y-4">
                                        <div>
                                            <label for="status" class="block text-sm mb-2 dark:text-white">select status</label>
                                            <div class="relative">
                                                <select name="status" id="status" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                                                    <option value="pending">pending</option>
                                                    <option value="deliver">deliver</option>
                                                </select>
                                            </div>
                                            <p class="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                        </div>

                                        <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">deliver</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageSingleFood
