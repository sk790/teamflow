"use client";
import React from "react";
import EmptySearch from "./EmptySearch";
import EmptyFavorite from "./EmptyFavorite";
import EmptyBoards from "./EmptyBoards";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import BoardCard from "./boardCard/BoardCard";
import NewBoardButton from "./NewBoardButton";

interface Props {
  orgId: string;
  query: { search?: string; favorite?: string };
}

export const BoardList = ({ orgId, query }: Props) => {
  const data = useQuery(api.boards.getBoards, {
    orgId,
  });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorite ? "Favorite Boards" : "Team Boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pb-10 gap-4 my-6">
          <NewBoardButton orgId={orgId} disabled = {true}/>
          {Array.from({ length: 9 }).map((_, i) => (
            <BoardCard.Skeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) return <EmptySearch />;

  if (!data?.length && query.favorite) return <EmptyFavorite />;

  if (!data?.length) return <EmptyBoards />;

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorite ? "Favorite Boards" : "Team Boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pb-10 gap-4 my-6">
        <NewBoardButton orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            authorId={board.authorId}
            authorName={board.authorName}
            orgId={board.orgId}
            imageUr={board.imageUrl}
            createdAt={board._creationTime}
            isFavorite={false}
          />
        ))}
      </div>
    </div>
  );
};
