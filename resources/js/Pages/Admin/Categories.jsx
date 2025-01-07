import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import Title from "../../components/Title";
import Content from "../../components/Content";
import Table from "../../components/Table";
import TableHeads from "../../components/TableHeads";
import TableHead from "../../components/TableHead";
import TableBody from "../../components/TableBody";
import TableBodyRow from "../../components/TableBodyRow";
import TableData from "../../components/TableData";
import { Link, router } from "@inertiajs/react";
import Search from "../../components/Search";
import Links from "../../components/Links";

function Categories({ categories }) {
    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            search: search,
        };

        router.get("/categories", data, {
            preserveScroll: true,
        });
    };
    return (
        <Admin>
            <Title>Categories</Title>
            <Content>
                <div className="mb-5">
                    <Search
                        onHandleSearch={handleSubmit}
                        search={search}
                        setSearch={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Table>
                    <TableHeads>
                        <TableHead>Name</TableHead>
                        <TableHead></TableHead>
                    </TableHeads>
                    <TableBody>
                        {categories?.data.map((category) => (
                            <TableBodyRow key={category.id}>
                                <TableData>{category.name}</TableData>
                                <TableData>
                                    <Link
                                        href={`/categories/edit/${category.id}`}
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
                    links={categories.links}
                    total={categories.total}
                    per_page={categories.per_page}
                />
                <div className="mt-5 pt-5 text-right">
                    <Link
                        href="/categories/create"
                        className="ms-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Create Category
                    </Link>
                </div>
            </Content>
        </Admin>
    );
}

export default Categories;
