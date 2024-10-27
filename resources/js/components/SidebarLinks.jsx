import React from "react";

function SidebarLinks({ children }) {
    return (
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
            <ul className="space-y-2 font-medium">{children}</ul>
        </div>
    );
}

export default SidebarLinks;
