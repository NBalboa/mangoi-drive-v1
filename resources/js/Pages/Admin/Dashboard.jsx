import React from "react";
import Admin from "../../layouts/Admin";
import Content from "../../components/Content";
import Title from "../../components/Title";

function Dashboard({
    total_sales,
    total_online_orders,
    total_orders,
    total_users,
}) {
    return (
        <Admin>
            <Title>Dashboard</Title>
            <Content>
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
                            <p className="text-black text-3xl">{total_users}</p>
                            <h3 className="text-black text-xl font-semibold break-all">
                                Users
                            </h3>
                        </div>
                    </div>
                </div>
            </Content>
        </Admin>
    );
}

export default Dashboard;
