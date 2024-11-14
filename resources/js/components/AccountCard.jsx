import { Link } from "@inertiajs/react";
import React from "react";

function AccountCard({
    children,
    title,
    to = "#",
    icon = "fa-solid fa-pen-to-square",
}) {
    return (
        <div className="shadow-lg p-5 rounded-lg space-y-2 border-2 border-black">
            <h2 className="text-lg font-semibold flex justify-between">
                {title}
                <span className="ms-2 text-blue-700 hover:text-blue-800">
                    <Link href={to}>
                        <i className={icon}></i>
                    </Link>
                </span>
            </h2>
            <div className="space-y-2">{children}</div>
        </div>
    );
}

export default AccountCard;
