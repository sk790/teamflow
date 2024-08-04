import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization, OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";

function InviteButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          <Plus className="lg:mr-2" />
          <span className="hidden lg:block">Invite Member</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[880px] max-h-[600px] overflow-y-auto flex justify-center">
        <div className="w-[550px] h-[500px] overflow-auto lg:w-full lg:h-full">
          <OrganizationProfile routing="hash" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteButton;
