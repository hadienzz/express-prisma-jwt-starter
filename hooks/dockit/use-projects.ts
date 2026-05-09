"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getDashboardSummary,
  getPreviewSession,
  getProjectById,
  getProjects,
} from "@/services/dockit/projects";

export const DOCKIT_DASHBOARD_QUERY_KEY = ["dockit", "dashboard"];
export const DOCKIT_PROJECTS_QUERY_KEY = ["dockit", "projects"];
export const DOCKIT_PROJECT_DETAIL_QUERY_KEY = ["dockit", "project"];
export const DOCKIT_PREVIEW_QUERY_KEY = ["dockit", "preview"];

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: DOCKIT_DASHBOARD_QUERY_KEY,
    queryFn: getDashboardSummary,
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: DOCKIT_PROJECTS_QUERY_KEY,
    queryFn: getProjects,
  });
};

export const useProjectDetail = (projectId: string) => {
  return useQuery({
    queryKey: [...DOCKIT_PROJECT_DETAIL_QUERY_KEY, projectId],
    queryFn: () => getProjectById(projectId),
  });
};

export const usePreviewSession = (token: string) => {
  return useQuery({
    queryKey: [...DOCKIT_PREVIEW_QUERY_KEY, token],
    queryFn: () => getPreviewSession(token),
  });
};
