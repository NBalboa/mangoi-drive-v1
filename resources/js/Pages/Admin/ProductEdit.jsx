import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import Content from "../../components/Content";
import InputGroup from "../../components/InputGroup";
import { Link, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import Error from "../../components/Error";

function ProductEdit({ product, categories }) {
    const {
        data,
        setData,
        post,
        errors,
        processing,
        delete: destroy,
    } = useForm({
        name: product.name,
        price: product.price,
        category: product.category_id,
        image: null,
    });

    function handleDelete(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(`/products/${id}`);
            }
        });
    }

    function handleUpdate(e) {
        e.preventDefault();
        post(`/products/edit/${product.id}`, {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    text: "Product updated successfully",
                });
            },
            onError: () => {
                console.log(errors);
            },
        });
    }

    const [preview, setPreview] = useState(product.image);

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (file) {
            setData("image", file);

            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result);
            };

            reader.readAsDataURL(file);
            setData("image", file);
        } else {
            setData("image", null);
            setPreview("");
        }
    }

    return (
        <Admin>
            <h2 className="mb-2 font-bold text-2xl sm:text-3xl md:text-4xl">
                Edit {product.name}
            </h2>
            <Content>
                <form
                    className="border-2 boder-gray-200 max-w-lg mx-auto p-5 bg-gray-100 rounded"
                    onSubmit={handleUpdate}
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
                            name="name"
                            value={data.name}
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
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.price ? (
                            <>
                                <Error>{errors.price}</Error>
                            </>
                        ) : null}
                    </InputGroup>
                    <InputGroup>
                        <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={data.category}
                            onChange={(e) =>
                                setData("category", e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="">Choose Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category ? (
                            <>
                                <Error>{errors.category}</Error>
                            </>
                        ) : null}
                    </InputGroup>

                    <label
                        className="block mb-2 text-sm font-medium text-gray-900"
                        htmlFor="image"
                    ></label>
                    <input
                        className="block mb-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        id="image"
                        name="image"
                        type="file"
                        onChange={(e) => handleImageChange(e)}
                    />
                    {errors.image ? (
                        <>
                            <Error>{errors.image}</Error>
                        </>
                    ) : null}

                    {preview ? (
                        <>
                            <div className="mb-5 h-[100px] w-[100px] rounded-full">
                                <img
                                    src={preview}
                                    className="h-full w-full mt-2"
                                ></img>
                            </div>
                        </>
                    ) : null}
                    <div className=""></div>
                    {!processing ? (
                        <>
                            <button
                                type="submit"
                                className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Submit
                            </button>
                        </>
                    ) : null}
                </form>
                <div className="mt-5 pt-5">
                    <Link
                        href="/categories/create"
                        className="ms-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 d  focus:outline-none"
                    >
                        Create Category
                    </Link>
                    <button
                        onClick={() => handleDelete(product.id)}
                        className="ms-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   focus:outline-none"
                    >
                        Delete
                    </button>
                </div>
            </Content>
        </Admin>
    );
}

export default ProductEdit;
