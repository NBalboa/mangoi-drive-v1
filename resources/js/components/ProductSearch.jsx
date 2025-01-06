import React from "react";

function ProductSearch({
    categories,
    category,
    setCategory,
    onHandleSubmit,
    search,
    setSearch,
    available,
    setAvailable,
}) {
    return (
        <div className="w-full text-center mx-auto mb-5">
            <form
                className="flex gap-5 flex-col md:flex-row"
                onSubmit={onHandleSubmit}
            >
                <div className="w-full relative shadow-sm rounded-full">
                    <input
                        value={search}
                        onChange={setSearch}
                        type="text"
                        className="w-full ps-4 py-2 pe-[10%] border-2 border-yellow-300 rounded-full focus:outline-yellow-300"
                    />
                    <button
                        type="submit"
                        className="bg-yellow-300 text-white hover:opacity-90 absolute right-0 h-full  px-4 rounded-r-full text-xl"
                    >
                        <i className="fa-solid fa-magnifying-glass "></i>
                    </button>
                </div>
                <select
                    value={category}
                    onChange={setCategory}
                    className="border-2 px-4 py-2 text-md rounded-lg uppercase"
                >
                    <option value="">Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <select
                    value={available}
                    onChange={setAvailable}
                    className="border-2 px-4 py-2 text-md rounded-lg uppercase"
                >
                    <option value="">Available</option>
                    <option value="2">Yes</option>
                    <option value="1">No</option>
                </select>
            </form>
        </div>
    );
}

export default ProductSearch;
