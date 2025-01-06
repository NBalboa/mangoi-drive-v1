import React from "react";

function SupplierSearch({ onHandleSearch, setSearch, search }) {
    return (
        <form
            className="flex gap-5 flex-col md:flex-row"
            onSubmit={onHandleSearch}
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
        </form>
    );
}

export default SupplierSearch;
