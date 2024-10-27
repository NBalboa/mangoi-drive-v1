import { Link } from "@inertiajs/react";
import React from "react";

function SidebarLink({ children, name, path = "#" }) {
    return (
        <li>
            <Link
                href={path}
                className="flex items-center p-2 text-gray-900 rounded-lg group"
            >
                {children}
                <span className="ms-3">{name}</span>
            </Link>
        </li>
    );
}

export default SidebarLink;
