import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link, router, usePage } from "@inertiajs/react";
import FormButton from "../components/FormButton";
import toast, { Toaster } from "react-hot-toast";
import Error from "../components/Error";
import Spinner from "../components/Spinner";

function ContactEdit() {
    const { auth, errors } = usePage().props;

    const [email, setEmail] = useState(auth.user.email);
    const [phone, setPhone] = useState(auth.user.phone);
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [loadingPhone, setLoadingPhone] = useState(false);

    function handleUpdateEmail(e) {
        e.preventDefault();
        setLoadingEmail(true);
        if (!loadingEmail) {
            router.put(
                `/email/${auth.user.id}`,
                { email: email },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.success("Email updated successfully");
                    },
                    onError: () => {
                        toast.error("Something went wrong");
                    },
                    onFinish: () => {
                        setLoadingEmail(false);
                    },
                }
            );
        }
    }

    function handleUpdatePhone(e) {
        e.preventDefault();
        setLoadingPhone(true);
        if (!loadingPhone) {
            router.put(
                `/phone/${auth.user.id}`,
                {
                    phone: phone,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.success("Phone updated successfully");
                    },
                    onError: () => {
                        toast.error("Something went wrong");
                    },
                    onFinish: () => {
                        setLoadingPhone(false);
                    },
                }
            );
        }
    }

    useEffect(() => {
        return () => toast.remove();
    }, []);

    return (
        <div>
            <Toaster position="top-right" />
            <div className="h-svh m-5">
                <Link
                    href="/account"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-800 text-white font-semibold text-md"
                >
                    Back
                </Link>
                <div className="mt-10 max-w-md mx-auto rounded-lg border-2 border-black space-y-3 p-5">
                    <div>
                        <h3 className="text-2xl font-semibold">Contact Edit</h3>
                    </div>
                    <form onSubmit={handleUpdateEmail} className="space-y-2">
                        <label className="text-md font-semibold">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 text-md w-full border-2 rounded-lg mt-2"
                        />
                        {errors.email ? <Error>{errors.email}</Error> : null}
                        {loadingEmail ? (
                            <Spinner />
                        ) : (
                            <FormButton>Save</FormButton>
                        )}
                    </form>
                    <form onSubmit={handleUpdatePhone} className="space-y-2">
                        <div>
                            <label className="text-md font-semibold">
                                Phone
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="px-4 py-2 text-md w-full border-2 rounded-lg mt-2"
                            />
                            {errors.phone ? (
                                <Error>{errors.phone}</Error>
                            ) : null}
                        </div>
                        {loadingPhone ? (
                            <Spinner />
                        ) : (
                            <FormButton>Save</FormButton>
                        )}
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ContactEdit;
