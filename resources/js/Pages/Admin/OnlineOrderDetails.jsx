import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import { router, usePage } from "@inertiajs/react";

const OnlineOrderDetails = ({ order }) => {
    const [etd, setEtd] = useState(order.etd ?? "");
    const [fee, setFee] = useState(order.delivery_fee ?? "");
    const { errors } = usePage().props;
    console.log(errors);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            etd: etd,
            fee: fee,
        };
        router.post(`/online/orders/details/${order.id}`, data, {
            preserveScroll: true,
        });
    };
    return (
        <Admin>
            <div>
                <h2 className="mb-2 font-bold text-2xl sm:text-3xl md:text-4xl">
                    Online Orders Details
                </h2>
                <div className="space-y-2 border border-black rounded-lg p-5 w-full md:w-96 mx-auto">
                    <p>Order ID: #{order.id}</p>
                    <p>
                        Customer: {order.user.first_name} {order.user.last_name}
                    </p>
                    <p>Phone: {order.user.phone}</p>
                    <p>Email: {order.user.email}</p>
                    <p>
                        Delivery Address: {order.address.street},{" "}
                        {order.address.barangay}, {order.address.city},{" "}
                        {order.address.province}
                    </p>
                    {order.gcash ? (
                        <div className="space-y-2">
                            <p className="text-md">GCASH Receipt</p>
                            <img src={order.gcash} className="rounded-lg" />
                        </div>
                    ) : null}
                    <div>
                        <form className="space-y-2" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-md font-medium">
                                    Estimated Time of Delivery (Minutes)
                                </label>
                                <input
                                    type="number"
                                    value={etd}
                                    onChange={(e) => setEtd(e.target.value)}
                                    className="border border-2 border-black rounded-lg w-full py-2 px-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-md font-medium">
                                    Delivery Fee
                                </label>
                                <input
                                    type="number"
                                    value={fee}
                                    onChange={(e) => setFee(e.target.value)}
                                    className="border border-2 border-black rounded-lg w-full py-2 px-4"
                                />
                            </div>
                            <input
                                type="submit"
                                className="w-full text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Admin>
    );
};

export default OnlineOrderDetails;
