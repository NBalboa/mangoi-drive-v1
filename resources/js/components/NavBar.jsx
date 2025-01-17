import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import NavItem from "./NavItem";
import MenuLink from "./MenuLink";

function NavBar() {
    const { auth } = usePage().props;
    const { component } = usePage();

    const [show, setShow] = useState(false);
    function handleLogout() {
        router.post("/logout");
    }
    function handleShow(show) {
        setShow(!show);
    }

    return (
        <nav className="relative flex p-5 bg-black justify-between rounded-b-rtl shadow-lg z-50">
            <h1 className="text-white hover:text-yellow-200 text-2xl md:text-3xl font-bold">
                <a href="#">Mango Drive</a>
            </h1>
            <ul className="flex font-semibold text-md gap-5  items-center">
                <NavItem
                    label="Home"
                    path="/"
                    isActive={"Welcome" === component}
                />

                {auth.user?.role === 0 ? (
                    <>
                        <NavItem label="Dashboard" path="/dashboard" />
                    </>
                ) : (
                    <>
                        <NavItem
                            label="Menu"
                            path="/menu"
                            isActive={"Menu" === component}
                        />
                    </>
                )}

                {auth.user?.role === 1 ? (
                    <>
                        <NavItem
                            label="Cart"
                            path="/cart"
                            isActive={"Cart" === component}
                        >
                            {auth.cart_total > 0 ? (
                                <div className="absolute -top-[10px] -right-4 h-5 w-5 flex items-center justify-center bg-red-700 rounded-full">
                                    <p className="text-white text-xs font-bold">
                                        {auth.cart_total}
                                    </p>
                                </div>
                            ) : null}
                        </NavItem>
                        <NavItem
                            label="Orders"
                            path="/my/orders"
                            isActive={"MyOrders" === component}
                        />
                        <NavItem
                            label="Account"
                            path="/account"
                            isActive={"Account" === component}
                        />
                        <button
                            onClick={() => handleLogout()}
                            className="px-4 py-2 bg-yellow-600 text-white rounded hover:opacity-90"
                        >
                            Logout
                        </button>
                    </>
                ) : null}

                {!auth.user ? (
                    <>
                        <>
                            <li>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:opacity-90"
                                >
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:opacity-90"
                                >
                                    Login
                                </Link>
                            </li>
                        </>
                    </>
                ) : null}
                <li className="block md:hidden">
                    <button
                        onClick={() => handleShow(show)}
                        className="text-xl text-white hover:opacity-90"
                    >
                        {show ? (
                            <i className="fa-solid fa-xmark"></i>
                        ) : (
                            <i className="fa-solid fa-bars"></i>
                        )}
                    </button>
                </li>
            </ul>
            <nav
                className={`absolute ${
                    show ? "block" : "hidden"
                }  md:hidden left-0 top-[72px] bg-black w-full py-5`}
            >
                <ul className="flex flex-col items-center text-white text-lg gap-3 font-semibold ">
                    <MenuLink
                        label="Home"
                        path="/"
                        isActive={"Welcome" === component}
                    />

                    {auth.user?.role === 0 ? (
                        <>
                            <MenuLink label="Dashboard" path="/dashboard" />
                        </>
                    ) : (
                        <>
                            <MenuLink
                                label="Menu"
                                path="/menu"
                                isActive={"Menu" === component}
                            />
                        </>
                    )}
                    {auth.user?.role === 1 ? (
                        <>
                            <MenuLink
                                label="Cart"
                                path="/cart"
                                isActive={"Cart" === component}
                            >
                                {auth.cart_total > 0 ? (
                                    <div className="absolute -top-[10px] -right-4 h-5 w-5 flex items-center justify-center bg-red-700 rounded-full">
                                        <p className="text-white text-xs font-bold">
                                            {auth.cart_total}
                                        </p>
                                    </div>
                                ) : null}
                            </MenuLink>
                            <MenuLink
                                label="Orders"
                                path="/my/orders"
                                isActive={"MyOrders" === component}
                            />
                            <MenuLink
                                label="Account"
                                path="/account"
                                isActive={"Account" === component}
                            />
                        </>
                    ) : null}
                </ul>
            </nav>
        </nav>
    );
}

export default NavBar;
