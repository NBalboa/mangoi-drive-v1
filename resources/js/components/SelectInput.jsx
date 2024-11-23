import React from "react";

function SelectInput({ children, handleChange, data }) {
    return (
        <select
            value={data}
            className="px-4 py-2 border-2 rounded text-md"
            onChange={(e) => handleChange(e)}
        >
            {children}
        </select>
    );
}

export default SelectInput;
