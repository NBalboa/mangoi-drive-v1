import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";

function NavBar() {
    const { auth } = usePage().props;

    const [show, setShow] = useState(false);
    function handleLogout() {
        router.post("/logout");
    }
    function handleShow(show) {
        setShow(!show);
    }

    return (
        <nav className="relative flex p-5 bg-black justify-between rounded-b-rtl shadow-lg">
            <h1 className="text-white hover:text-yellow-200 text-2xl md:text-3xl font-bold">
                <a href="#">Mango Drive</a>
            </h1>
            <ul className="flex font-semibold text-md gap-2  items-center">
                <li className="hidden md:block">
                    <Link
                        href="/"
                        className="text-yellow-200 hover:text-yellow-200"
                    >
                        Home
                    </Link>
                </li>
                <li className="hidden md:block">
                    <a href="#" className="text-white hover:text-yellow-200">
                        Menu
                    </a>
                </li>
                <li className="hidden md:block">
                    <a href="#" className="text-white hover:text-yellow-200">
                        Contact
                    </a>
                </li>

                {auth.user ? (
                    <button
                        onClick={() => handleLogout()}
                        className="px-4 py-2 bg-yellow-600 text-white rounded hover:opacity-90"
                    >
                        Logout
                    </button>
                ) : (
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
                )}
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
                    <li>
                        <a
                            href="#"
                            className="text-yellow-200 hover:text-yellow-200"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-white hover:text-yellow-200"
                        >
                            Menu
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-white hover:text-yellow-200"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </nav>
    );
}

export default NavBar;
