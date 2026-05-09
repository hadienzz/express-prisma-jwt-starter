"use client";

import {
  IconArrowLeft,
  IconArrowRight,
  IconChecklist,
  IconClock,
  IconFileCheck,
  IconFileText,
  IconLoader2,
  IconReceipt,
  IconShieldLock,
} from "@tabler/icons-react";

import DockitButton from "@/components/dockit/DockitButton";
import AppShell from "@/components/layout/AppShell";
import StepIndicator from "@/components/layout/StepIndicator";
import DocumentCard from "@/components/ui/DocumentCard";
import { useCurrentDockitProjectId } from "@/hooks/dockit/use-current-project-id";
import { useDocumentSelection } from "@/hooks/dockit/use-document-selection";

const iconByType = {
  BAST: IconFileCheck,
  "Kontrak Kerja": IconFileText,
  NDA: IconShieldLock,
  SOW: IconChecklist,
  SLA: IconClock,
  Invoice: IconReceipt,
};

export default function DocumentsPage() {
  const projectId = useCurrentDockitProjectId();
  const documents = useDocumentSelection(projectId);
  const projectQuery = projectId ? `?projectId=${projectId}` : "";

  return (
    <AppShell
      title="Select documents to generate"
      subtitle="Dockit will auto-fill these documents using your PRD. Toggle the ones you need."
    >
      <StepIndicator currentStep={4} />

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {documents.options.map((document) => (
          <DocumentCard
            key={document.id}
            icon={iconByType[document.type]}
            title={document.title}
            description={document.description}
            selected={document.selected}
            onToggle={() => documents.toggleDocument(document.id)}
          />
        ))}
      </section>

      <p className="mt-4 text-[14px] text-dockit-muted">
        {documents.selectedCount} documents selected
      </p>

      <div className="h-24" />
      <div className="fixed inset-x-0 bottom-0 z-20 border-t-[0.5px] border-dockit-border bg-white px-5 py-4 lg:left-60 lg:px-12">
        <div className="flex items-center justify-between">
          <DockitButton href={`/project/new/flowchart${projectQuery}`} variant="ghost">
            <IconArrowLeft className="size-4" stroke={1.8} />
            Back
          </DockitButton>
          <DockitButton
            type="button"
            onClick={() => documents.generateDocuments()}
            disabled={
              !projectId || documents.selectedCount === 0 || documents.isGenerating
            }
          >
            {documents.isGenerating ? (
              <IconLoader2 className="size-4 animate-spin" stroke={1.8} />
            ) : (
              <IconArrowRight className="size-4" stroke={1.8} />
            )}
            Generate Documents
          </DockitButton>
          <DockitButton href="/project/new/share" variant="ghost" className="hidden">
            Continue
          </DockitButton>
        </div>
      </div>
    </AppShell>
  );
}
