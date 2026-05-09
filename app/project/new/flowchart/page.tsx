"use client";

import {
  IconArrowLeft,
  IconArrowRight,
  IconDownload,
  IconRefresh,
} from "@tabler/icons-react";

import DockitButton from "@/components/dockit/DockitButton";
import MermaidDiagram from "@/components/features/MermaidDiagram";
import AppShell from "@/components/layout/AppShell";
import StepIndicator from "@/components/layout/StepIndicator";
import FlowchartModal from "@/components/modals/FlowchartModal";
import { useCurrentDockitProjectId } from "@/hooks/dockit/use-current-project-id";
import { useDiagramViewer } from "@/hooks/dockit/use-diagram-viewer";
import { useProjectDetail } from "@/hooks/dockit/use-projects";
import { cn } from "@/lib/utils";
import type { DiagramType } from "@/types/dockit";

const diagramTypes: DiagramType[] = ["User Flow", "Architecture", "ERD"];

export default function FlowchartPage() {
  const projectId = useCurrentDockitProjectId();
  const { data: project } = useProjectDetail(projectId ?? "e-commerce-redesign");
  const viewer = useDiagramViewer(project?.diagrams ?? []);
  const projectQuery = project ? `?projectId=${project.id}` : "";

  return (
    <AppShell
      title="Review your project flowchart"
      subtitle="This diagram was generated based on your PRD. Review it before proceeding."
    >
      <StepIndicator currentStep={3} />

      <section className="mt-8">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap border-b-[0.5px] border-dockit-border">
            {diagramTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => viewer.setActiveType(type)}
                className={cn(
                  "dockit-tab",
                  viewer.activeType === type && "dockit-tab-active",
                )}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <DockitButton type="button" variant="outline">
              <IconRefresh className="size-4" stroke={1.8} />
              Regenerate
            </DockitButton>
            <DockitButton type="button" variant="outline">
              <IconDownload className="size-4" stroke={1.8} />
              Export PNG
            </DockitButton>
            <DockitButton type="button" variant="outline">
              Export SVG
            </DockitButton>
          </div>
        </div>

        <button
          type="button"
          onClick={() => viewer.activeDiagram && viewer.openModal(viewer.activeDiagram.id)}
          className="relative min-h-[480px] w-full overflow-hidden rounded-[10px] border-[0.5px] border-dockit-border bg-white p-6 text-left transition-colors duration-150 hover:bg-dockit-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dockit-blue"
        >
          {viewer.activeDiagram ? (
            <MermaidDiagram definition={viewer.activeDiagram.definition} />
          ) : (
            <div className="grid min-h-[420px] place-items-center text-[15px] text-dockit-muted">
              Loading diagram...
            </div>
          )}
          <div className="absolute bottom-4 right-4 h-24 w-36 rounded-md border-[0.5px] border-dockit-border-emphasis bg-dockit-secondary p-2">
            <div className="grid h-full grid-cols-3 gap-1">
              {Array.from({ length: 9 }).map((_, index) => (
                <span
                  key={index}
                  className="rounded-sm border-[0.5px] border-dockit-border bg-white"
                />
              ))}
            </div>
          </div>
        </button>
      </section>

      {project && (
        <FlowchartModal
          diagram={viewer.modalDiagram}
          projectName={project.name}
          zoom={viewer.zoom}
          position={viewer.position}
          onClose={viewer.closeModal}
          onFitScreen={viewer.fitScreen}
          onPointerDown={viewer.onPointerDown}
          onPointerMove={viewer.onPointerMove}
          onPointerUp={viewer.onPointerUp}
          onReset={viewer.reset}
          onWheel={viewer.onWheel}
          onZoomIn={viewer.zoomIn}
          onZoomOut={viewer.zoomOut}
        />
      )}

      <div className="h-24" />
      <div className="fixed inset-x-0 bottom-0 z-20 border-t-[0.5px] border-dockit-border bg-white px-5 py-4 lg:left-60 lg:px-12">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <DockitButton href={`/project/new/prd${projectQuery}`} variant="ghost" className="justify-self-start">
            <IconArrowLeft className="size-4" stroke={1.8} />
            Back
          </DockitButton>
          <button
            type="button"
            className="text-[13px] font-medium text-dockit-muted transition-colors duration-150 hover:text-dockit-heading"
          >
            Not satisfied? Regenerate
          </button>
          <DockitButton href={`/project/new/documents${projectQuery}`} variant="success" className="justify-self-end">
            Approve & Continue
            <IconArrowRight className="size-4" stroke={1.8} />
          </DockitButton>
        </div>
      </div>
    </AppShell>
  );
}
