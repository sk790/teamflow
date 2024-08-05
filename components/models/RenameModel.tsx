"use client";

import React, { FormEventHandler, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useRenameModel } from "@/zstatand/useRenameModel";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";

function RenameModel() {
  const { isOpen, onClose, initialValues } = useRenameModel();

  const [title, setTittle] = useState(initialValues.title);
  useEffect(() => {
    setTittle(initialValues.title);
  }, [initialValues.title]);

  const { mutate, pending } = useApiMutation(api.board.updateBoard);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success("Board updated");
        onClose();
      })
      .catch((err) => {
        if (
          err.message.includes(
            "Title cannot be longer than 50 characters or shorter than 2"
          )
        ) {
          toast.error(
            "Title cannot be longer than 50 characters or shorter than 2"
          );
        }
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board tittle</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter new tittle</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-5">
          <Input
            disabled={pending}
            value={title}
            onChange={(e) => setTittle(e.target.value)}
            required
            maxLength={50}
            placeholder="Enter Board tittle"
          />
          <DialogFooter className="mt-4 flex gap-2 flex-col">
            <DialogClose asChild>
              <Button type="button">Cancel</Button>
            </DialogClose>
            <Button
              disabled={pending}
              type="submit"
              className="w-full max-w-[78px]"
            >
              {pending ? (
                <ImSpinner2 className="animate-spin w-4 h-4" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModel;
