"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Hint } from "@/components/Hint";
import { useRenameModel } from "@/zstatand/useRenameModel";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

interface User {
  boardId: string;
  id?: string;
  info?: {
    name?: string;
    picture?: string;
  };
}

function Info({ boardId, info }: User) {
  const { onOpen } = useRenameModel();

  const data = useQuery(api.board.getBoard, {
    id: boardId as Id<"boards">,
  });
  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md shadow-md h-12 p-1.5 flex items-center">
      <Hint label="Go to boards">
        <Button asChild>
          <Link href={"/"}>
            <Image
              src={"/logo.svg"}
              alt={"logo"}
              width={60}
              height={60}
              className="m-2"
            />
            <p className={cn("text-sm font-bold")}>Board</p>
          </Link>
        </Button>
      </Hint>
      <TabSeperator />
      <Hint label="Rename Board">
        <Button variant={"ghost"} onClick={() => onOpen(data._id, data.title)}>
          {data.title}
        </Button>
      </Hint>
      <TabSeperator />
      <Actions
        id={data._id}
        title={data.title}
        side="bottom"
        sideOffset={4}
        key={data._id}
      >
        <div>
          <Button size={"icon"} variant={"outline"}>
            <Menu/>
          </Button>
        </div>
      </Actions>
    </div>
  );
}

const TabSeperator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md shadow-md h-12 p-1.5 flex items-center w-[300px]">
      {/* <Skeleton className="w-full h-full bg-muted-400"/> */}
    </div>
  );
};

export default Info;
