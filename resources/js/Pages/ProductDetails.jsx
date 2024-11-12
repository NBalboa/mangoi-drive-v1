import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useForm } from "@inertiajs/react";
import FoodCard from "../components/FoodCard";

function ProductDetails({ products, product, category }) {
    const { data, setData, get, processing } = useForm({
        search: "",
    });
    const [quantity, setQuantity] = useState(1);

    function handleAddQuantity(quantity) {
        if (product.quantity) {
            if (quantity < product.quantity) {
                setQuantity(Number(quantity) + 1);
            }
        } else {
            setQuantity(Number(quantity) + 1);
        }
    }

    function handleSubtractQuantity(quantity) {
        if (quantity > 1) {
            setQuantity(Number(quantity) - 1);
        }
    }

    function handleSearch(e) {
        e.preventDefault();
    }

    return (
        <div>
            <NavBar />
            <main>
                <div className="m-5 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center md:items-start  border-2 p-5 gap-2 rounded-lg">
                        <div className="md:col-span-1 place-self-center">
                            <img
                                className="object-fit h-[330px]  w-full rounded-lg"
                                src={product.image}
                            />
                        </div>
                        <div className="space-y-2 col-span-1 md:col-span-2">
                            <div className="space-y-2 flex flex-col justify-between md:h-[330px]">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-4xl uppercase font-bold">
                                            {product.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-3xl text-yellow-600">
                                            P{product.price}
                                        </p>
                                    </div>
                                    {product.quantity ? (
                                        <div>
                                            <h2 className="text-xl font-semibold">
                                                Remaining
                                            </h2>
                                            <p className="text-xl">
                                                {product.quantity}
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <button
                                            onClick={() =>
                                                handleSubtractQuantity(quantity)
                                            }
                                            className="px-4 py-2 bg-gray-100 font-bold text-sm border-2 hover:opacity-80 rounded-lg"
                                        >
                                            <i className="fa-solid fa-minus"></i>
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => {
                                                if (product.quantity) {
                                                    if (
                                                        e.target.value <=
                                                        product.quantity
                                                    ) {
                                                        setQuantity(
                                                            e.target.value
                                                        );
                                                    }
                                                } else {
                                                    setQuantity(e.target.value);
                                                }
                                            }}
                                            className="text-center w-12 mx-2 py-2 border-2 rounded-lg appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        />
                                        <button
                                            onClick={() =>
                                                handleAddQuantity(quantity)
                                            }
                                            className="px-4 py-2 bg-gray-100 font-bold text-sm border-2 hover:opacity-80 rounded-lg"
                                        >
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                    <button className="px-4 py-2 rounded-lg text-white bg-yellow-600 text-md text-semibold hover:opacity-80 me-5">
                                        Buy Now
                                    </button>
                                    <button className="px-4 py-2 rounded-lg text-white bg-yellow-600 text-md text-semibold hover:opacity-80">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
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
                    </div>
                    <div>
                        <h2 className="text-center text-3xl font-semibold text-yellow-500 mb-5">
                            {category.name}
                        </h2>
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
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ProductDetails;
