import React from "react";
import User from "../layouts/User";
import Table from "../components/Table";
import TableHeads from "../components/TableHeads";
import TableBody from "../components/TableBody";
import TableBodyRow from "../components/TableBodyRow";
import TableHead from "../components/TableHead";
import { Link } from "@inertiajs/react";
import TableData from "../components/TableData";

function MyItems({ order, items }) {
    return (
        <User>
            <h2 className="mb-5 font-bold text-2xl sm:text-3xl md:text-4xl">
                Order ID: {order.id}
            </h2>
            <Table>
                <TableHeads>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                </TableHeads>
                <TableBody>
                    {items.map((item) => (
                        <TableBodyRow key={item.id}>
                            <TableData>
                                <img
                                    src={item.product.image}
                                    className="h-[50px] w-[50px]"
                                />
                            </TableData>
                            <TableData>{item.product.name}</TableData>
                            <TableData>{item.quantity}</TableData>
                            <TableData>{item.price}</TableData>
                            <TableData>{item.total}</TableData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-5 text-right">
                <Link
                    href={`/my/orders/${order.id}/receipt`}
                    className="px-4 py-2 text-md font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                    Receipt
                </Link>
            </div>
        </User>
    );
}

export default MyItems;
