export type ProjectStatus =
  | "Draft"
  | "In Progress"
  | "Pending Signature"
  | "Completed";

export type DocumentStatus = "Draft" | "Ready" | "Pending Signature" | "Signed";

export type DocumentType =
  | "BAST"
  | "Kontrak Kerja"
  | "NDA"
  | "SOW"
  | "SLA"
  | "Invoice";

export type DiagramType = "User Flow" | "Architecture" | "ERD";

export interface Developer {
  name: string;
  email: string;
  initials: string;
}

export interface Client {
  name: string;
  email: string;
  company?: string;
}

export interface PrdContent {
  overview: string;
  goals: string[];
  scope: string;
  features: string[];
  stack: {
    frontend: string;
    backend: string;
    database: string;
    styling: string;
  };
  timeline: string;
  budget: string;
  acceptanceCriteria: string[];
}

export interface DockitDocument {
  id: string;
  name: string;
  type: DocumentType;
  description: string;
  status: DocumentStatus;
  generatedAt: string;
  lastModifiedAt: string;
  signedBy?: string;
  signedAt?: string;
  fileSize: string;
  previewLines: string[];
}

export interface FlowchartDiagram {
  id: string;
  name: string;
  type: DiagramType;
  lastUpdatedAt: string;
  nodeCount: number;
  definition: string;
}

export interface ActivityItem {
  id: string;
  tone: "green" | "blue" | "amber";
  action: string;
  timestamp: string;
  detail?: string;
}

export interface Project {
  id: string;
  name: string;
  client: Client;
  status: ProjectStatus;
  documentCount: number;
  createdAt: string;
  lastUpdatedAt: string;
  prd: PrdContent;
  documents: DockitDocument[];
  diagrams: FlowchartDiagram[];
  activity: ActivityItem[];
  progress: number;
  shareToken?: string;
}

export interface PreviewSession {
  token: string;
  project: Project;
  developer: Developer;
  message: string;
  sentAt: string;
}

export interface DashboardStats {
  activeProjects: number;
  docsGenerated: number;
  pendingSignatures: number;
  completedProjects: number;
}

export interface DashboardSummary {
  developer: Developer;
  stats: DashboardStats;
  recentProjects: Project[];
}
