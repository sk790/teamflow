import Image from "next/image";
import React from "react";
import NewOrgButton from "./sidebar/NewOrgButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";

function EmptyOrg() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <img src={"/org.svg"} alt="empty" width={250} height={250} />
      <h2 className="font-semibold mt-6 text-2xl">Welcome to TeamFlow</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
                <Plus className="mr-2"/>
                Create Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
            <CreateOrganization routing="hash" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default EmptyOrg;
