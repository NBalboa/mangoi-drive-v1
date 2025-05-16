import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import Content from "../../components/Content";
import Table from "../../components/Table";
import TableHead from "../../components/TableHead";
import TableHeads from "../../components/TableHeads";
import TableBody from "../../components/TableBody";
import TableBodyRow from "../../components/TableBodyRow";
import TableData from "../../components/TableData";
import { Head, Link, router } from "@inertiajs/react";
import { getStringOrderType } from "../../helpers/getStringOrderType";
import { getStringPaymentType } from "../../helpers/getStringPaymentType";
import toast from "react-hot-toast";
import OrderSearch from "../../components/OrderSearch";
import Links from "../../components/Links";
import ProductSearch from "../../components/ProductSearch";
import { numberWithCommas } from "../../helpers/numberWithCommas";

function Orders({ orders, filters }) {
    const [status, setStatus] = useState(filters.status ?? "");
    const [search, setSearch] = useState(filters.search ?? "");
    const [orderType, setOrderType] = useState(filters.order_type ?? "");
    function handleChangeStatus(status, order) {
        const data = {
            status: status,
        };

        router.put(`/orders/status/${order}`, data, {
            onSuccess: () => {
                toast.success("Order Status updated successfully");
            },
            onError: () => {
                toast.error("Something went wrong");
            },
            preserveState: false,
            preserveScroll: true,
        });
    }

    function handleSearch(e) {
        e.preventDefault();
        const data = {
            status: status,
            search: search,
            order_type: orderType,
        };

        console.log("data,", data);

        router.get("/orders", data, {
            preserveScroll: true,
        });
    }
    return (
        <Admin>
            <Head title="Order" />

            <h2 className="mb-2 font-bold text-2xl sm:text-3xl md:text-4xl">
                Orders
            </h2>
            <Content>
                <OrderSearch
                    onHandleSearch={handleSearch}
                    status={status}
                    setStatus={(e) => setStatus(e.target.value)}
                    setSearch={(e) => setSearch(e.target.value)}
                    search={search}
                    setOrderType={(e) => setOrderType(e.target.value)}
                    orderType={orderType}
                />
                <Table>
                    <TableHeads>
                        <TableHead>Order ID</TableHead>
                        {/* <TableHead>Status</TableHead> */}
                        <TableHead>Order Type</TableHead>
                        <TableHead>Payment Type</TableHead>
                        <TableHead>Grand Total (₱)</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead></TableHead>
                    </TableHeads>
                    <TableBody>
                        {orders?.data.map((order) => (
                            <TableBodyRow key={order.id}>
                                <TableData>{order.id}</TableData>
                                {/* <TableData>
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            handleChangeStatus(
                                                e.target.value,
                                                order.id
                                            )
                                        }
                                        className="px-4 py-2 max-w-xs border-2 rounded-lg"
                                    >
                                        <option value="0">PENDING</option>
                                        <option value="1">CANCEL</option>
                                        <option value="2">CONFIRMED</option>
                                        <option value="3">READY</option>
                                        <option value="4">TO DELIVER</option>
                                        <option value="5">DELIVERED</option>
                                    </select>
                                </TableData> */}
                                <TableData>
                                    {getStringOrderType(order.order_type)}
                                </TableData>
                                <TableData>
                                    {getStringPaymentType(order.payment_type)}
                                </TableData>
                                <TableData>
                                    ₱{numberWithCommas(order.total)}
                                </TableData>
                                <TableData>{order.formatted_date}</TableData>
                                <TableData>
                                    <Link
                                        href={`/items/${order.id}`}
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
                    per_page={orders.per_page}
                    total={orders.total}
                />
                <div className="mt-5">
                    <Link
                        href="/orders/create"
                        className="text-white float-right text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-800"
                    >
                        Create
                    </Link>
                </div>
            </Content>
        </Admin>
    );
}

export default Orders;
