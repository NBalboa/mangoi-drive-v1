import React from "react";

function Table({ children }) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right">
                {children}
            </table>
        </div>
    );
}

export default Table;
