import React, { useState } from "react";
import User from "../layouts/User";
import CartItem from "../components/CartItem";
import PAYPAL from "../../images/paypal.webp";
import { useForm, usePage } from "@inertiajs/react";
import Error from "../components/Error";

function Cart({ carts, total, addresses, payment_type }) {
    const { auth } = usePage().props;

    const { data, setData, post, errors, processing } = useForm({
        address: null,
        payment_type: payment_type.CASH,
    });

    const [address, setAddress] = useState(null);
    function handleAddress(e) {
        const selected_address = addresses.find((address) => {
            if (Number(e.target.value) == address.id) {
                return address;
            }
        });
        setAddress(selected_address);
        if (selected_address) {
            setData("address", selected_address.id);
        }
    }

    console.log(errors);

    function handleCashOrder() {
        setData("payment_type", payment_type.CASH);
        if (!processing) {
            post(`/orders/${auth.user.id}`);
        }
    }

    return (
        <div>
            <User>
                <div
                    className={`m-5 space-y-5 ${
                        carts.length === 1 ? "h-svh" : ""
                    }`}
                >
                    <h2 className="max-w-2xl mx-auto text-4xl font-bold my-2">
                        Food Cart
                    </h2>
                    {carts.length > 0 ? (
                        <div className="flex flex-col-reverse md:grid grid-cols-1 grid-cols-3 gap-2 ">
                            <div className="space-y-5 col-span-2  border-2 border-black rounded-lg">
                                {carts.map((cart) => (
                                    <CartItem key={cart.id} cart={cart} />
                                ))}
                            </div>
                            <div className="col-span-1">
                                <div className="border-2 border-black rounded-lg p-5">
                                    <div className="grid grid-cols-4 gap-2">
                                        <h2 className="font-bold text-md">
                                            Item
                                        </h2>
                                        <h2 className="font-bold text-md">
                                            Price
                                        </h2>
                                        <h2 className="font-bold text-md text-center">
                                            Quantity
                                        </h2>
                                        <h2 className="font-bold text-md">
                                            Total
                                        </h2>
                                    </div>
                                    {carts.map((cart) => (
                                        <div
                                            key={cart.id}
                                            className="grid grid-cols-4 gap-2"
                                        >
                                            <p>{cart.product.name}</p>
                                            <p>{cart.product.price}</p>
                                            <p className="text-center">
                                                {cart.quantity}
                                            </p>
                                            <p className="font-semibold">
                                                {parseFloat(cart.total).toFixed(
                                                    2
                                                )}
                                            </p>
                                        </div>
                                    ))}
                                    <div className="flex justify-between my-2 py-2 border-t-2 border-b-2 border-black">
                                        <h2 className="font-semibold ms-5">
                                            Total
                                        </h2>
                                        <p className="font-bold text-lg me-5">
                                            {parseFloat(total).toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="font-bold text-xl">
                                            Address
                                        </h2>
                                        {address ? (
                                            <div>
                                                <p className="text-md font-normal uppercase">
                                                    {address.street},{" "}
                                                    {address.barangay},{" "}
                                                    {address.city},{" "}
                                                    {address.province}
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-md uppercase">
                                                select an address to proceed
                                            </p>
                                        )}
                                        <select
                                            value={address?.id}
                                            onChange={(e) => handleAddress(e)}
                                            className="w-full px-4 py-2 border-2 text-md rounded-lg"
                                        >
                                            <option value="">
                                                Select Address
                                            </option>
                                            {addresses.map((address) => (
                                                <option
                                                    key={address.id}
                                                    value={address.id}
                                                >
                                                    {address.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.address ? (
                                            <Error>{errors.address}</Error>
                                        ) : null}
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="font-bold text-xl">
                                            Payment
                                        </h2>
                                        <button
                                            onClick={() => handleCashOrder()}
                                            className="bg-black text-white text-center w-full py-2 px-4 font-semibold rounded hover:opacity-80"
                                        >
                                            Cash
                                        </button>
                                        <button className="w-full px-4 py-2 bg-gray-300 border-2 rounded-lg hover:opacity-80">
                                            <img
                                                src={PAYPAL}
                                                className="object-contain w-full h-5"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-screen">
                            <h1 className="text-center">No cart Added</h1>
                        </div>
                    )}
                </div>
            </User>
        </div>
    );
}

export default Cart;
