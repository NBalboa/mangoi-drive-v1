import React from "react";
import Admin from "../../layouts/Admin";
import Content from "../../components/Content";
import Title from "../../components/Title";

function Dashboard({
    total_sales,
    total_online_orders,
    total_orders,
    total_users,
    month,
    year,
    week,
}) {
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
                                    P{total_sales}
                                </p>
                                <h3 className="text-black text-xl font-semibold break-all">
                                    Sales
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
                                    Orders
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
                                <p className="text-black text-3xl">{week}</p>
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
                                <p className="text-black text-3xl">{month}</p>
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
                                <p className="text-black text-3xl">{year}</p>
                                <h3 className="text-black text-xl font-semibold break-all">
                                    Year
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </Admin>
    );
}

export default Dashboard;
