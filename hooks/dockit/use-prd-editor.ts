"use client";

import { useState } from "react";

import { dockitProjects } from "@/services/dockit/mock-data";
import type { PrdContent } from "@/types/dockit";

export const usePrdEditor = (initialContent?: PrdContent) => {
  const [content, setContent] = useState(initialContent ?? dockitProjects[0].prd);

  const updateField = (field: "overview" | "scope", value: string) => {
    setContent((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateListItem = (
    field: "goals" | "features" | "acceptanceCriteria",
    index: number,
    value: string,
  ) => {
    setContent((current) => ({
      ...current,
      [field]: current[field].map((item, itemIndex) =>
        itemIndex === index ? value : item,
      ),
    }));
  };

  const updateStack = (
    field: keyof typeof content.stack,
    value: string,
  ) => {
    setContent((current) => ({
      ...current,
      stack: {
        ...current.stack,
        [field]: value,
      },
    }));
  };

  const addFeature = () => {
    setContent((current) => ({
      ...current,
      features: [...current.features, "New feature - describe client value."],
    }));
  };

  const addAcceptanceCriteria = () => {
    setContent((current) => ({
      ...current,
      acceptanceCriteria: [
        ...current.acceptanceCriteria,
        "New acceptance criteria item.",
      ],
    }));
  };

  return {
    content,
    addAcceptanceCriteria,
    addFeature,
    updateField,
    updateListItem,
    updateStack,
  };
};
