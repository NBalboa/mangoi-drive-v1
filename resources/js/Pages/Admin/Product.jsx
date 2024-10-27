import React from "react";
import Admin from "../../layouts/Admin";
import Table from "../../components/Table";
import Content from "../../components/Content";
import TableHeads from "../../components/TableHeads";
import TableHead from "../../components/TableHead";
import TableBody from "../../components/TableBody";
import TableBodyRow from "../../components/TableBodyRow";
import TableDataHead from "../../components/TableDataHead";
import TableData from "../../components/TableData";
import { Link, router } from "@inertiajs/react";
import Links from "../../components/Links";

function Product({ products, IS_AVAILABLE }) {
    console.log(products);
    function handleAvailable(product) {
        const is_available =
            product.is_available === IS_AVAILABLE.YES
                ? IS_AVAILABLE.NO
                : IS_AVAILABLE.YES;

        router.put(
            `/products/available/${product.id}`,
            {
                is_available: is_available,
            },
            {
                preserveScroll: true,
            }
        );
    }

    return (
        <Admin>
            <h2 className="mb-2 font-bold text-2xl sm:text-3xl md:text-4xl">
                Products
            </h2>
            <Content>
                <Table>
                    <TableHeads>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead></TableHead>
                    </TableHeads>
                    <TableBody>
                        {products.data.map((product) => (
                            <TableBodyRow key={product.id}>
                                <TableData>
                                    <img
                                        src={product.image}
                                        className="h-[50px] w-[50px]"
                                    />
                                </TableData>
                                <TableDataHead>{product.name}</TableDataHead>
                                <TableData>{product.category.name}</TableData>
                                <TableData>{product.price}</TableData>
                                <TableData>
                                    {product.quantity
                                        ? product.quantity
                                        : "N/A"}
                                </TableData>
                                <TableData>
                                    <>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                id={product.id}
                                                defaultChecked={
                                                    product.is_available ===
                                                    IS_AVAILABLE.YES
                                                        ? true
                                                        : false
                                                }
                                                onClick={() =>
                                                    handleAvailable(product)
                                                }
                                                className="sr-only peer"
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </>
                                </TableData>
                                <TableData>
                                    <Link
                                        href={`products/edit/${product.id}`}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                </TableData>
                            </TableBodyRow>
                        ))}
                    </TableBody>
                </Table>
                {products.data.length > 0 ? (
                    <Links links={products.links} />
                ) : null}
                <div className="mt-5">
                    <Link
                        href="/products/create"
                        className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                    >
                        Create
                    </Link>

                    <Link
                        href="/stocks/create"
                        className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                    >
                        Add Stocks
                    </Link>
                </div>
            </Content>
        </Admin>
    );
}

export default Product;
