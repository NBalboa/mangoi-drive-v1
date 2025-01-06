import React from "react";
import Admin from "../../layouts/Admin";
import Table from "../../components/Table";
import TableHeads from "../../components/TableHeads";
import TableHead from "../../components/TableHead";
import TableBody from "../../components/TableBody";
import TableBodyRow from "../../components/TableBodyRow";
import TableData from "../../components/TableData";
import { Link } from "@inertiajs/react";

function Items({ order, items }) {
    console.log(order);
    console.log(items);
    return (
        <Admin>
            <h2 className="mb-5 font-bold text-2xl sm:text-3xl md:text-4xl">
                Order {order.id}
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
                    href={`/orders/receipt/${order.id}`}
                    className="px-4 py-2 text-md font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                    Receipt
                </Link>
            </div>
        </Admin>
    );
}

export default Items;
