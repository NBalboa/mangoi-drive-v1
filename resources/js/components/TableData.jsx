import React from "react";

function TableData({ children, uppercase = false }) {
    return (
        <td className={`px-6 py-4 ${uppercase ? "uppercase" : null}`}>
            {children}
        </td>
    );
}

export default TableData;
