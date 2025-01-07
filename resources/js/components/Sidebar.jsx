import React, { useState } from "react";
import TopNav from "./TopNav";
import SidebarLinks from "./SidebarLinks";
import SidebarLink from "./SidebarLink";
import { usePage } from "@inertiajs/react";
export default function Sidebar({ children }) {
    const [open, setOpen] = useState(false);
    const { component } = usePage();
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
                    <SidebarLink name="Dasboard" path="/"></SidebarLink>
                    <SidebarLink
                        name="Orders"
                        path="/orders"
                        active={"Admin/Orders" === component}
                    ></SidebarLink>
                    <SidebarLink
                        name="Online Orders"
                        path="/online/orders"
                        active={"Admin/OnlineOrders" === component}
                    ></SidebarLink>
                    <SidebarLink
                        name="Products"
                        path="/products"
                        active={"Admin/Product" === component}
                    ></SidebarLink>
                    <SidebarLink
                        name="Suppliers"
                        path="/suppliers"
                        active={"Admin/Suppliers" === component}
                    ></SidebarLink>

                    <SidebarLink
                        name="Category"
                        path="/categories"
                        active={"Admin/Categories" === component}
                    ></SidebarLink>
                </SidebarLinks>
            </aside>
            {children}
        </div>
    );
}
