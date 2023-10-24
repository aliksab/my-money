import React from "react";

import SidebarContent from "./SidebarContent";

function DesktopSidebar(props) {
    return (
        <aside className="w-full flex-shrink-0 invisible overflow-y-auto bg-white dark:bg-gray-800 lg:visible relative">
            <SidebarContent />
        </aside>
    );
}

export default DesktopSidebar;
