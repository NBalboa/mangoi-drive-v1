import React, { useEffect, useRef, useState } from "react";
import User from "../layouts/User";
import CartItem from "../components/CartItem";
import PAYPAL from "../../images/paypal.webp";
import { router, useForm, usePage } from "@inertiajs/react";
import Error from "../components/Error";
import PaypalPayment from "../components/PaypalPayment";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";
import FormLabel from "../components/FormLabel";

function Cart({ carts, total, addresses, payment_type }) {
    const { auth } = usePage().props;
    const testAddress = useRef(null);
    const [payment, setPayment] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [gcashImage, setGcashImage] = useState(null);

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
    const GCASHImageRef = useRef();
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
            { payment_type: payment, gcash_image: gcashImage },
            {
                onSuccess: () => {
                    toast.success("Payment success");
                },
                onError: (error) => {
                    if (error.is_validId) {
                        toast.error(error.is_validId);
                    }

                    if (error.gcash_error) {
                        toast.error(error.gcash_error);
                    }
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
            <User isHideFooter={true}>
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
                                            <option value="gcash">GCASH</option>
                                        </select>

                                        {payment === "gcash" ? (
                                            <div>
                                                <FormLabel>
                                                    GCASH Receipt
                                                </FormLabel>

                                                <input
                                                    className="block mb-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                                    aria-describedby="user_avatar_help"
                                                    id="image"
                                                    accept=".png, .jpg, .jpeg"
                                                    type="file"
                                                    ref={GCASHImageRef}
                                                    onChange={(e) => {
                                                        const file =
                                                            e.target.files[0];
                                                        if (file) {
                                                            setGcashImage(file);
                                                            const reader =
                                                                new FileReader();
                                                            reader.onloadend =
                                                                () => {
                                                                    setPreviewUrl(
                                                                        reader.result
                                                                    );
                                                                };

                                                            reader.readAsDataURL(
                                                                file
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {previewUrl ? (
                                            <>
                                                <div className="mb-5 h-[400px] w-[200px] rounded-xl mx-auto">
                                                    <img
                                                        src={previewUrl}
                                                        className="h-full w-full mt-2 rounded-lg"
                                                    ></img>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                    <div className="space-y-2">
                                        {payment ? (
                                            <h2 className="font-bold text-xl">
                                                Payment
                                            </h2>
                                        ) : null}

                                        {payment &&
                                        (payment === "cash" ||
                                            payment === "gcash") ? (
                                            <>
                                                <button
                                                    onClick={() => handleCOD()}
                                                    className="px-4 py-2 rounded-lg text-white bg-yellow-600 text-md text-semibold hover:opacity-80 w-full"
                                                >
                                                    Proceed
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
