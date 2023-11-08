/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useLoaderData } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
//import Header from "../Header/Header";
import { useTable } from 'react-table'
import React from "react";

const FeaturedBlogs = () => {
    const featuredBlogs = useLoaderData();

    const data = React.useMemo(() =>
        featuredBlogs.map((blog, index) => ({
            serial: index + 1,
            ...blog
        }), [])
    );

    const columns = React.useMemo(() => [
        {
            Header: 'Serial No',
            accessor: 'serial',
            className: 'hidden',
        },
        {
            Header: 'Title',
            accessor: 'title',
            className: '-ml-12 md:w-1/3 lg:w-1/4',
        },
        {
            Header: 'Author',
            accessor: 'postAdminMail',
            className: 'md:w-1/4 lg:w-1/6',
        },
        {
            Header: 'Profile',
            accessor: 'authorImg',
            Cell: ({ cell: { value } }) => (
                <img src={value} alt="Author" style={{ width: '50px', height: '50px', borderRadius: '50%', }} />
            ),
            className: 'md:w-1/8 lg:w-1/12',
        }
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div>
            {/* <Header></Header> */}
            <div className="md:flex">
                <div className="lg:w-1/5 md:w-2/6">
                    <Navbar></Navbar>
                </div>
                <div className="p-2 gap-4 lg:w-4/6 mx-auto md:w-5/6">
                    <table {...getTableProps} className="table-fixed w-full">
                        <thead>
                            {
                                headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}  className="bg-gray-200">
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()} className="py-2">
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))
                            }
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}  className="hover:bg-gray-100">
                                        {row.cells.map(cell => (
                                             <td {...cell.getCellProps()} className=" lg:pl-16">{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FeaturedBlogs;
