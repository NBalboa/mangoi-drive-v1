import React from "react";
import Admin from "../../layouts/Admin";
import Title from "../../components/Title";
import InputGroup from "../../components/InputGroup";
import { useForm } from "@inertiajs/react";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import toast, { Toaster } from "react-hot-toast";
import ConfirmToast from "../../components/ConfirmToast";

function CategoryEdit({ category }) {
    const {
        data,
        setData,
        put,
        delete: destroy,
        errors,
        processing,
    } = useForm({
        name: category.name,
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (!processing) {
            put(`/categories/edit/${category.id}`, {
                preserveScroll: true,
                onError: () => {
                    console.log("error");
                },
            });
        }
    }

    const handleDelete = () => {
        const id = toast.custom((t) => (
            <ConfirmToast
                message="Are you sure about that?"
                onCancel={() => toast.dismiss(id)}
                onConfirm={() => destroy(`/categories/${category.id}`)}
            />
        ));
    };

    return (
        <Admin>
            <Toaster position="top-center" />
            <Title>Edit Category</Title>
            <form
                onSubmit={handleSubmit}
                className="mt-4 border-2 boder-gray-200 max-w-lg mx-auto p-5 bg-gray-100 rounded"
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
                            Save
                        </button>
                    </>
                ) : (
                    <Spinner />
                )}
            </form>

            <div className="mt-5 pt-5">
                <button
                    onClick={handleDelete}
                    className="ms-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >
                    Delete
                </button>
            </div>
        </Admin>
    );
}

export default CategoryEdit;
