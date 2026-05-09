"use client";

import confetti from "canvas-confetti";
import { useState } from "react";

import type { DockitDocument } from "@/types/dockit";

export const useSigningFlow = (documents: DockitDocument[]) => {
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null);
  const [signedDocumentIds, setSignedDocumentIds] = useState<string[]>([]);

  const activeDocument =
    documents.find((document) => document.id === activeDocumentId) ?? null;
  const isComplete = signedDocumentIds.length >= documents.length;

  const openSigning = (documentId: string) => {
    setActiveDocumentId(documentId);
  };

  const closeSigning = () => {
    setActiveDocumentId(null);
  };

  const submitSignature = () => {
    if (!activeDocumentId) {
      return;
    }

    setSignedDocumentIds((current) =>
      current.includes(activeDocumentId)
        ? current
        : [...current, activeDocumentId],
    );
    setActiveDocumentId(null);

    if (signedDocumentIds.length + 1 >= documents.length) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return {
    activeDocument,
    isComplete,
    signedDocumentIds,
    closeSigning,
    openSigning,
    submitSignature,
  };
};
