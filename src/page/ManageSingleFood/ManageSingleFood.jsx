import { useQuery, useMutation, QueryClient, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
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
    const [requestedTableData, setrequestedTableData] = useState([])
    const { userinfo } = useContext(FoodWaveData)
    const { isLoading, err, fooddata } = useQuery({
        queryKey: ['managesingleFood', userinfo?.email],
        queryFn: () =>
            axiosrequest.get(`/managefood?email=${userinfo?.email}&id=${id}`)
                .then((data) => setManageFoodData(data.data))
    });
    const queryClint = useQueryClient()
    const { ispending, error, requestdata } = useQuery({
        queryKey: ['managerequestdata', userinfo?.email],
        queryFn: () =>
            axiosrequest.get(`/foodrequest?email=${userinfo?.email}&id=${id}`)
                .then((data) => setrequestedData(data.data))
    });
    const { FoodName, Quantity, foodimage, location, notes, status, useremail, userephoto, username, _id, date, } = manageFoodData
    const currentDate = new Date(date)
    const year = currentDate.getUTCFullYear();
    const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getUTCDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const columns = useMemo(() => [
        {
            Header: 'name',
            accessor: 'requestUserName',
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
            Cell: ({ row }) => <><p>{row.values.status}</p> <Button onClick={() => getvalue(row)} className='text-xs uppercase font-serif rounded-md bg-orange-500 hover:scale-105 active:scale-90 py-1 px-2' >change</Button> </>
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
    const [Id, setId] = useState(null)
    const mutation = useMutation({
        mutationFn: sendDeletRequest,
        onSuccess: () => {
            console.log(Id)
            const newData = requestedData.filter(item => item._id !== Id)
            setrequestedData(newData)
            Swal.fire({
                title: "Deliverd succesfull",
                text: "Your food has been Deliverd.",
                icon: "success"
            });
            queryClint.invalidateQueries({ queryKey: ['managerequestdata', 'managesingleFood'] })
        },
    })
    const [data, setdata] = useState(null)
    const getvalue = async (row) => {
        setdata(row.original.requestUser)
        setId(row.original._id)
        const { value: status } = await Swal.fire({
            title: "Select status",
            input: "select",
            inputOptions: {
                pending: "pending",
                deliver: "deliver",
            },
            inputPlaceholder: "Select status",
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value === "deliver") {
                        resolve();
                    } else {
                        resolve("status already set to pending :)");
                    }
                });
            }
        });
        if (status) {
            // Swal.fire(`You selected: ${fruit}`);
            console.log(status)
            const foodid = id
            const email = userinfo?.email
            const query = {
                email,
                data,
                foodid
            }
            mutation.mutate(query);
        }
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
            <div className='relative py-14'>
                <h4 className='text-center font-bold text-4xl my-6'>request for this food</h4>
                {
                    ispending && <span className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span>
                }
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
                    {
                        requestedData.length <= 0 && <h4 className='text-red-400 font-bold text-4xl py-3 text-center'>no request for this food </h4>
                    }
                </div>
            </div>
         
        </>
    )
}

export default ManageSingleFood
