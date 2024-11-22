import React from "react";
import Admin from "../../layouts/Admin";
import Title from "../../components/Title";
import Content from "../../components/Content";
import NFormLayout from "../../components/NFormLayout";
import SelectInput from "../../components/SelectInput";
import ProductCard from "../../components/ProductCard";

function OrdersCreate() {
    return (
        <Admin>
            <Title>Create Order</Title>
            <Content>
                <form className="space-y-2">
                    <div className="flex flex-col gap-2 max-w-xs">
                        <label className="text-md font-medium ">
                            Categories
                        </label>
                        <SelectInput>
                            <option>All Categories</option>
                        </SelectInput>
                    </div>
                    <div className="flex flex-col gap-2 max-w-xs">
                        <label className="text-md font-medium">
                            Search Product
                        </label>
                        <input
                            type="text"
                            className="px-2 py-2 rounded-lg border-2 text-md"
                        />
                    </div>
                </form>
                <div className="mt-5">
                    <h2 className="text-xl font-semibold">Product List</h2>
                    <div className="mt-2 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                        </div>
                    </div>
                </div>
            </Content>
        </Admin>
    );
}

export default OrdersCreate;
