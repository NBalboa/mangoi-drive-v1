import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

function User({ children, isHideFooter = false }) {
    useEffect(() => {
        return () => toast.remove();
    }, []);
    return (
        <div>
            <Toaster />
            <NavBar />
            <main className="m-5">{children}</main>
            {isHideFooter ? "" : <Footer />}
        </div>
    );
}

export default User;
