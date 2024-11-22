import React, { useEffect, useState } from "react";
import Admin from "../../layouts/Admin";
import Content from "../../components/Content";
import Table from "../../components/Table";
import TableHeads from "../../components/TableHeads";
import TableHead from "../../components/TableHead";
import TableBody from "../../components/TableBody";
import TableBodyRow from "../../components/TableBodyRow";
import TableData from "../../components/TableData";
import { Link, router, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import Links from "../../components/Links";

function Orders({ initialOrders, OrderStatus, filters }) {
    console.log(filters);
    function handleCheckOrder(id) {
        setOrders((prev) =>
            prev.map((order) => {
                if (order.id === id) {
                    return { ...order, checked: !order.checked };
                }
                return order;
            })
        );
    }
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [status, setStatus] = useState("");

    function handleCheckAllOrders() {
        setIsCheckedAll(!isCheckedAll);
        setOrders((prev) =>
            prev.map((order) => ({
                ...order,
                checked: !isCheckedAll,
            }))
        );
    }
    console.log(initialOrders);
    const [orders, setOrders] = useState(
        initialOrders.data.map((order) => {
            return { ...order, checked: false };
        })
    );

    function handleChangeStatus() {
        const ordersChecked = orders.filter((order) => order.checked === true);
        const ids = ordersChecked.map((order) => order.id);

        router.post(
            "/orders/changestatus",
            {
                status: status,
                orders: ids,
            },
            {
                preserveScroll: true,
                preserveState: false,
                onError: (errors) => {
                    if (errors?.status) {
                        toast.error("Please select status");
                    }
                    if (errors?.orders) {
                        toast.error("Please select an order");
                    }
                },

                onSuccess: () => {
                    toast.success("Order updated status successfully");
                },
            }
        );
    }

    useEffect(() => {
        const channel = window.Echo.channel("orders");

        channel.listen("OrderCreated", function (event) {
            toast.success("User has placed an order.");
            setOrders((prev) => [
                ...prev,
                {
                    ...event.order,
                    user: event.user,
                    address: event.address,
                    checked: false,
                },
            ]);
        });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    const [search, setSearch] = useState(filters.search);
    const [filterStatus, setFilterStatus] = useState(filters.status);

    function handleSearch(e) {
        e.preventDefault();
        router.get(
            "/orders",
            {
                search: search,
                filterStatus: filterStatus,
            },
            {
                preserveState: false,
                preserveScroll: true,
            }
        );
    }

    return (
        <Admin>
            <Toaster position="top-right" />
            <h2 className="mb-2 font-bold text-2xl sm:text-3xl md:text-4xl">
                Orders
            </h2>
            <Content>
                <div className="w-full text-center mx-auto mb-5">
                    <form className="flex gap-5" onSubmit={handleSearch}>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border-2 px-4 py-2 text-md rounded-lg uppercase"
                        >
                            <option value="">Status</option>
                            <option value={OrderStatus.PENDING + 1}>
                                PENDING
                            </option>
                            <option value={OrderStatus.CONFIRMED + 1}>
                                Confirm
                            </option>
                            <option value={OrderStatus.READY + 1}>Ready</option>
                            <option value={OrderStatus.TO_DELIVER + 1}>
                                To Deliver
                            </option>
                            <option value={OrderStatus.DELIVERED + 1}>
                                Delivered
                            </option>
                            <option value={OrderStatus.CANCELLED + 1}>
                                Cancel
                            </option>
                        </select>
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
                    </form>
                </div>
                <div className="flex flex-row gap-5 mb-2">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border-2 px-4 py-2 text-md rounded-lg uppercase"
                    >
                        <option value="">Change Status</option>
                        <option value={OrderStatus.PENDING}>PENDING</option>
                        <option value={OrderStatus.CONFIRMED}>Confirm</option>
                        <option value={OrderStatus.READY}>Ready</option>
                        <option value={OrderStatus.TO_DELIVER}>
                            To Deliver
                        </option>
                        <option value={OrderStatus.DELIVERED}>Delivered</option>
                        <option value={OrderStatus.CANCELLED}>Cancel</option>
                    </select>
                    <button
                        onClick={() => handleChangeStatus()}
                        className="font-semibold px-4 py-2 rounded-lg bg-yellow-300 text-white hover:bg-yellow-500"
                    >
                        Save Status
                    </button>
                </div>
                <Table>
                    <TableHeads>
                        <TableHead>
                            <input
                                type="checkbox"
                                checked={isCheckedAll}
                                onChange={() => handleCheckAllOrders()}
                            />
                        </TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Amount (P)</TableHead>
                        <TableHead></TableHead>
                    </TableHeads>
                    <TableBody>
                        {orders.map((order) => (
                            <TableBodyRow key={order.id}>
                                <TableData>
                                    <input
                                        type="checkbox"
                                        checked={order.checked}
                                        onChange={() =>
                                            handleCheckOrder(order.id)
                                        }
                                    />
                                </TableData>
                                <TableData>{order.id}</TableData>
                                <TableData>
                                    {order.user.first_name}{" "}
                                    {order.user.last_name}
                                </TableData>
                                <TableData>{order.user.phone}</TableData>
                                <TableData uppercase={true}>
                                    {order.address.street},{" "}
                                    {order.address.barangay},{" "}
                                    {order.address.city},{" "}
                                    {order.address.province}
                                </TableData>

                                <TableData>{order.status}</TableData>
                                <TableData>{order.payment_type}</TableData>
                                <TableData>{order.total}</TableData>
                                <TableData>
                                    <Link
                                        href={`/orders/${order.id}`}
                                        className="text-blue-600 hover:underline uppercase"
                                    >
                                        Items
                                    </Link>
                                </TableData>
                            </TableBodyRow>
                        ))}
                    </TableBody>
                </Table>
                {initialOrders.total > initialOrders.per_page ? (
                    <Links links={initialOrders.links} />
                ) : null}
            </Content>
        </Admin>
    );
}

export default Orders;
