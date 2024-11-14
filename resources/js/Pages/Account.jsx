import React, { useState } from "react";
import User from "../layouts/User";
import { Link, router, usePage } from "@inertiajs/react";
import AccountCard from "../components/AccountCard";
import toast, { Toaster } from "react-hot-toast";

function Account({ addresses }) {
    const { auth } = usePage().props;
    const user = auth.user;

    function handleDeleteAddress(id) {
        router.delete(`/address/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Address deleted successfully", {
                    position: "top-right",
                });
            },
        });
    }
    return (
        <User>
            <div className="h-screen space-y-5">
                <div>
                    <div className="border-b-2 border-black pb-3">
                        <h2 className="max-w-3xl text-3xl font-bold">
                            Personal Information
                        </h2>
                    </div>
                    <p className="text-lg text-gray-500 font-semibold">
                        Manage your personal information
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                    <AccountCard title="Name" to="/name">
                        <p className="font-medium">
                            {user.first_name}{" "}
                            {user.middle_name ? user.middle_name : null}{" "}
                            {user.last_name}
                        </p>
                    </AccountCard>
                    <AccountCard title="Contact" to="/contact">
                        <p className="font-medium">{user.email}</p>
                        <p className="font-medium">{user.phone}</p>
                    </AccountCard>
                    <AccountCard
                        title="Addresses"
                        to={"/address"}
                        icon="fa-solid fa-square-plus"
                    >
                        {addresses.length > 0 ? (
                            <div className="space-y-3">
                                {addresses.map((address) => (
                                    <div key={address.id}>
                                        <h3 className="font-semibold text-lg uppercase flex justify-between mb-1">
                                            {address.name}
                                            <div>
                                                <Link
                                                    href={`/address/${user.id}/${address.id}`}
                                                    className="text-md text-blue-600 font-bold hover:text-blue-800"
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteAddress(
                                                            address.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800 text-md ms-2"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </h3>
                                        <div>
                                            <p className="text-md uppercase">
                                                {address.street},{" "}
                                                {address.barangay},{" "}
                                                {address.city},{" "}
                                                {address.province}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="font-medium">No Address Yet</div>
                        )}
                    </AccountCard>
                </div>
            </div>
        </User>
    );
}

export default Account;
