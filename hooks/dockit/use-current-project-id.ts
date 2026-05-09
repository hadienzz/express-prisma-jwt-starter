"use client";

import { useMemo } from "react";

const storageKey = "dockit.currentProjectId";

export const saveCurrentDockitProjectId = (projectId: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, projectId);
};

export const useCurrentDockitProjectId = () => {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const queryProjectId = new URLSearchParams(window.location.search).get(
      "projectId",
    );

    if (queryProjectId) {
      return queryProjectId;
    }

    return window.localStorage.getItem(storageKey);
  }, []);
};
