import React, { useEffect, useRef, useState } from "react";
import User from "../layouts/User";
import CartItem from "../components/CartItem";
import PAYPAL from "../../images/paypal.webp";
import { router, useForm, usePage } from "@inertiajs/react";
import Error from "../components/Error";
import PaypalPayment from "../components/PaypalPayment";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";

function Cart({ carts, total, addresses, payment_type }) {
    const { auth } = usePage().props;
    const testAddress = useRef(null);
    const [payment, setPayment] = useState("");
    const initialOptions = {
        currency: "PHP",
        clientId:
            "AdRKyqWyNs1X4S2gKH8soI6PcFQPwZymqHCZZMSOPmbiadVkMDN8hmw_kgR40K31DHDA0ASBEpHwSft0",
        intent: "capture",
    };
    const styles = {
        shape: "rect",
        layout: "vertical",
    };

    const [disable, setDisable] = useState(true);

    const [user_address, setAddress] = useState(null);

    function handleAddress(e) {
        const selected_address = addresses.find((user_address) => {
            if (Number(e.target.value) == user_address.id) {
                return user_address;
            }
        });
        if (selected_address) {
            router.post(
                `/address/active/${auth.user.id}/${selected_address.id}`,
                {},
                {
                    preserveScroll: true,
                }
            );
            setAddress(selected_address);
            setDisable(false);
            testAddress.current = testAddress.id;
        } else {
            setDisable(true);
        }
    }

    const handleCOD = () => {
        router.post(
            `/online/orders/${auth.user.id}`,
            { is_cod: true },
            {
                onSuccess: () => {
                    toast.success("Payment success");
                },
            }
        );
    };

    const handleSuccessOrder = () => {
        router.post(`/online/orders/${auth.user.id}`, {
            onSuccess: () => {
                toast.success("Payment success");
            },
            onError: (error) => {
                console.error("Error posting Inertia route:", error);
            },
        });
    };

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total,
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => handleSuccessOrder());
    };

    const onError = (error) => {
        console.log("err", error);
        toast.error("somethibg went wrong");
    };

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
                                        {user_address ? (
                                            <div>
                                                <p className="text-md font-normal uppercase">
                                                    {user_address.street},{" "}
                                                    {user_address.barangay},{" "}
                                                    {user_address.city},{" "}
                                                    {user_address.province}
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-md uppercase">
                                                Select an Address
                                            </p>
                                        )}
                                        <select
                                            ref={testAddress}
                                            value={user_address?.id}
                                            onChange={(e) => handleAddress(e)}
                                            className="w-full px-4 py-2 border-2 text-md rounded-lg"
                                        >
                                            <option value="">
                                                Select Address
                                            </option>
                                            {addresses.map((user_address) => (
                                                <option
                                                    key={user_address.id}
                                                    value={user_address.id}
                                                >
                                                    {user_address.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="font-bold text-xl">
                                            Select Payment
                                        </h2>
                                        <select
                                            value={payment}
                                            onChange={(e) =>
                                                setPayment(e.target.value)
                                            }
                                            className="w-full px-4 py-2 border-2 text-md rounded-lg"
                                        >
                                            <option value="">
                                                Select Payment
                                            </option>
                                            <option value="cash">COD</option>
                                            <option value="paypal">
                                                PAYPAL
                                            </option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        {payment ? (
                                            <h2 className="font-bold text-xl">
                                                Payment
                                            </h2>
                                        ) : null}

                                        {payment && payment === "cash" ? (
                                            <>
                                                <button
                                                    onClick={() => handleCOD()}
                                                    className="px-4 py-2 rounded-lg text-white bg-yellow-600 text-md text-semibold hover:opacity-80 w-full"
                                                >
                                                    Cash On Delivery
                                                </button>
                                            </>
                                        ) : payment && payment === "paypal" ? (
                                            <PayPalScriptProvider
                                                options={initialOptions}
                                            >
                                                <PayPalButtons
                                                    disabled={disable}
                                                    style={styles}
                                                    createOrder={onCreateOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                    fundingSource="paypal"
                                                />
                                            </PayPalScriptProvider>
                                        ) : null}
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
