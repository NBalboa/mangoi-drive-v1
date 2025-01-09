import React from "react";
import Admin from "../../layouts/Admin";
import Content from "../../components/Content";
import { useForm } from "@inertiajs/react";
import InputGroup from "../../components/InputGroup";
import Swal from "sweetalert2";
import Error from "../../components/Error";

function StocksAdd({ suppliers, products }) {
    const { data, setData, post, errors, processing, reset } = useForm({
        supplier: "",
        product: "",
        quantity: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        post("/stocks/create", {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    text: "Added Stocks Successfully",
                });
                reset();
            },
        });
    }
    return (
        <Admin>
            <h2 className="mb-2 font-bold text-2xl sm:text-3xl md:text-4xl">
                Add Stocks
            </h2>
            <Content>
                <form
                    onSubmit={handleSubmit}
                    className="border-2 boder-gray-200 max-w-lg mx-auto p-5 bg-gray-100 rounded"
                >
                    <label
                        htmlFor="product"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Products
                    </label>
                    <select
                        id="product"
                        name="product"
                        value={data.product}
                        onChange={(e) => setData("product", e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="">Choose Supplier</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                    {errors.product ? (
                        <>
                            <Error>{errors.product}</Error>
                        </>
                    ) : null}
                    <label
                        htmlFor="supplier"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Supplier
                    </label>
                    <select
                        id="supplier"
                        name="supplier"
                        value={data.supplier}
                        onChange={(e) => setData("supplier", e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="">Choose Supplier</option>
                        {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                    {errors.supplier ? (
                        <>
                            <Error>{errors.supplier}</Error>
                        </>
                    ) : null}
                    <InputGroup>
                        <label
                            htmlFor="quantity"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={data.quantity}
                            onChange={(e) =>
                                setData("quantity", e.target.value)
                            }
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.quantity ? (
                            <>
                                <Error>{errors.quantity}</Error>
                            </>
                        ) : null}
                    </InputGroup>
                    {!processing ? (
                        <>
                            <button
                                type="submit"
                                className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Add Product
                            </button>
                        </>
                    ) : null}
                </form>
            </Content>
        </Admin>
    );
}

export default StocksAdd;
