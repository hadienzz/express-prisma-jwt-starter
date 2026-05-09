"use client";

import { useMemo, useState } from "react";

import type { DockitDocument } from "@/types/dockit";

export const useDocumentModal = (documents: DockitDocument[]) => {
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);

  const activeIndex = useMemo(() => {
    return documents.findIndex((document) => document.id === activeDocumentId);
  }, [activeDocumentId, documents]);

  const activeDocument =
    activeIndex >= 0 ? documents[activeIndex] : documents[0] ?? null;

  const openDocument = (documentId: string) => {
    setActiveDocumentId(documentId);
    setZoom(100);
  };

  const closeDocument = () => {
    setActiveDocumentId(null);
  };

  const zoomIn = () => setZoom((value) => Math.min(value + 10, 150));
  const zoomOut = () => setZoom((value) => Math.max(value - 10, 70));
  const fitWidth = () => setZoom(100);

  const goNext = () => {
    if (!documents.length) {
      return;
    }

    const nextIndex = activeIndex >= documents.length - 1 ? 0 : activeIndex + 1;
    setActiveDocumentId(documents[nextIndex].id);
  };

  const goPrevious = () => {
    if (!documents.length) {
      return;
    }

    const previousIndex =
      activeIndex <= 0 ? documents.length - 1 : activeIndex - 1;
    setActiveDocumentId(documents[previousIndex].id);
  };

  return {
    activeDocument,
    activeIndex,
    isOpen: activeDocumentId !== null,
    zoom,
    openDocument,
    closeDocument,
    zoomIn,
    zoomOut,
    fitWidth,
    goNext,
    goPrevious,
  };
};
