import React, { useEffect } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";

function FoodCard({ product, category }) {
    const { auth } = usePage().props;

    function handleAddCart() {
        if (auth.user) {
            router.post(
                `/cart/${auth.user.id}/${product.id}`,
                {
                    quantity: 1,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.success("Item added to the cart successfully", {
                            position: "top-right",
                        });
                    },
                    onError: (err) => {
                        toast.error(err.cart, {
                            position: "top-right",
                        });
                    },
                }
            );
        } else {
            router.visit("/login");
        }
    }

    useEffect(() => {
        return () => toast.remove();
    }, []);

    return (
        <div className="rounded-t hover:shadow-lg py-5">
            <Toaster />
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
                        <button
                            onClick={() => handleAddCart()}
                            className="bg-yellow-500 w-full px-4 py-2 text-white rounded hover:opacity-80"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodCard;
