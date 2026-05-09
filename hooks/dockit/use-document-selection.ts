"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { documentGenerationOptions } from "@/services/dockit/mock-data";
import { generateSelectedDocuments } from "@/services/dockit/projects";
import type { DocumentType } from "@/types/dockit";

const documentTypeById: Record<string, DocumentType> = {
  bast: "BAST",
  contract: "Kontrak Kerja",
  nda: "NDA",
  sow: "SOW",
  sla: "SLA",
  invoice: "Invoice",
};

export const useDocumentSelection = (projectId: string | null) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedIds, setSelectedIds] = useState<string[]>(
    documentGenerationOptions
      .filter((document) => document.selected)
      .map((document) => document.id),
  );

  const mutation = useMutation({
    mutationKey: ["dockit", "documents", "generate"],
    mutationFn: () =>
      generateSelectedDocuments(
        projectId ?? "",
        selectedIds.map((id) => documentTypeById[id]),
      ),
    onSuccess: async (project) => {
      await queryClient.invalidateQueries({
        queryKey: ["dockit", "project", project.id],
      });
      router.push(`/project/new/share?projectId=${project.id}`);
    },
  });

  const options = useMemo(() => {
    return documentGenerationOptions.map((document) => ({
      ...document,
      selected: selectedIds.includes(document.id),
    }));
  }, [selectedIds]);

  const toggleDocument = (documentId: string) => {
    setSelectedIds((current) =>
      current.includes(documentId)
        ? current.filter((id) => id !== documentId)
        : [...current, documentId],
    );
  };

  return {
    isGenerating: mutation.isPending,
    options,
    selectedCount: selectedIds.length,
    generateDocuments: mutation.mutate,
    toggleDocument,
  };
};
