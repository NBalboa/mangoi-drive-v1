import React from "react";
import Admin from "../../layouts/Admin";
import Content from "../../components/Content";
import InputGroup from "../../components/InputGroup";
import { Link, useForm } from "@inertiajs/react";
import Error from "../../components/Error";
import Swal from "sweetalert2";

function CategoryCategory() {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/categories/create", {
            onSuccess: () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    text: "Categories create successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setData("name", "");
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
                Create Category
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
                    {!processing ? (
                        <>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Add Category
                            </button>
                        </>
                    ) : null}
                </form>
            </Content>
        </Admin>
    );
}

export default CategoryCategory;
