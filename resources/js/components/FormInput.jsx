import React from "react";

function FormInput({ type, data, onChange, mergeStyle = null }) {
    return (
        <input
            type={type}
            value={data}
            onChange={(e) => onChange(e)}
            className={`w-full p-2.5 rounded-lg text-sm border-2 border-black mt-1 ${
                mergeStyle ? mergeStyle : null
            }`}
        />
    );
}

export default FormInput;
