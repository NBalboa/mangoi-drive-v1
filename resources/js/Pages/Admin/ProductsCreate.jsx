import React, { useRef, useState } from "react";
import Admin from "../../layouts/Admin";
import Content from "../../components/Content";
import Error from "../../components/Error";
import InputGroup from "../../components/InputGroup";
import { Link, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

function ProductsCreate({ categories, suppliers }) {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
        price: "",
        category: "",
        sold_by_quantity: false,
        quantity: "",
        supplier: "",
        image: null,
    });

    const fileInputRef = useRef(null);

    const [preview, setPreviewUrl] = useState(null);
    function handleSubmit(e) {
        e.preventDefault();
        if (!data.sold_by_quantity) {
            setData("quantity", "");
            setData("supplier", "");
        }

        post("/products/create", {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    text: "Product created successfully",
                }).then(() => {
                    reset();
                    setPreviewUrl("");
                });
                fileInputRef.current.value = "";
            },
        });
    }

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (file) {
            setData("image", file);

            const reader = new FileReader();

            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            setData("image", null);
            setPreviewUrl("");
        }
    }

    return (
        <Admin>
            <h2 className="mb-2 font-bold text-2xl sm:text-3xl md:text-4xl">
                Create Product
            </h2>
            <Content>
                <form
                    className="border-2 boder-gray-200 max-w-lg mx-auto p-5 bg-gray-100 rounded"
                    onSubmit={(e) => handleSubmit(e)}
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
                    <InputGroup>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.sold_by_quantity}
                                onChange={(e) =>
                                    setData(
                                        "sold_by_quantity",
                                        e.target.checked
                                    )
                                }
                                name="sold_by_quantity"
                                id="sold_by_quantity"
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900">
                                By quantity?
                            </span>
                        </label>
                    </InputGroup>
                    <InputGroup>
                        {data.sold_by_quantity ? (
                            <>
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
                            </>
                        ) : null}
                    </InputGroup>

                    <InputGroup>
                        {data.sold_by_quantity ? (
                            <>
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
                                    onChange={(e) =>
                                        setData("supplier", e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option value="">Choose Supplier</option>
                                    {suppliers.map((supplier) => (
                                        <option
                                            key={supplier.id}
                                            value={supplier.id}
                                        >
                                            {supplier.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.supplier ? (
                                    <>
                                        <Error>{errors.supplier}</Error>
                                    </>
                                ) : null}
                            </>
                        ) : null}
                    </InputGroup>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900"
                        htmlFor="user_avatar"
                    ></label>
                    <input
                        className="block mb-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        aria-describedby="user_avatar_help"
                        id="image"
                        accept=".png, .jpg, .jpeg"
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setData("image", file);

                                const reader = new FileReader();

                                reader.onloadend = () => {
                                    setPreviewUrl(reader.result);
                                };

                                reader.readAsDataURL(file);
                            }
                        }}
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
                                Add Product
                            </button>
                        </>
                    ) : null}
                </form>
                <div className="mt-5 pt-5">
                    <Link
                        href="/categories/create"
                        className="ms-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Create Category
                    </Link>
                    <Link
                        href="/suppliers/create"
                        className="ms-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Create Supplier
                    </Link>
                </div>
            </Content>
        </Admin>
    );
}

export default ProductsCreate;
