import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useRenameModel } from "@/store/useRenameModel";

function RenameModel() {
  const { isOpen, onClose, initialValues } = useRenameModel();
  return <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>
            Edit board tittle
        </DialogTitle>
        </DialogHeader>
        <DialogDescription>
            Enter new tittle
        </DialogDescription>
    </DialogContent>
  </Dialog>;
}

export default RenameModel;
