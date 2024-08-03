"use client";

import { Button } from "@/components/ui/button";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function OrgSidebar() {
  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 ">
      <Link href={"/"}>
        <div className="flex gap-2">
          <Image
            src={"/logo.svg"}
            alt=""
            width={100}
            height={100}
            className=""
          />
          <div className="font-extrabold text-lg">BOARD</div>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              background: "white",
              border: "1px solid #E5E7EB",
            },
          },
        }}
      />
      <div className="space-y-2 w-full">
        <Button className="justify-start px-2 w-full" variant={"ghost"} asChild>
          <Link href={"/"}>
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Team Dashboards
          </Link>
        </Button>
        <Button className="justify-start px-2 w-full" variant={"ghost"} asChild>
          <Link href={{
            pathname: "/",
            query: {
              favorite: true
            }
          }}>
            <Star className="w-4 h-4 mr-2" />
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default OrgSidebar;
