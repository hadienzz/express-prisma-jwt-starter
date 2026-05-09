import type {
  DashboardSummary,
  DockitDocument,
  DocumentType,
  PreviewSession,
  Project,
} from "@/types/dockit";
import { dockitDeveloper, dockitProjects } from "@/services/dockit/mock-data";
import axiosInstance from "@/lib/axios";

type BackendResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T;
};

type AnalyzeMeetingPayload = {
  sourceType: "live" | "upload" | "manual";
  transcript: string;
  projectName?: string;
  clientName?: string;
  clientEmail?: string;
};

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const { data } = await axiosInstance.get<BackendResponse<DashboardSummary>>(
    "/api/dockit/dashboard",
  );

  return data.data;
};

export const getProjects = async (): Promise<Project[]> => {
  const summary = await getDashboardSummary();

  return summary.recentProjects;
};

export const getProjectById = async (id: string): Promise<Project> => {
  if (!uuidPattern.test(id)) {
    return dockitProjects.find((item) => item.id === id) ?? dockitProjects[0];
  }

  const { data } = await axiosInstance.get<
    BackendResponse<{
      project: Project;
    }>
  >(`/api/dockit/projects/${id}`);

  return data.data.project;
};

export const getDocumentById = async (
  documentId: string,
): Promise<DockitDocument> => {
  return (
    dockitProjects
      .flatMap((project) => project.documents)
      .find((document) => document.id === documentId) ??
    dockitProjects[0].documents[0]
  );
};

export const getPreviewSession = async (
  token: string,
): Promise<PreviewSession> => {
  if (token === "abc123xyz") {
    return {
      token,
      project: dockitProjects[0],
      developer: dockitDeveloper,
      message:
        "Hi PT Maju Jaya, please review the documents for our project and sign where indicated.",
      sentAt: "9 Mei 2026",
    };
  }

  const { data } = await axiosInstance.get<BackendResponse<PreviewSession>>(
    `/api/dockit/preview/${token}`,
  );

  return data.data;
};

export const sendClientEmail = async (payload: {
  email: string;
  message: string;
}): Promise<{ sentTo: string; message: string }> => {
  return {
    sentTo: payload.email,
    message: payload.message,
  };
};

export const generateSelectedDocuments = async (
  projectId: string,
  documentTypes: DocumentType[],
): Promise<Project> => {
  const { data } = await axiosInstance.post<
    BackendResponse<{
      project: Project;
    }>
  >(`/api/dockit/projects/${projectId}/documents/generate`, {
    documentTypes,
  });

  return data.data.project;
};

export const analyzeMeeting = async (
  payload: AnalyzeMeetingPayload,
): Promise<Project> => {
  const { data } = await axiosInstance.post<
    BackendResponse<{
      project: Project;
    }>
  >("/api/dockit/projects/analyze", payload);

  return data.data.project;
};
