import React, { useContext, useState } from 'react';
import { FoodWaveData } from '../../Context/Context';
import useAxiosConfig from '../../CustomHooks/useAxiosConfig';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTable, useSortBy } from 'react-table';
import { useMemo } from 'react';
import { Table, Thead, Tbody, Tr, Image, Th, Td, Tooltip, Button } from '@chakra-ui/react'
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { FcSettings } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
const ManageFood = () => {
    const navigate = useNavigate()
    const { userinfo } = useContext(FoodWaveData)
    const axiosrequest = useAxiosConfig()
    const [managefoodData, setManageFoodData] = useState([])
    const { email } = userinfo;
    const { isLoading, err, fooddata, refetch } = useQuery({
        queryKey: ['manageFood', email],
        queryFn: () =>
            axiosrequest.get(`/myfood?email=${email}`)
                .then((data) => setManageFoodData(data.data))
    });
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
            Header: 'foodimage',
            accessor: 'foodimage',
            Cell: ({ row }) => <Image className='mx-auto' src={row.values.foodimage} width="60px" />
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className='flex justify-center items-center text-2xl gap-2'>
                    <Tooltip label="manage">
                        <button className='hover:scale-125 hover:rotate-180 transition-all' onClick={() => handleViewDetails(row)}><FcSettings /></button>
                    </Tooltip>
                    <Tooltip label="Edit">
                        <button className='hover:scale-125 transition-all' onClick={() => handleEdit(row)}><FaEdit /></button>
                    </Tooltip>
                    <Tooltip label="delete">
                        <button className='hover:scale-125 hover:text-red-600 transition-all' onClick={() => handleDelete(row)}><AiTwotoneDelete /></button>
                    </Tooltip>
                </div>
            ),
        },
    ], []);
    const sendDeletRequest = async (id) => {
        axiosrequest.delete(`/foods?id=${id}`);
        setsendindData(false)
    };
    const mutation = useMutation({
        mutationFn: sendDeletRequest,
        onSuccess: () => {
            Swal.fire({
                title: "Deleted!",
                text: "Your food has been deleted.",
                icon: "success"
            });
            QueryClient.invalidateQueries({ queryKey: ['manageFood'] })
        },
    })
    const handleEdit = (row) => {
        navigate(`/update/${row.original._id}`)
    };

    const handleDelete = (row) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate(row.original._id);
            }
        });
    };

    const handleViewDetails = (row) => {
        navigate(`/manage/${row.original._id}`)
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: managefoodData,
    }, useSortBy);

    return (
        <div className='px-2'>
            <Helmet>
                <title>FoodWave | Manage Foods</title>
            </Helmet>
            <h3 className='text-center text-3xl mt-16 mb-4 font-bold'>my food list</h3>
            <Table className='text-center mx-auto w-full' variant='striped' colorScheme='teal' {...getTableProps()} >
                <Thead>
                    {headerGroups.map(headerGroup => (
                        <Tr className='font-extrabold text-xl uppercase text-orange-500 ' {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <Th className='' {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</Th>
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
                                        <Td className='border-4 border-orange-300' {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </div>
    );

};

export default ManageFood;

