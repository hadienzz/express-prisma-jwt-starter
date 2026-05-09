"use client";

import { useState } from "react";

export type ProjectDetailTab =
  | "Overview"
  | "PRD"
  | "Flowchart"
  | "Documents"
  | "Activity";

export const projectDetailTabs: ProjectDetailTab[] = [
  "Overview",
  "PRD",
  "Flowchart",
  "Documents",
  "Activity",
];

export const useProjectTabs = () => {
  const [activeTab, setActiveTab] = useState<ProjectDetailTab>("Overview");

  return {
    activeTab,
    setActiveTab,
  };
};
