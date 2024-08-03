"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";

function NewOrgButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <button className="w-full h-full rounded-lg bg-white/25 flex items-center justify-center opacity-60 hover:opacity-100 transition-all">
            <Plus />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateOrganization routing="hash" />
      </DialogContent>
    </Dialog>
  );
}

export default NewOrgButton;
