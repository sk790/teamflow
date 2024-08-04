"use client";
import React from "react";
import EmptyOrg from "./_components/EmptyOrg";
import { useOrganization } from "@clerk/nextjs";
import { BoardList } from "./_components/BoardList";

function Dashboard({searchParams}: {searchParams: any}) {
  const { organization } = useOrganization();
  return (
    <div className="flex-1 h-[calc(100%-80px)] p-8">
      {!organization ? <EmptyOrg /> : <BoardList orgId={organization.id} query={searchParams}/>}
    </div>
  );
}

export default Dashboard;
