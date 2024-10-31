import React from "react";

function FormLabel({ children }) {
    return (
        <label className="text-md font-medium text-black focus:ring-yellow-300">
            {children}
        </label>
    );
}

export default FormLabel;
