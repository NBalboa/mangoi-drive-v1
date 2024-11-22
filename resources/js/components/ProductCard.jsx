import React from "react";

function ProductCard() {
    return (
        <div className="space-y-2 hover:shadow-xl p-2 rounded-lg">
            <img src="" className="object-fit h-[200px] w-full rounded-md" />
            <div className="space-y-2 p-2">
                <div className="flex justify-between">
                    <h3 className="text-md text-gray-500 font-bold">
                        Product Name
                    </h3>
                    <p className="font-semibold text-sm self-center">P100.00</p>
                </div>
                <div className="bg-yellow-300 text-white font-semibold text-md rounded px-4 py-2 text-center">
                    Add Order
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
