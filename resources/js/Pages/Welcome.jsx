import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Chicken from "../../images/chicken.png";
import FoodCard from "../components/FoodCard";
import Footer from "../components/Footer";
import { useForm } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";

function Welcome({ categories, products }) {
    const { data, setData, get, processing } = useForm({
        filter: null,
        search: "",
    });

    useEffect(() => {
        if (!processing) {
            if (data.filter) {
                handleSearch();
            } else {
                handleSearch();
            }
        }
    }, [data.filter]);

    function handleSearch(e = null) {
        if (e) {
            e.preventDefault();
        }
        if (!processing) {
            get("/", {
                preserveScroll: true,
                preserveState: true,
            });
        }
    }

    function setActiveFilter(category) {
        if (data.filter) {
            if (category.id === data.filter.id) {
                return "bg-yellow-500 text-white";
            } else {
                return "text-yellow-500 w-full hover:bg-yellow-500 hover:text-white";
            }
        } else {
            return "text-yellow-500 w-full hover:bg-yellow-500 hover:text-white";
        }
    }

    return (
        <div>
            <NavBar />
            <div className="grid grid-cols-1 md:grid-cols-2 m-5 gap-5">
                <div className="place-self-center">
                    <p className="text-3xl md:text-6xl font-semibold mb-5 text-center md:text-start">
                        Feel the fresh breeze, enjoy delicious foods, and laugh
                        with your friends!
                    </p>
                    <div className="flex justify-center md:justify-start">
                        <button className="px-4 py-2 text-xl md:text-2xl rounded bg-yellow-600 text-white font-semibold hover:opacity-90">
                            Order Now
                        </button>
                    </div>
                </div>
                <div>
                    <div className="w-full">
                        <img src={Chicken} className="object-contain w-full" />
                    </div>
                </div>
            </div>
            <div className="mx-5">
                <h2 className="text-center text-5xl font-semibold text-yellow-500 mb-5">
                    Menu
                </h2>
                <div className="w-full md:w-1/2 text-center mx-auto mb-5">
                    <form
                        className="mx-auto relative shadow-sm rounded-full"
                        onSubmit={handleSearch}
                    >
                        <input
                            type="text"
                            value={data.search}
                            onChange={(e) => setData("search", e.target.value)}
                            className="w-full ps-4 py-2 pe-[10%] border-2 border-yellow-300 rounded-full focus:outline-yellow-300"
                        />
                        <button
                            type="submit"
                            className="bg-yellow-300 text-white hover:opacity-90 absolute right-0 h-full  px-4 rounded-r-full text-xl"
                        >
                            <i className="fa-solid fa-magnifying-glass "></i>
                        </button>
                    </form>
                </div>
                <div className="shadow-xl md:mx-[100px] border-y-2 border-gray-200 rounded mb-5">
                    <div className="flex flex-col md:flex-row justify-between rounded overflow-hidden">
                        <button
                            onClick={() => setData("filter", null)}
                            className={`${
                                !data.filter
                                    ? "bg-yellow-500 text-white"
                                    : "text-yellow-500 w-full hover:bg-yellow-500 hover:text-white"
                            } font-semibold  w-full text-center border-x-2 text-xl px-4 py-2`}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setData("filter", category)}
                                className={`${setActiveFilter(category)}
                                    font-semibold w-full text-center border-x-2 text-xl px-4 py-2`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {products.map((product) => (
                        <FoodCard
                            key={product.id}
                            product={product}
                            category={product.category}
                        />
                    ))}
                    {products.length === 0 ? (
                        <p className="text-center text-2xl mx-auto">
                            Not Found
                        </p>
                    ) : null}
                </div>
            </div>
            <div className="mt-5">
                <h2 className="text-yellow-300 font-bold text-5xl text-center pt-5 uppercase">
                    Location
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-5 p-5">
                    <div>
                        <h2 className="text-2xl uppercase font-semibold mb-2">
                            Contact
                        </h2>
                        <div className="border-y-2 border-yellow-200 py-5 flex justify-between">
                            <p className="text-xl">Phone</p>
                            <p className="text-xl">09123456789</p>
                        </div>
                        <div className="flex gap-2 justify-between mt-2">
                            <p className="text-xl">Address</p>
                            <p className="text-md text-end">
                                BITACURA'S FLOWERSHOP, GUITRAN, DUMINGAG,
                                ZAMBOANGA DEL SUR, HIGHWAY
                            </p>
                        </div>
                    </div>
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.425459008289!2d123.35849597051933!3d8.159817784047817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32546714ea57096f%3A0x70434846d7885a88!2sMango%20Drive!5e0!3m2!1sen!2sph!4v1730305612827!5m2!1sen!2sph"
                            style={{
                                width: "100%",
                                height: "100%",
                                border: "border:0",
                            }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Welcome;
