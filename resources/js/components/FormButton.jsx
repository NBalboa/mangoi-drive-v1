import React from "react";

function FormButton({ children }) {
    return (
        <button
            type="submit"
            className="w-full text-md border-2 border-black px-4 py-2 text-center rounded-lg font-medium hover:bg-yellow-300 hover:text-white hover:border-yellow-300"
        >
            {children}
        </button>
    );
}

export default FormButton;
