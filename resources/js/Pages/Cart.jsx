import React from "react";
import User from "../layouts/User";
import CartItem from "../components/CartItem";
import PAYPAL from "../../images/paypal.webp";

function Cart({ carts, total }) {
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
                                        <h2 className="font-bold text-md">
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
                                            <p>P{cart.product.price}</p>
                                            <p>{cart.quantity}</p>
                                            <p className="font-semibold">
                                                P{cart.total}
                                            </p>
                                        </div>
                                    ))}
                                    <div className="flex justify-between my-2 py-2 border-t-2 border-b-2 border-black">
                                        <h2 className="font-semibold ms-5">
                                            Total
                                        </h2>
                                        <p className="font-bold text-lg me-5">
                                            {total}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="font-bold text-xl">
                                            Payment
                                        </h2>
                                        <button className="bg-black text-white text-center w-full py-2 px-4 font-semibold rounded hover:opacity-80">
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
