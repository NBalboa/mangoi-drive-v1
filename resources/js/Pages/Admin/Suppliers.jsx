import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import Content from "../../components/Content";
import Table from "../../components/Table";
import TableHeads from "../../components/TableHeads";
import TableHead from "../../components/TableHead";
import TableDataHead from "../../components/TableDataHead";
import TableData from "../../components/TableData";
import TableBodyRow from "../../components/TableBodyRow";
import { Link, router } from "@inertiajs/react";
import TableBody from "../../components/TableBody";
import SupplierSearch from "../../components/SupplierSearch";
import Links from "../../components/Links";

function Suppliers({ suppliers }) {
    const [search, setSearch] = useState("");

    function handleSearch(e) {
        e.preventDefault();
        const data = {
            search: search,
        };

        console.log("supplier ", data);

        router.get("/suppliers", data, {
            preserveScroll: true,
        });
    }
    return (
        <Admin>
            <h2 className="mb-2 font-bold text-2xl sm:text-3xl md:text-4xl">
                Suppliers
            </h2>
            <Content>
                <div className="mb-5">
                    <SupplierSearch
                        onHandleSearch={handleSearch}
                        setSearch={(e) => setSearch(e.target.value)}
                        search={search}
                    />
                </div>
                <Table>
                    <TableHeads>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead></TableHead>
                    </TableHeads>
                    <TableBody>
                        {suppliers.data.map((supplier) => (
                            <TableBodyRow key={supplier.id}>
                                <TableDataHead>{supplier.name}</TableDataHead>
                                <TableData>
                                    {supplier.address.street},{" "}
                                    {supplier.address.barangay},{" "}
                                    {supplier.address.city},{" "}
                                    {supplier.address.province}
                                </TableData>
                                <TableData>
                                    <Link
                                        href={`suppliers/edit/${supplier.id}`}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                </TableData>
                            </TableBodyRow>
                        ))}
                    </TableBody>
                </Table>
                <Links
                    links={suppliers.links}
                    total={suppliers.total}
                    per_page={suppliers.per_page}
                />
                <div className="mt-5">
                    <Link
                        href="/suppliers/create"
                        className="mt-2 float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Create Supplier
                    </Link>
                </div>
            </Content>
        </Admin>
    );
}

export default Suppliers;
