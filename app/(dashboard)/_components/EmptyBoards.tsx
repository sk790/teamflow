"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import React from "react";


function EmptyBoards() {
  const {organization} = useOrganization()
  const create = useMutation(api.board.create)

  const onClick = ()=>{
    if(!organization) return
    create({
      orgId: organization.id,
      title: "New Board",
    })
  }


  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <Image
        src={"/note.svg"}
        alt="note"
        width={140}
        height={140}
      />
      <h2 className="font-semibold mt-4 text-2xl">Create your first board</h2>
      <p className="text-muted-foreground mt-2 text-sm"> Start by creating a new board for your team</p>
      <div className="mt-6">
        <Button onClick={onClick} size={"lg"}>Create Board</Button>
      </div>
    </div>
  );
}

export default EmptyBoards;
