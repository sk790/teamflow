"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization
} from "@clerk/nextjs";
import React from "react";
import SearchInput from "./SearchInput";
import InviteButton from "./InviteButton";

function Navbar() {
  const {organization} = useOrganization();
  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
                maxWidth: "380px",
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                background: "white",
                border: "1px solid #E5E7EB",
                backgroundColor: "white",
              },
            },
          }}
        />
      </div>
      {organization && <InviteButton />}
      <UserButton />
    </div>
  );
}

export default Navbar;
