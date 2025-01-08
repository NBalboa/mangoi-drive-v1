import { Link } from "@inertiajs/react";
import React from "react";

function NavItem({ children, label, active = false, path }) {
    return (
        <li className="hidden md:block">
            <Link
                href={path}
                className={`${
                    active
                        ? "text-yellow-200"
                        : "text-white hover:text-yellow-200"
                } z-10`}
            >
                {label}
            </Link>
            {children}
        </li>
    );
}

export default NavItem;
