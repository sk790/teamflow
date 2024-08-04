"use client";

import RenameModel from "@/components/models/RenameModel";
import React, { useEffect, useState } from "react";

function ModalProvider() {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) return null;
  return <RenameModel />;
}

export default ModalProvider;
