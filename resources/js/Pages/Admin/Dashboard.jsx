import React, { useCallback, useEffect, useState } from "react";
import Admin from "../../layouts/Admin";
import Content from "../../components/Content";
import Title from "../../components/Title";
import Table from "../../components/Table";
import TableHeads from "../../components/TableHeads";
import TableHead from "../../components/TableHead";
import TableBody from "../../components/TableBody";
import TableBodyRow from "../../components/TableBodyRow";
import TableData from "../../components/TableData";
import { router } from "@inertiajs/react";
import { numberWithCommas } from "../../helpers/numberWithCommas";

function Dashboard({
    total_sales,
    total_online_orders,
    total_orders,
    total_users,
    month,
    year,
    week,
    daily_sales,
    sales_per_product,
    filters_spp,
}) {
    const [date, setDate] = useState(filters_spp.date);
    const [orderType, setOrderType] = useState(filters_spp.order_type);

    useEffect(() => {
        if (filters_spp.date === date && filters_spp.order_type === orderType) {
            return;
        }

        const data = {
            date: date,
            order_type: orderType,
        };

        router.get("/dashboard", data, {
            preserveScroll: true,
        });
    }, [date, orderType]);

    return (
        <Admin>
            <Content>
                <div className="space-y-2">
                    <Title>Dashboard</Title>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                        <div className="bg-gray-300 p-5 rounded grid grid-cols-1 gap-5">
                            <div className="text-5xl text-black transition hover:scale-125 place-self-end">
                                <i className="fa-solid fa-cart-shopping"></i>
                            </div>
                            <div>
                                <p className="text-black text-3xl">
                                    ₱{numberWithCommas(total_sales)}
                                    <div className="">
                                        <p className="text-sm">
                                            Walk-in:{" "}
                                            <span className="font-bold">
                                                ₱
                                                {numberWithCommas(
                                                    daily_sales.walk_in
                                                )}
                                            </span>
                                        </p>
                                        <p className="text-sm">
                                            Online:{" "}
                                            <span className="font-bold">
                                                ₱
                                                {numberWithCommas(
                                                    daily_sales.online
                                                )}
                                            </span>
                                        </p>
                                    </div>
                                </p>
                                <h3 className="text-black text-xl font-semibold break-all">
                                    Daily Sales
                                </h3>
                            </div>
                        </div>
                        <div className="bg-gray-300 p-5 rounded grid grid-cols-1 gap-5">
                            <div className="text-5xl text-black transition hover:scale-125 place-self-end">
                                <i className="fa-solid fa-users-line"></i>
                            </div>
                            <div>
                                <p className="text-black text-3xl">
                                    {total_orders}
                                </p>
                                <h3 className="text-black text-xl font-semibold break-all">
                                    Walk-in Orders
                                </h3>
                            </div>
                        </div>
                        <div className="bg-gray-300 p-5 rounded grid grid-cols-1 gap-5">
                            <div className="text-5xl text-black transition hover:scale-125 place-self-end">
                                <i className="fa-solid fa-person-walking"></i>
                            </div>
                            <div>
                                <p className="text-black text-3xl">
                                    {total_online_orders}
                                </p>
                                <h3 className="text-black text-xl font-semibold break-all">
                                    Online Orders
                                </h3>
                            </div>
                        </div>
                        <div className="bg-gray-300 p-5 rounded grid grid-cols-1 gap-5">
                            <div className="text-5xl text-black transition hover:scale-125 place-self-end">
                                <i className="fa-solid fa-person-shelter"></i>
                            </div>
                            <div>
                                <p className="text-black text-3xl">
                                    {total_users}
                                </p>
                                <h3 className="text-black text-xl font-semibold break-all">
                                    Users
                                </h3>
                            </div>
                        </div>
                    </div>
                    <h2 className="mb-2 font-bold text-2xl sm:text-3xl md:text-4xl">
                        Sales
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:place-content-center gap-5">
                        <div className="bg-gray-300 p-5 rounded grid grid-cols-1 gap-5">
                            <div className="text-5xl text-black transition hover:scale-125 place-self-end">
                                <i className="fa-solid fa-users-line"></i>
                            </div>
                            <div>
                                <p className="text-black text-3xl">
                                    ₱{numberWithCommas(week)}
                                </p>
                                <h3 className="text-black text-xl font-semibold break-all">
                                    Week
                                </h3>
                            </div>
                        </div>
                        <div className="bg-gray-300 p-5 rounded grid grid-cols-1 gap-5">
                            <div className="text-5xl text-black transition hover:scale-125 place-self-end">
                                <i className="fa-solid fa-person-walking"></i>
                            </div>
                            <div>
                                <p className="text-black text-3xl">
                                    ₱{numberWithCommas(month)}
                                </p>
                                <h3 className="text-black text-xl font-semibold break-all">
                                    Month
                                </h3>
                            </div>
                        </div>
                        <div className="bg-gray-300 p-5 rounded grid grid-cols-1 gap-5">
                            <div className="text-5xl text-black transition hover:scale-125 place-self-end">
                                <i className="fa-solid fa-person-shelter"></i>
                            </div>
                            <div>
                                <p className="text-black text-3xl">
                                    ₱{numberWithCommas(year)}
                                </p>
                                <h3 className="text-black text-xl font-semibold break-all">
                                    Year
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <Title>Sales No. Per Product</Title>
                        <div className="flex items-center gap-5">
                            <div className="flex gap-5 items-center">
                                <label>Date</label>
                                <select
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="px-4 py-2 max-w-xs border-2 rounded-lg"
                                >
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                    <option value="year">This Year</option>
                                </select>
                            </div>
                            <div className="flex gap-5 items-center">
                                <label>Order Type</label>
                                <select
                                    value={orderType}
                                    onChange={(e) =>
                                        setOrderType(e.target.value)
                                    }
                                    className="px-4 py-2 max-w-xs border-2 rounded-lg"
                                >
                                    <option value="all">All</option>
                                    <option value="walk-in">Walk-in</option>
                                    <option value="online">Online</option>
                                </select>
                            </div>
                        </div>
                        <Table>
                            <TableHeads>
                                <TableHead>Rank</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>No. of Sales</TableHead>
                                <TableHead>Total Amount of Sales (₱)</TableHead>
                            </TableHeads>
                            <TableBody>
                                {sales_per_product.map((sales, index) => (
                                    <TableBodyRow key={sales.product_id}>
                                        <TableData>{index + 1}</TableData>
                                        <TableData>
                                            {sales.product.name}
                                        </TableData>
                                        <TableData>
                                            {sales.total_sales}
                                        </TableData>
                                        <TableData>
                                            ₱
                                            {numberWithCommas(
                                                sales.total_amount
                                            )}
                                        </TableData>
                                    </TableBodyRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </Content>
        </Admin>
    );
}

export default Dashboard;
