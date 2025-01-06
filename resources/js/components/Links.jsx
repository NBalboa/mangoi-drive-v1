import { Link } from "@inertiajs/react";
import React from "react";

function Links({ links, per_page, total }) {
    return (
        <div>
            {per_page >= total ? null : (
                <nav
                    className="flex items-end flex-column flex-wrap md:flex-row justify-end pt-4"
                    aria-label="Table navigation"
                >
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 rounded">
                        {links.map((link) => (
                            <li key={link.label}>
                                <Link
                                    preserveScroll
                                    href={link.url}
                                    className={`${
                                        !link.url ? "hidden" : ""
                                    } flex items-center justify-center px-3 h-8 leading-tight ${
                                        link.active
                                            ? "text-blue-600 bg-blue-50 hover:text-blue-600"
                                            : "text-gray-500"
                                    } bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                ></Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}

export default Links;
