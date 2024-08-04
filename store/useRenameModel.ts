import { create } from "zustand";
const defaultValues = {
  id: "",
  tittle: "",
};
interface IRenameModel {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (id: string, tittle: string) => void;
  onClose: () => void;
}

export const useRenameModel = create<IRenameModel>((set) => ({
  isOpen: false,
  onOpen: (id, tittle) =>
    set({
      isOpen: true,
      initialValues: { id, tittle },
    }),
  onClose: () => set({ isOpen: false, initialValues: defaultValues }),
  initialValues: defaultValues,
}));
