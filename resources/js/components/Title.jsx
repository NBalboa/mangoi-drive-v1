import React from "react";

function Title({ children }) {
    return (
        <h2 className="mb-2 font-bold text-2xl sm:text-3xl md:text-4xl">
            {children}
        </h2>
    );
}

export default Title;
