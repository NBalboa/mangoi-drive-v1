import React, { useState } from "react";
import Admin from "../../layouts/Admin";
import Title from "../../components/Title";
import Content from "../../components/Content";
import SelectInput from "../../components/SelectInput";
import ProductCard from "../../components/ProductCard";
import { router } from "@inertiajs/react";
import Table from "../../components/Table";
import TableHeads from "../../components/TableHeads";
import TableHead from "../../components/TableHead";
import TableBodyRow from "../../components/TableBodyRow";
import TableBody from "../../components/TableBody";
import TableData from "../../components/TableData";
import toast, { Toaster } from "react-hot-toast";

function OrdersCreate({ categories, products, filters, order_type }) {
    const [search, setSearch] = useState(filters.search);
    const [category, setCategory] = useState(filters.category);
    const [orders, setOrders] = useState([]);
    const [amountRender, setAmountRender] = useState(0);
    const [orderType, setOrderType] = useState("");

    function handleSearch(e) {
        e.preventDefault();

        router.get(
            "/orders/create",
            { search: search, category: category },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    }

    function handleOrderChange(e, id) {
        const value = e.target.value;
        setOrders((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    if (item.quantity) {
                        if (value > 1 && value < item.quantity) {
                            return {
                                ...item,
                                order_quantity: value,
                            };
                        } else if (value === 0 || value === "") {
                            return {
                                ...item,
                                order_quantity: 1,
                            };
                        } else {
                            return {
                                ...item,
                                order_quantity: item.quantity,
                            };
                        }
                    }

                    if (!item.quantity) {
                        if (value > 1) {
                            return {
                                ...item,
                                order_quantity: value,
                            };
                        } else {
                            return {
                                ...item,
                                order_quantity: 1,
                            };
                        }
                    }
                    return {
                        ...item,
                        order_quantity: value,
                    };
                }
                return item;
            });
        });
    }

    function minusOrderQuantity(id) {
        setOrders((prev) => {
            return prev.map((item) => {
                if (item.id === id && item.order_quantity > 1) {
                    return {
                        ...item,
                        order_quantity: item.order_quantity - 1,
                    };
                } else {
                    return item;
                }
            });
        });
    }

    function addOrderQuantity(id) {
        setOrders((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    if (item.quantity) {
                        if (item.order_quantity < item.quantity) {
                            return {
                                ...item,
                                order_quantity: item.order_quantity + 1,
                            };
                        }
                    }
                    if (!item.quantity) {
                        return {
                            ...item,
                            order_quantity: item.order_quantity + 1,
                        };
                    }

                    return item;
                }

                return item;
            });
        });
    }
    function handleSubmit() {
        router.post(
            "/orders/create",
            {
                orders: orders,
                type: orderType,
                total: getAllTotal(orders),
                amount_render: amountRender,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onError: (err) => {
                    if (err.type) {
                        toast.error(err.type, {
                            duration: 3000,
                        });
                    }

                    if (err.amount_render) {
                        toast.error(err.amount_render, {
                            duration: 3000,
                        });
                    }
                },
            }
        );
    }
    function handleAddOrders(product) {
        const checked_product = {
            ...product,
            order_quantity: 1,
        };
        setOrders((prev) => {
            const exist = prev.find((prev) => {
                return prev.id === checked_product.id;
            });
            if (!exist) {
                return [...prev, checked_product];
            } else {
                return prev;
            }
        });
    }

    function handleDeleteOrders(id) {
        const newOrders = orders.filter((order) => order.id !== id);

        setOrders(newOrders);
    }

    function getAllTotal(orders) {
        let total = 0;
        for (const order of orders) {
            total += order.order_quantity * order.price;
        }
        return total;
    }

    function getChange() {
        const total = parseFloat(getAllTotal(orders)).toFixed(2);

        return parseFloat(amountRender - total).toFixed(2);
    }

    return (
        <Admin>
            <Toaster position="top-right" />
            <Title>Create Order</Title>
            <Content>
                <form className="space-y-2" onSubmit={handleSearch}>
                    <div className="flex flex-col gap-2 max-w-xs">
                        <label className="text-md font-medium ">
                            Categories
                        </label>
                        <SelectInput
                            data={category}
                            handleChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </SelectInput>
                    </div>
                    <div className="flex flex-col gap-2 max-w-xs">
                        <label className="text-md font-medium">
                            Search Product
                        </label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="px-4 py-2 rounded-lg border-2 text-md"
                        />
                    </div>
                    <div className="max-w-xs">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 w-full text-md text-white rounded-lg font-semibold"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <div className="mt-5">
                    <h2 className="text-xl font-semibold">Product List</h2>
                    <div className="mt-2 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={(product) =>
                                        handleAddOrders(product)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-5 mb-12">
                    <h2 className="text-xl font-semibold">Order List</h2>
                    <div className="mt-5 flex flex-col gap-2 max-w-xs">
                        <label className="font-medium">Type</label>
                        <select
                            value={orderType}
                            onChange={(e) => setOrderType(e.target.value)}
                            className="px-4 py-2 border-2 rounded-lg mb-2"
                        >
                            <option value="">Choose Order Type</option>
                            <option value={order_type.DINE_IN + 1}>
                                Dine In
                            </option>
                            <option value={order_type.TAKE_OUT + 1}>
                                Take Out
                            </option>
                        </select>
                    </div>
                    <Table>
                        <TableHeads>
                            <TableHead>Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead></TableHead>
                        </TableHeads>
                        <TableBody>
                            {orders.map((order) => (
                                <TableBodyRow key={order.id}>
                                    <TableData>{order.name}</TableData>
                                    <TableData>
                                        <div className="max-w-[50px] mx-auto">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        minusOrderQuantity(
                                                            order.id
                                                        )
                                                    }
                                                    className="bg-gray-300 px-2 py-1 text-xs rounded hover:bg-gray-400 font-semibold"
                                                >
                                                    <i className="fa-solid fa-minus"></i>
                                                </button>
                                                <input
                                                    type="text"
                                                    onChange={(e) =>
                                                        handleOrderChange(
                                                            e,
                                                            order.id
                                                        )
                                                    }
                                                    className="text-center px-2 py-1 border max-w-[40px]"
                                                    value={order.order_quantity}
                                                />
                                                <button
                                                    onClick={() =>
                                                        addOrderQuantity(
                                                            order.id
                                                        )
                                                    }
                                                    className="bg-gray-300 px-2 py-1 text-xs rounded hover:bg-gray-400 font-semibold"
                                                >
                                                    <i className="fa-solid fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </TableData>
                                    <TableData>{order.price}</TableData>
                                    <TableData>
                                        {parseFloat(
                                            order.price * order.order_quantity
                                        ).toFixed(2)}
                                    </TableData>
                                    <TableData>
                                        <button
                                            onClick={() =>
                                                handleDeleteOrders(order.id)
                                            }
                                            className="w-full text-center text-lg text-red-600 hover:text-red-700"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </TableData>
                                </TableBodyRow>
                            ))}
                        </TableBody>
                    </Table>
                    {orders.length > 0 ? (
                        <div className="space-y-3">
                            <div className="text-lg mt-5 mb-2">
                                Total:{" "}
                                <span className="font-semibold">
                                    {parseFloat(getAllTotal(orders)).toFixed(2)}
                                </span>
                            </div>
                            <div className="text-lg">
                                Amount Render:
                                <span className="ms-2 ">
                                    <input
                                        type="number"
                                        value={amountRender}
                                        onChange={(e) =>
                                            setAmountRender(e.target.value)
                                        }
                                        className="px-2 py-1 border-2 text-center font-semibold rounded-lg"
                                    />
                                </span>
                            </div>
                            <div className="text-lg mt-5 mb-2">
                                Change:{" "}
                                <span className="font-semibold">
                                    {getChange()}
                                </span>
                            </div>

                            <button
                                onClick={() => handleSubmit()}
                                className="bg-blue-700 px-4 py-2 text-white font-semibold rounded-lg hover:bg-blue-800"
                            >
                                Create Order
                            </button>
                        </div>
                    ) : null}
                </div>
            </Content>
        </Admin>
    );
}

export default OrdersCreate;
