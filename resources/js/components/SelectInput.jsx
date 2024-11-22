import React from "react";

function SelectInput({ children, handleChange }) {
    return (
        <select
            className="px-4 py-2 border-2 rounded text-md"
            onChange={(e) => handleChange(e)}
        >
            {children}
        </select>
    );
}

export default SelectInput;
