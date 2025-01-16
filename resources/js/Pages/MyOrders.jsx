import React, { useState } from "react";
import User from "../layouts/User";
import OrderSearch from "../components/OrderSearch";
import Table from "../components/Table";
import TableHeads from "../components/TableHeads";
import TableHead from "../components/TableHead";
import TableBody from "../components/TableBody";
import TableBodyRow from "../components/TableBodyRow";
import TableData from "../components/TableData";
import { getStringOrderStatus } from "../helpers/getStringOrderStatus";
import { Link, router } from "@inertiajs/react";
import Links from "../components/Links";

function MyOrders({ orders, filters }) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [status, setStatus] = useState(filters.status ?? "");
    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            search: search,
            status: status,
        };

        router.get("/my/orders", data, {
            preserveScroll: true,
        });
    }

    return (
        <User>
            <div className="space-y-5">
                <h2 className="max-w-2xl text-4xl font-bold my-2">My Orders</h2>
                <form
                    className="flex gap-5 flex-col md:flex-row"
                    onSubmit={handleSubmit}
                >
                    <div className="w-full relative shadow-sm rounded-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full ps-4 py-2 pe-[10%] border-2 border-yellow-300 rounded-full focus:outline-yellow-300"
                        />
                        <button
                            type="submit"
                            className="bg-yellow-300 text-white hover:opacity-90 absolute right-0 h-full  px-4 rounded-r-full text-xl"
                        >
                            <i className="fa-solid fa-magnifying-glass "></i>
                        </button>
                    </div>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border-2 px-4 py-2 text-md rounded-lg uppercase"
                    >
                        <option value="">Status</option>
                        <option value="1">PENDING</option>
                        <option value="2">Confirm</option>
                        <option value="3">Ready</option>
                        <option value="4">To Deliver</option>
                        <option value="5">Delivered</option>
                        <option value="6">Cancel</option>
                    </select>
                </form>
                <Table>
                    <TableHeads>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                            Estimated Time of Delivery (Minutes)
                        </TableHead>
                        <TableHead>Delivery Fee</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead></TableHead>
                    </TableHeads>
                    <TableBody>
                        {orders?.data.map((order) => (
                            <TableBodyRow key={order.id}>
                                <TableData>{order.id}</TableData>
                                <TableData uppercase={true}>
                                    {order.address.street},{" "}
                                    {order.address.barangay},{" "}
                                    {order.address.city},{" "}
                                    {order.address.province}
                                </TableData>
                                <TableData>
                                    {getStringOrderStatus(order.status)}
                                </TableData>
                                <TableData>{order.etd}</TableData>
                                <TableData>{order.delivery_fee}</TableData>
                                <TableData>{order.total}</TableData>
                                <TableData>
                                    <Link
                                        href={`/my/orders/${order.id}/items`}
                                        className="text-blue-600 hover:underline text-md uppercase"
                                    >
                                        Items
                                    </Link>
                                </TableData>
                            </TableBodyRow>
                        ))}
                    </TableBody>
                </Table>
                <Links
                    links={orders.links}
                    total={orders.total}
                    per_page={orders.per_page}
                />
            </div>
        </User>
    );
}

export default MyOrders;
