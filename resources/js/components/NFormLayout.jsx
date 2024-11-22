import React from "react";

function NFormLayout({ children }) {
    return (
        <div className="max-w-2xl mx-auto bg-gray-300 rounded-lg">
            {children}
        </div>
    );
}

export default NFormLayout;
