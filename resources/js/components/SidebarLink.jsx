import { Link } from "@inertiajs/react";
import React from "react";

function SidebarLink({ children, name, path = "#", active = false }) {
    return (
        <li>
            <Link
                href={path}
                className={`flex items-center p-2 text-gray-900 rounded-lg group ${
                    active ? "bg-gray-200" : "hover:bg-gray-200"
                }`}
            >
                {children}
                <span className="ms-3">{name}</span>
            </Link>
        </li>
    );
}

export default SidebarLink;
