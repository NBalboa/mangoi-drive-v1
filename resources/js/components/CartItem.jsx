import React, { useState } from "react";
import { router } from "@inertiajs/react";

function CartItem({ cart }) {
    const [loading, setLoading] = useState(false);
    function handleAdd() {
        setLoading(true);
        if (!loading) {
            router.put(
                `/cart/add/${cart.id}`,
                {},
                {
                    preserveScroll: true,
                    onFinish: () => {
                        setLoading(false);
                    },
                }
            );
        }
    }

    function handleDelete() {
        router.delete(`/cart/${cart.id}`, {
            preserveScroll: true,
            preserveState: false,
        });
    }

    function handleSubract() {
        setLoading(true);
        if (!loading) {
            if (cart.quantity >= 2) {
                router.put(
                    `/cart/subtract/${cart.id}`,
                    {},
                    {
                        preserveScroll: true,
                        onFinish: () => {
                            setLoading(false);
                        },
                    }
                );
            } else {
                handleDelete();
            }
        }
    }
    return (
        <div className="grid grid-col-1 md:grid-cols-3 p-5 border-b-2 border-black">
            <div className="md:col-span-2">
                <div className="flex flex-col justify-between max-w-lg mx-auto">
                    <div className="space-y-3">
                        <h2 className="text-black font-bold text-2xl">
                            {cart.product.name}
                        </h2>
                        <p className="text-lg text-xl font-semibold">
                            P{cart.product.price}
                        </p>
                        <div className="space-y-2">
                            <h3 className="text-lg">Total</h3>
                            <p className="text-2xl text-xl font-semibold">
                                P{cart.total}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <button
                            onClick={() => handleSubract()}
                            className="py-1 px-2 bg-gray-100 font-bold text-sm border-2 hover:opacity-80 rounded-lg"
                        >
                            <i className="fa-solid fa-minus"></i>
                        </button>
                        <input
                            type="number"
                            value={cart.quantity}
                            disabled={true}
                            className="text-center w-12 mx-2 border-2 py-1 rounded-lg appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <button
                            onClick={() => handleAdd()}
                            className="py-1 px-2 bg-gray-100 font-bold text-sm border-2 hover:opacity-80 rounded-lg"
                        >
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="md:cols-span-1 place-self-center my-5">
                <img
                    src={cart.product.image}
                    className="object-fit h-[150px]"
                />
            </div>
        </div>
    );
}

export default CartItem;
