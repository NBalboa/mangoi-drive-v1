import React from "react";

function FormLayout({ children, title, small_form = true }) {
    return (
        <div
            className={`flex flex-col w-full sm:w-[400px] md:w-[500px] justify-center px-6 py-8 mx-auto ${
                small_form ? "h-screen lg:py-0" : null
            }`}
        >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 shadow-lg rounded-lg border border-black">
                <h2 className="text-xl font-bold text-black leading-tight tracking-tight">
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
}

export default FormLayout;
