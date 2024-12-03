import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

export default function Admin({ children }) {
    useEffect(() => {
        return () => toast.remove();
    }, []);
    return (
        <Sidebar>
            <div className="p-4 sm:ml-64 mt-14">{children}</div>
        </Sidebar>
    );
}
