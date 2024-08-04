import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";

function NewBoardButton({
  orgId,
  disabled,
}: {
  orgId: string;
  disabled?: boolean;
}) {
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    mutate({
      orgId,
      title: "SAurabh",
    }).then(() => toast.success("Board created"))
    .catch((err) => toast.error("Failed to create board"));
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 hover:bg-blue-800 rounded-lg flex flex-col justify-center items-center py-6",
        (pending || disabled) && "opacity-75 transition-opacity hover:bg-blue-600 duration-500 cursor-not-allowed"
      )}
    >
      <div />
      {pending ? (
        <ImSpinner2 className="animate-spin w-8 h-8 text-white" />
      ) : (
        <Plus className="animate-spin w-8 h-8 text-white" />
      )}
      <p className="text-sm text-white font-light">Create New Board</p>
    </button>
  );
}

export default NewBoardButton;
