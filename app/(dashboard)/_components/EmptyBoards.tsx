"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { ImSpinner, ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";


function EmptyBoards() {
  const router = useRouter();
  const {organization} = useOrganization()
  const {mutate,pending} = useApiMutation(api.board.create)

  const onClick = ()=>{
    if(!organization) return
    mutate({
      orgId: organization.id,
      title: "New Board",
    })
    .then((id)=>{
      toast.success("Board created")
      router.push(`/board/${id}`)
    })
    .catch((err)=>{
      toast.error("Failed to create board")
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
        <Button disabled={pending} onClick={onClick} size={"lg"}>
          {pending ?<ImSpinner2 className="animate-spin"/>:"Create Board"}
        </Button>
      </div>
    </div>
  );
}

export default EmptyBoards;
