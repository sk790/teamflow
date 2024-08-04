"use client";
import React from "react";
import EmptySearch from "./EmptySearch";
import EmptyFavorite from "./EmptyFavorite";
import EmptyBoards from "./EmptyBoards";

interface Props {
  orgId: string;
  query: { search?: string; favorite?: string };
}

export const BoardList = ({ orgId, query }: Props) => {
  const data = [];

  if(!data?.length && query.search) return <EmptySearch/>



  if(!data?.length && query.favorite) return <EmptyFavorite/>
  
  if(!data?.length) return <EmptyBoards/>


  return <div>{JSON.stringify(query)}</div>;
};
