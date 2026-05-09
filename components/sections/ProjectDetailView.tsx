"use client";

import Link from "next/link";
import {
  IconEdit,
  IconFilePlus,
  IconPlus,
  IconPrinter,
  IconShare,
} from "@tabler/icons-react";

import DockitButton from "@/components/dockit/DockitButton";
import MermaidDiagram from "@/components/features/MermaidDiagram";
import AppShell from "@/components/layout/AppShell";
import DocumentModal from "@/components/modals/DocumentModal";
import FlowchartModal from "@/components/modals/FlowchartModal";
import QuickPreviewTooltip from "@/components/ui/QuickPreviewTooltip";
import StatusBadge from "@/components/ui/StatusBadge";
import { useDiagramViewer } from "@/hooks/dockit/use-diagram-viewer";
import { useDocumentModal } from "@/hooks/dockit/use-document-modal";
import {
  projectDetailTabs,
  useProjectTabs,
} from "@/hooks/dockit/use-project-tabs";
import { useProjectDetail } from "@/hooks/dockit/use-projects";
import { useQuickPreview } from "@/hooks/dockit/use-quick-preview";
import { cn } from "@/lib/utils";

type ProjectDetailViewProps = {
  projectId: string;
};

const ProjectDetailView = ({ projectId }: ProjectDetailViewProps) => {
  const { data: project } = useProjectDetail(projectId);
  const tabs = useProjectTabs();
  const preview = useQuickPreview();
  const documentModal = useDocumentModal(project?.documents ?? []);
  const diagramViewer = useDiagramViewer(project?.diagrams ?? []);

  if (!project) {
    return (
      <AppShell title="Loading project">
        <div className="rounded-[10px] border-[0.5px] border-dockit-border p-6 text-dockit-muted">
          Loading project details...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      title={
        <span className="inline-flex flex-wrap items-center gap-3">
          {project.name}
          <StatusBadge status={project.status} />
        </span>
      }
      subtitle={
        <>
          Client: {project.client.name} &middot; Created: {project.createdAt}{" "}
          &middot; Last updated: {project.lastUpdatedAt}
        </>
      }
      action={
        <div className="flex flex-wrap gap-2">
          <DockitButton type="button" variant="outline">
            <IconShare className="size-4" stroke={1.8} />
            Share link
          </DockitButton>
          <DockitButton type="button">
            <IconPlus className="size-4" stroke={1.8} />
            Add Document
          </DockitButton>
        </div>
      }
    >
      <Link
        href="/dashboard"
        className="mb-5 inline-block text-[14px] font-medium text-dockit-muted transition-colors duration-150 hover:text-dockit-heading"
      >
        ← All Projects
      </Link>

      <div className="mb-6 flex overflow-x-auto border-b-[0.5px] border-dockit-border">
        {projectDetailTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => tabs.setActiveTab(tab)}
            className={cn(
              "dockit-tab",
              tabs.activeTab === tab && "dockit-tab-active",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {tabs.activeTab === "Overview" && (
        <div className="grid gap-6 xl:grid-cols-[60fr_40fr]">
          <section className="space-y-6">
            <article className="rounded-[10px] border-[0.5px] border-dockit-border bg-white p-5">
              <h2 className="text-[18px] font-medium text-dockit-heading">
                Project summary
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-dockit-muted">
                {project.prd.overview}
              </p>
              <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-dockit-muted">
                    Budget
                  </dt>
                  <dd className="mt-1 text-[15px] text-dockit-heading">
                    {project.prd.budget}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-dockit-muted">
                    Timeline
                  </dt>
                  <dd className="mt-1 text-[15px] text-dockit-heading">
                    {project.prd.timeline}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-dockit-muted">
                    Stack
                  </dt>
                  <dd className="mt-1 text-[15px] text-dockit-heading">
                    {project.prd.stack.frontend}, {project.prd.stack.backend}
                  </dd>
                </div>
              </dl>
            </article>

            <article className="rounded-[10px] border-[0.5px] border-dockit-border bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-[18px] font-medium text-dockit-heading">
                  Timeline progress
                </h2>
                <span className="text-[14px] text-dockit-muted">
                  {project.progress}%
                </span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-dockit-hover">
                <div
                  className="h-full rounded-full bg-dockit-green"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {["PRD", "Flowchart", "Documents", "Signature"].map((phase) => (
                  <div
                    key={phase}
                    className="rounded-md border-[0.5px] border-dockit-border bg-dockit-secondary p-3 text-[13px] text-dockit-heading"
                  >
                    {phase}
                  </div>
                ))}
              </div>
            </article>
          </section>

          <aside className="space-y-6">
            <article className="rounded-[10px] border-[0.5px] border-dockit-border bg-white p-5">
              <h2 className="text-[18px] font-medium text-dockit-heading">
                Document checklist
              </h2>
              <div className="mt-4 space-y-3">
                {project.documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-[14px] text-dockit-heading">
                      {document.type}
                    </span>
                    <StatusBadge status={document.status} />
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[10px] border-[0.5px] border-dockit-border bg-white p-5">
              <h2 className="text-[18px] font-medium text-dockit-heading">
                Quick actions
              </h2>
              <div className="mt-4 grid gap-2">
                {["Share Link", "Download All", "Send Reminder"].map((action) => (
                  <DockitButton key={action} type="button" variant="outline" className="justify-start">
                    {action}
                  </DockitButton>
                ))}
              </div>
            </article>
          </aside>
        </div>
      )}

      {tabs.activeTab === "PRD" && (
        <section>
          <div className="mb-4 flex justify-end gap-2">
            <DockitButton type="button" variant="outline">
              <IconEdit className="size-4" stroke={1.8} />
              Edit PRD
            </DockitButton>
            <DockitButton type="button" variant="outline">
              <IconPrinter className="size-4" stroke={1.8} />
              Print
            </DockitButton>
          </div>
          <article className="mx-auto max-w-[760px] border border-dockit-border bg-white px-8 py-10 sm:px-14">
            <h2 className="text-[24px] font-medium text-dockit-heading">
              Product Requirements Document
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-dockit-muted">
              {project.prd.overview}
            </p>
            <h3 className="mt-8 text-[18px] font-medium text-dockit-heading">
              Key Features
            </h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-dockit-text">
              {project.prd.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ol>
          </article>
        </section>
      )}

      {tabs.activeTab === "Flowchart" && (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {project.diagrams.map((diagram) => (
            <button
              key={diagram.id}
              type="button"
              onClick={() => diagramViewer.openModal(diagram.id)}
              className="group relative min-h-56 overflow-hidden rounded-[10px] border-[0.5px] border-dockit-border bg-white p-4 text-left transition-colors duration-150 hover:bg-dockit-secondary"
            >
              <MermaidDiagram definition={diagram.definition} className="scale-75" />
              <div className="mt-3">
                <p className="text-[15px] font-medium text-dockit-heading">
                  {diagram.name}
                </p>
                <p className="text-[13px] text-dockit-muted">
                  Last updated {diagram.lastUpdatedAt}
                </p>
              </div>
              <div className="absolute inset-0 hidden place-items-center bg-dockit-overlay text-white group-hover:grid">
                <span className="rounded-md border-[0.5px] border-white/40 px-3 py-2 text-[13px]">
                  View fullscreen · Export
                </span>
              </div>
            </button>
          ))}
          <button
            type="button"
            className="grid min-h-56 place-items-center rounded-[10px] border-2 border-dashed border-dockit-border-emphasis text-[14px] font-medium text-dockit-muted transition-colors duration-150 hover:bg-dockit-secondary hover:text-dockit-heading"
          >
            <span className="inline-flex items-center gap-2">
              <IconFilePlus className="size-5" stroke={1.8} />
              Generate new diagram
            </span>
          </button>
        </section>
      )}

      {tabs.activeTab === "Documents" && (
        <section className="overflow-x-auto rounded-[10px] border-[0.5px] border-dockit-border bg-white">
          <table className="min-w-[780px] w-full text-left">
            <thead className="bg-dockit-secondary">
              <tr>
                {["Document Name", "Type", "Status", "Generated", "Actions"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.06em] text-dockit-muted"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {project.documents.map((document) => (
                <tr key={document.id} className="border-t-[0.5px] border-dockit-border hover:bg-dockit-secondary">
                  <td
                    className="relative px-4 py-4 text-[14px] font-medium text-dockit-heading"
                    onMouseEnter={() => preview.show(document.id)}
                    onMouseLeave={preview.hide}
                  >
                    {document.name}
                    {preview.activeId === document.id && (
                      <QuickPreviewTooltip document={document} />
                    )}
                  </td>
                  <td className="px-4 py-4 text-[14px] text-dockit-muted">
                    {document.type}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={document.status} />
                  </td>
                  <td className="px-4 py-4 text-[14px] text-dockit-muted">
                    {document.generatedAt}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3 text-[13px] font-medium">
                      <button
                        type="button"
                        onClick={() => documentModal.openDocument(document.id)}
                        className="text-dockit-blue"
                      >
                        Preview
                      </button>
                      <button type="button" className="text-dockit-muted hover:text-dockit-heading">
                        Download
                      </button>
                      <button type="button" className="text-dockit-danger">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tabs.activeTab === "Activity" && (
        <section className="rounded-[10px] border-[0.5px] border-dockit-border bg-white p-5">
          <div className="space-y-5">
            {project.activity.map((item) => (
              <div key={item.id} className="grid grid-cols-[16px_1fr] gap-3">
                <span
                  className={cn(
                    "mt-1 size-3 rounded-full",
                    item.tone === "green" && "bg-dockit-green",
                    item.tone === "blue" && "bg-dockit-blue",
                    item.tone === "amber" && "bg-dockit-amber",
                  )}
                />
                <div>
                  <p className="text-[15px] font-medium text-dockit-heading">
                    {item.action}{" "}
                    <span className="font-normal text-dockit-muted">
                      - {item.timestamp}
                    </span>
                  </p>
                  {item.detail && (
                    <p className="mt-1 text-[13px] text-dockit-muted">
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <DocumentModal
        document={documentModal.activeDocument}
        project={project}
        isOpen={documentModal.isOpen}
        activeIndex={documentModal.activeIndex}
        totalCount={project.documents.length}
        zoom={documentModal.zoom}
        onClose={documentModal.closeDocument}
        onFitWidth={documentModal.fitWidth}
        onNext={documentModal.goNext}
        onPrevious={documentModal.goPrevious}
        onZoomIn={documentModal.zoomIn}
        onZoomOut={documentModal.zoomOut}
      />

      <FlowchartModal
        diagram={diagramViewer.modalDiagram}
        projectName={project.name}
        zoom={diagramViewer.zoom}
        position={diagramViewer.position}
        onClose={diagramViewer.closeModal}
        onFitScreen={diagramViewer.fitScreen}
        onPointerDown={diagramViewer.onPointerDown}
        onPointerMove={diagramViewer.onPointerMove}
        onPointerUp={diagramViewer.onPointerUp}
        onReset={diagramViewer.reset}
        onWheel={diagramViewer.onWheel}
        onZoomIn={diagramViewer.zoomIn}
        onZoomOut={diagramViewer.zoomOut}
      />
    </AppShell>
  );
};

export default ProjectDetailView;
