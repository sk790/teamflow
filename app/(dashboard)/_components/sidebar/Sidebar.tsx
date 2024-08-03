import React from "react";
import NewOrgButton from "./NewOrgButton";
import OrgList from "./OrgList";
function Sidebar() {
  return (
    <div className="fixed left-0 bg-teal-500 h-full flex flex-col w-[60px] p-3 gap-y-4 text-white z-[1]">
    <OrgList/>
    <NewOrgButton/>
    </div>
  );
}

export default Sidebar;
