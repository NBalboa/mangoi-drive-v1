import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import { Link, useForm } from "@inertiajs/react";
import Content from "../../components/Content";
import InputGroup from "../../components/InputGroup";
import Swal from "sweetalert2";
import Error from "../../components/Error";
import useAdrress from "../../Hooks/UseAdrress";

function SupplierCreate() {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
        province: "",
        city: "",
        barangay: "",
        street: "",
    });
    const {
        provinces,
        cities,
        barangays,
        getCitiesByProvince,
        getBarangayByCities,
    } = useAdrress();

    function handleProvince(e) {
        const province = provinces.find((province) => {
            if (province.psgcCode === e.target.value) {
                return province;
            }
        });

        setData("province", province.name);
        getCitiesByProvince(province.psgcCode);
    }

    function handleCity(e) {
        const city = cities.find((city) => {
            if (city.psgcCode === e.target.value) {
                return city;
            }
        });

        setData("city", city.name);
        getBarangayByCities(city.psgcCode);
    }

    function handleBarangay(e) {
        const barangay = barangays.find((barangay) => {
            if (barangay.psgcCode === e.target.value) {
                return barangay;
            }
        });
        setData("barangay", barangay.name);
    }

    function handleSubmit(e) {
        e.preventDefault();
        post("/suppliers/create", {
            onSuccess: () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    text: "Supplier created successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset();
            },
        });
    }
    return (
        <Admin>
            <Link
                href="/products/create"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Back
            </Link>
            <h2 className="mb-2 mt-4 font-bold text-2xl sm:text-3xl md:text-4xl">
                Create Supplier
            </h2>
            <Content>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="border-2 boder-gray-200 max-w-lg mx-auto p-5 bg-gray-100 rounded"
                >
                    <InputGroup>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            name="name"
                            onChange={(e) => setData("name", e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.name ? (
                            <>
                                <Error>{errors.name}</Error>
                            </>
                        ) : null}
                    </InputGroup>
                    <InputGroup>
                        <label
                            htmlFor="street"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Street/Purok/Block/Lot/House No.
                        </label>
                        <input
                            type="text"
                            id="street"
                            value={data.street}
                            name="street"
                            onChange={(e) => setData("street", e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.street ? (
                            <>
                                <Error>{errors.street}</Error>
                            </>
                        ) : null}
                    </InputGroup>
                    <InputGroup>
                        <label
                            htmlFor="province"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Province
                        </label>
                        <select
                            id="province"
                            name="province"
                            onChange={(e) => handleProvince(e)}
                            value={data.province}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="">
                                {data.province
                                    ? data.province
                                    : "Choose Province"}
                            </option>
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
                            <>
                                <Error>{errors.province}</Error>
                            </>
                        ) : null}
                    </InputGroup>
                    <InputGroup>
                        <label
                            htmlFor="cities"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            City
                        </label>
                        <select
                            id="cities"
                            name="cities"
                            value={data.city}
                            onChange={(e) => handleCity(e)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="">
                                {data.city ? data.city : "Choose City"}
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
                        {errors.city ? (
                            <>
                                <Error>{errors.city}</Error>
                            </>
                        ) : null}
                    </InputGroup>
                    <InputGroup>
                        <label
                            htmlFor="barangays"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Barangay
                        </label>
                        <select
                            id="barangays"
                            name="barangays"
                            value={data.barangay}
                            onChange={(e) => handleBarangay(e)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="">
                                {data.barangay
                                    ? data.barangay
                                    : "Choose Barangay"}
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
                            <>
                                <Error>{errors.barangay}</Error>
                            </>
                        ) : null}
                    </InputGroup>
                    {!processing ? (
                        <>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Add Supplier
                            </button>
                        </>
                    ) : null}
                </form>
            </Content>
        </Admin>
    );
}

export default SupplierCreate;
