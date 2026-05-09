"use client";

import { useRef, useState } from "react";

export const useQuickPreview = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const show = (id: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setActiveId(id);
    }, 400);
  };

  const hide = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setActiveId(null);
  };

  return {
    activeId,
    show,
    hide,
  };
};
