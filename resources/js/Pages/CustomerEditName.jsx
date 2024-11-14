import React, { useEffect } from "react";
import Footer from "../components/Footer";
import FormButton from "../components/FormButton";
import { Link, useForm, usePage } from "@inertiajs/react";
import Spinner from "../components/Spinner";
import toast, { Toaster } from "react-hot-toast";

function CustomerEditName() {
    const { auth } = usePage().props;
    const user = auth.user;

    const { data, setData, put, errors, processing } = useForm({
        first_name: user.first_name,
        middle_name: user.middle_name ?? "",
        last_name: user.last_name,
    });

    function handleUpdateName(e) {
        e.preventDefault();
        if (!processing) {
            put(`/name/${user.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Name updated successfully");
                },
                onError: () => {
                    toast.error("Something went wrong");
                },
            });
        }
    }

    useEffect(() => {
        return () => toast.remove();
    }, []);

    return (
        <div>
            <Toaster position="top-right" />
            <div className="m-5 h-svh">
                <Link
                    href="/account"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-800 text-white font-semibold text-md"
                >
                    Back
                </Link>
                <form
                    onSubmit={handleUpdateName}
                    className="mt-16 max-w-md mx-auto space-y-3 border-2 border-black rounded-lg p-5"
                >
                    <h2 className="font-semibold text-2xl">Edit Name</h2>
                    <div>
                        <label className="text-md font-semibold">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={data.first_name}
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                            className="text-md mt-2 w-full px-4 py-2 text-md rounded-lg border-2"
                        />
                    </div>
                    <div>
                        <label className="text-md font-semibold">
                            Middle Name
                        </label>
                        <input
                            value={data.middle_name}
                            onChange={(e) =>
                                setData("middle_name", e.target.value)
                            }
                            type="text"
                            className="text-md mt-2 w-full px-4 py-2 text-md rounded-lg border-2"
                        />
                    </div>
                    <div>
                        <label className="text-md font-semibold">
                            Last Name
                        </label>
                        <input
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                            value={data.last_name}
                            type="text"
                            className="text-md mt-2 w-full px-4 py-2 text-md rounded-lg border-2"
                        />
                    </div>
                    {processing ? <Spinner /> : <FormButton>Save</FormButton>}
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default CustomerEditName;
