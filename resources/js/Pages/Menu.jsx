import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useForm } from "@inertiajs/react";
import FoodCard from "../components/FoodCard";

function Menu({ categories, products }) {
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
            get("/menu", {
                preserveScroll: true,
                preserveState: true,
                replace: true,
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
            <main>
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
                                onChange={(e) =>
                                    setData("search", e.target.value)
                                }
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
                    <div className="shadow-xl md:mx-[100px] border-y-2 border-gray-200 rounded mb-5 rounded-lg">
                        <div className="flex flex-col md:flex-row justify-between rounded overflow-hidden rounded-lg">
                            <button
                                onClick={() => setData("filter", null)}
                                className={`${
                                    !data.filter
                                        ? "bg-yellow-500 text-white"
                                        : "text-yellow-500 w-full hover:bg-yellow-500 hover:text-white"
                                } font-semibold  w-full text-center border-x-2 text-xl px-4 py-2 rounded-lg`}
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
            </main>
            <Footer />
        </div>
    );
}

export default Menu;
