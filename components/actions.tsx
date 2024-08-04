"use cilent";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { ImSpinner2 } from "react-icons/im";
import ConfirmModel from "./ConfirmModel";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) => {
  const copyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success("Link Copied");
      })
      .catch((err) => {
        toast.error("Failed to copy link");
      });
  };

  const { mutate, pending } = useApiMutation(api.board.deleteBoard);

  const deleteBoard = () => {
    mutate({
      id,
    })
      .then(() => {
        toast.success("Board deleted");
      })
      .catch((err) => {
        toast.error("Failed to delete board");
      });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        side={side}
        sideOffset={sideOffset}
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={copyLink}>
          <Link2 className="w-4 h-4 mr-1" />
          Copy Board Link
        </DropdownMenuItem>
        <ConfirmModel
          header={"Delete Board"}
          onConfirm={deleteBoard}
          disabled={pending}
          description="Are you sure you want to delete this board? This action cannot be undone."
        >
          <Button
            className={cn(
              "p-3 cursor-pointer text-sm flex justify-start items-center w-full font-normal",
              pending && "justify-center"
            )}
            variant={"ghost"}
          >
            {pending ? (
              <ImSpinner2 className="animate-spin w-4 h-4" />
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-1" /> Delete Board
              </>
            )}
          </Button>
        </ConfirmModel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
