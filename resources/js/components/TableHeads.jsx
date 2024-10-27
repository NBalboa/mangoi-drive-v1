import React from "react";

function TableHeads({ children }) {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>{children}</tr>
        </thead>
    );
}

export default TableHeads;
