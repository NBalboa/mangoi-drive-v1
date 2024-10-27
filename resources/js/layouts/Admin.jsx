import React from "react";
import Sidebar from "../components/Sidebar";

export default function Admin({ children }) {
    return (
        <Sidebar>
            <div className="p-4 sm:ml-64 mt-14">{children}</div>
        </Sidebar>
    );
}
