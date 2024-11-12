import React from "react";
import { Link } from "@inertiajs/react";

function FoodCard({ product, category }) {
    return (
        <div className="rounded-t hover:shadow-lg py-5">
            <div className="max-w-[200px] mx-auto">
                <div className="py-2 space-y-2">
                    <Link href={`/menus/${category.name}/${product.id}`}>
                        <div className="space-y-2">
                            <img
                                src={product.image}
                                className="object-fit w-full h-[200px]"
                            />
                            <h3 className="font-semibold text-md md:text-lg">
                                {product.name}
                            </h3>
                            <p className="font-semibold text-sm md:text-xl text-yellow-500">
                                P{product.price}
                            </p>
                        </div>
                    </Link>
                    <div className="px-2">
                        <button className="bg-yellow-500 w-full px-4 py-2 text-white rounded">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodCard;
