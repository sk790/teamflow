export type canvasState = {
  mode:
    | canvasMode.None
    | canvasMode.Pressing
    | canvasMode.SelectionNet
    | canvasMode.Translating
    | canvasMode.Inserting
    | canvasMode.Resizing
    | canvasMode.Pencil;
};

export enum canvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}
