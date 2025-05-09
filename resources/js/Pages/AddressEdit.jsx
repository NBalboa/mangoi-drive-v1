import React, { useState } from "react";
import useAdrress from "../Hooks/useAdrress";
import { Link, useForm, usePage } from "@inertiajs/react";
import FormButton from "../components/FormButton";
import Spinner from "../components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Error from "../components/Error";

function AddressEdit({ address }) {
    const { data, setData, put, processing, errors } = useForm({
        name: address.name,
        street: address.street,
        province: address.province,
        city: address.city,
        barangay: address.barangay,
    });

    const { auth } = usePage().props;

    const {
        provinces,
        cities,
        barangays,
        getCitiesByProvince,
        getProvinceName,
        getBarangayByCities,
        getCityName,
        getBarangayName,
    } = useAdrress();

    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [barangay, setBarangay] = useState("");

    function handleProvinces(e) {
        setProvince(e.target.value);
        getCitiesByProvince(e.target.value);
        const province_name = getProvinceName(e.target.value);
        setData("province", province_name);
    }

    function handleCities(e) {
        setCity(e.target.value);
        getBarangayByCities(e.target.value);
        const city_name = getCityName(e.target.value);
        setData("city", city_name);
    }

    function handleBarangays(e) {
        setBarangay(e.target.value);
        const barangay_name = getBarangayName(e.target.value);
        setData("barangay", barangay_name);
    }
    function handleSubmit(e) {
        e.preventDefault();

        if (!processing) {
            put(`/address/${address.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Address updated successfully", {
                        position: "top-right",
                    });
                },
                onError: () => {
                    toast.error("Something went wrong", {
                        position: "top-right",
                    });
                },
            });
        }
    }
    return (
        <div>
            <Toaster />
            <div className="m-5 h-svh">
                <Link
                    href="/account"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-800 text-white font-semibold text-md"
                >
                    Back
                </Link>
                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-3 max-w-lg mx-auto border-2 border-black rounded-lg p-5 "
                >
                    <h2 className="text-2xl font-bold">Edit Address</h2>
                    <div>
                        <label className="text-md font-semibold">Name</label>
                        <input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="ex. Work"
                            type="text"
                            className="w-full text-md border-2 px-4 py-2 mt-2 rounded-lg"
                        />
                        {errors.name ? <Error>{errors.name}</Error> : null}
                    </div>
                    <div>
                        <label className="text-md font-semibold break-all">
                            Street/Purok/Block No./Lot No./House No.
                        </label>
                        <input
                            type="text"
                            value={data.street}
                            onChange={(e) => setData("street", e.target.value)}
                            className="w-full text-md border-2 px-4 py-2 mt-2 rounded-lg"
                        />
                        {errors.street ? <Error>{errors.street}</Error> : null}
                    </div>
                    <div>
                        <label className="text-md font-semibold">
                            Province
                        </label>
                        <select
                            value={province}
                            onChange={(e) => handleProvinces(e)}
                            className="w-full px-4 py-2 mt-2 rounded border-2 text-md"
                        >
                            <option value="">{address.province}</option>
                            {provinces.map((province) => (
                                <option
                                    key={province.psgcCode}
                                    value={province.psgcCode}
                                >
                                    {province.name}
                                </option>
                            ))}
                        </select>
                        {errors.province ? (
                            <Error>{errors.province}</Error>
                        ) : null}
                    </div>
                    <div>
                        <label className="text-md font-semibold">City</label>
                        <select
                            value={city}
                            onChange={(e) => handleCities(e)}
                            className="w-full px-4 py-2 mt-2 rounded border-2 text-md"
                        >
                            <option value="">
                                {province ? "Choose City" : address.city}
                            </option>
                            {cities.map((city) => (
                                <option
                                    key={city.psgcCode}
                                    value={city.psgcCode}
                                >
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        {errors.city ? <Error>{errors.city}</Error> : null}
                    </div>
                    <div>
                        <label className="text-md font-semibold">
                            Barangay
                        </label>
                        <select
                            value={barangay}
                            onChange={(e) => handleBarangays(e)}
                            className="w-full px-4 py-2 mt-2 rounded border-2 text-md"
                        >
                            <option value="">
                                {barangay
                                    ? "Choose Barangay"
                                    : address.barangay}
                            </option>
                            {barangays.map((barangay) => (
                                <option
                                    key={barangay.psgcCode}
                                    value={barangay.psgcCode}
                                >
                                    {barangay.name}
                                </option>
                            ))}
                        </select>
                        {errors.barangay ? (
                            <Error>{errors.barangay}</Error>
                        ) : null}
                    </div>
                    <div>
                        {processing ? (
                            <Spinner />
                        ) : (
                            <FormButton>Save</FormButton>
                        )}
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AddressEdit;
