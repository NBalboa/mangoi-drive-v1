import React from "react";

function OrderSearch({
    onHandleSearch,
    setStatus,
    status,
    setSearch,
    search,
    setOrderType,
    orderType,
}) {
    return (
        <div className="w-full text-center mx-auto mb-5">
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
                <select
                    value={status}
                    onChange={setStatus}
                    className="border-2 px-4 py-2 text-md rounded-lg uppercase"
                >
                    <option value="">Status</option>
                    <option value="1">Pending</option>
                    <option value="2">Confirm</option>
                    <option value="3">Ready</option>
                    <option value="4">To Deliver</option>
                    <option value="5">Delivered</option>
                </select>
                <select
                    value={orderType}
                    onChange={setOrderType}
                    className="border-2 px-4 py-2 text-md rounded-lg uppercase"
                >
                    <option value="">Order Type</option>
                    <option value="1">Dine-In</option>
                    <option value="2">Takeout</option>
                </select>
            </form>
        </div>
    );
}

export default OrderSearch;
