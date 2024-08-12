"use client";
import React from "react";
import EmptyOrg from "./_components/EmptyOrg";
import { useOrganization } from "@clerk/nextjs";
import { BoardList } from "./_components/BoardList";
import { useSearchParams } from "next/navigation";

function Dashboard({searchParams}:{searchParams:any}) {
  const searchParamss = useSearchParams();
  let params: any = "";
  const favorite = { favorite: searchParamss.get("favorite")||""};
  const search = { search: searchParamss.get("search")||""};
  
  console.log("search", search);
  console.log("favorite", favorite);
  
  if (favorite.favorite.length > 0) {
    params = favorite;
  } else if (search.search.length > 0) {
    params = search;
  }else{
    params = {};
  }

  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-8">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={params} />
      )}
    </div>
  );
}

export default Dashboard;
