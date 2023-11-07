import React, { useContext, useState } from 'react';
import { FoodWaveData } from '../../Context/Context';
import useAxiosConfig from '../../CustomHooks/useAxiosConfig';
import { useQuery } from '@tanstack/react-query';
import { useTable ,useSortBy} from 'react-table';
import { useMemo } from 'react';
import {Table,Thead,Tbody,Tr,Image,Th,Td,} from '@chakra-ui/react'
const ManageFood = () => {
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
console.log(managefoodData)
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
            Cell:({ row }) => <Image className='mx-auto' src={row.values.foodimage}  width="60px"/>
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div>
                    <button onClick={() => handleEdit(row)}>Edit</button>
                    <button onClick={() => handleDelete(row)}>Delete</button>
                    <button onClick={() => handleViewDetails(row)}>View Details</button>
                </div>
            ),
        },
    ], []);
    

    const handleEdit = (row) => {
        // Implement the edit action
        console.log('Edit:', row.original._id);
    };
    
    const handleDelete = (row) => {
        // Implement the delete action
        console.log('Delete:', row.original);
    };
    
    const handleViewDetails = (row) => {
        // Implement the view details action
        console.log('View Details:', row.original);
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
    },useSortBy);
    
    return (
            <Table className='text-center my-16' variant='striped' colorScheme='teal' {...getTableProps()} >
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
                                        <Td className='py-4 border-4' {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
    );
    
};

export default ManageFood;

