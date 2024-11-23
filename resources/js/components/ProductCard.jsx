import React from "react";

function ProductCard({ product, onClick }) {
    return (
        <div className="space-y-2 hover:shadow-xl p-2 rounded-lg border-2">
            <img
                src={product.image}
                className="object-fit w-full md:max-w-[200px] mx-auto h-[200px]  rounded-md"
            />
            <div className="space-y-2 p-2">
                <div className="flex justify-between">
                    <h3 className="text-md text-gray-500 font-bold">
                        {product.name}
                    </h3>
                    <p className="font-semibold text-sm self-center">
                        P{product.price}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => onClick(product)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-md rounded px-4 py-2 text-center"
                >
                    Add Order
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
