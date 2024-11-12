import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

function User({ children }) {
    useEffect(() => {
        return () => toast.remove();
    }, []);
    return (
        <div>
            <Toaster />
            <NavBar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default User;
