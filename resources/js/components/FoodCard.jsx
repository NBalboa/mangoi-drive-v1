import React from "react";
import Chicken from "../../images/chicken.png";

function FoodCard({ product }) {
    return (
        <div className="p-5 border-2 border-yellow-200 rounded-t shadow-lg">
            <div className="flex justify-center">
                <img
                    src={product.image}
                    className="object-contain w-[200px] h-[200px]"
                />
            </div>
            <div className="flex justify-between items-center my-3 py-4 gap-5">
                <h3 className="font-semibold text-md md:text-lg">
                    {product.name}
                </h3>
                <p className="font-bold text-sm md:text-xl">P{product.price}</p>
            </div>
            <div>
                <button className="bg-yellow-500 w-full px-4 py-2 text-white rounded">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default FoodCard;
