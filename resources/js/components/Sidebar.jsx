import React, { useState } from "react";
import TopNav from "./TopNav";
import SidebarLinks from "./SidebarLinks";
import SidebarLink from "./SidebarLink";
import { router, usePage } from "@inertiajs/react";
export default function Sidebar({ children }) {
    const [open, setOpen] = useState(false);
    const { component } = usePage();

    function handleLogout() {
        router.post("/logout");
    }

    return (
        <div>
            <TopNav open={open} setOpen={setOpen} />
            <aside
                id="logo-sidebar"
                className={`fixed ${
                    open ? "translate-x-0 " : ""
                }  top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <SidebarLinks>
                    <SidebarLink
                        name="Dasboard"
                        path="/dashboard"
                        active={"Admin/Dashboard" === component}
                    />
                    <SidebarLink
                        name="Walk-in Orders"
                        path="/orders"
                        active={"Admin/Orders" === component}
                    />
                    <SidebarLink
                        name="Online Orders"
                        path="/online/orders"
                        active={"Admin/OnlineOrders" === component}
                    />
                    <SidebarLink
                        name="Products"
                        path="/products"
                        active={"Admin/Product" === component}
                    />
                    <SidebarLink
                        name="Category"
                        path="/categories"
                        active={"Admin/Categories" === component}
                    />
                    <SidebarLink
                        name="Users"
                        path="/users"
                        active={"Admin/Users" === component}
                    />
                    <li>
                        <button
                            onClick={() => handleLogout()}
                            className="flex items-center p-2 text-gray-900 rounded-lg group hover:bg-gray-200 w-full"
                        >
                            <span className="ms-3">Logout</span>
                        </button>
                    </li>
                </SidebarLinks>
            </aside>
            {children}
        </div>
    );
}
