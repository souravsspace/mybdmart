"use client";

import { useState } from "react";

export default function useOrder() {
  const [open, setOpen] = useState(false);

  return {
    open,
    setOpen,
  };
}
