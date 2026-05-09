"use client";

import { useState } from "react";

export const useImageLightbox = (images: string[]) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(100);

  const open = (index: number) => {
    setActiveIndex(index);
    setZoom(100);
  };

  const close = () => setActiveIndex(null);
  const next = () =>
    setActiveIndex((index) =>
      index === null ? 0 : index >= images.length - 1 ? 0 : index + 1,
    );
  const previous = () =>
    setActiveIndex((index) =>
      index === null ? 0 : index <= 0 ? images.length - 1 : index - 1,
    );

  return {
    activeImage: activeIndex === null ? null : images[activeIndex],
    activeIndex,
    isOpen: activeIndex !== null,
    zoom,
    close,
    next,
    open,
    previous,
    zoomIn: () => setZoom((value) => Math.min(value + 10, 160)),
    zoomOut: () => setZoom((value) => Math.max(value - 10, 70)),
  };
};
