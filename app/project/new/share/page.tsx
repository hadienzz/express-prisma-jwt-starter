"use client";

import {
  IconCircleCheck,
  IconDownload,
  IconFileCheck,
  IconMail,
} from "@tabler/icons-react";

import DockitButton from "@/components/dockit/DockitButton";
import AppShell from "@/components/layout/AppShell";
import StepIndicator from "@/components/layout/StepIndicator";
import StatusBadge from "@/components/ui/StatusBadge";
import { useCurrentDockitProjectId } from "@/hooks/dockit/use-current-project-id";
import { useProjectDetail } from "@/hooks/dockit/use-projects";
import { useShareFlow } from "@/hooks/dockit/use-share-flow";

export default function SharePage() {
  const projectId = useCurrentDockitProjectId();
  const { data: project } = useProjectDetail(projectId ?? "e-commerce-redesign");
  const share = useShareFlow(
    project?.shareToken
      ? `https://dockit.app/preview/${project.shareToken}`
      : undefined,
  );
  const documents = project?.documents ?? [];

  return (
    <AppShell title="Share & Sign" subtitle="Final step: send documents to your client.">
      <StepIndicator currentStep={5} completed />

      <section className="mx-auto mt-10 max-w-3xl text-center">
        <IconCircleCheck className="mx-auto size-12 text-dockit-green" stroke={1.8} />
        <h2 className="mt-4 text-[24px] font-medium text-dockit-heading">
          Your documents are ready!
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-dockit-muted">
          Share the link below with your client. They can review and sign
          directly from their browser - no login needed.
        </p>
      </section>

      <section className="mx-auto mt-8 max-w-3xl">
        <label className="block">
          <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.06em] text-dockit-muted">
            Client preview link
          </span>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              readOnly
              value={share.clientLink}
              className="dockit-field h-10 flex-1"
            />
            <DockitButton type="button" onClick={share.copyLink}>
              {share.copyLabel}
            </DockitButton>
          </div>
        </label>
      </section>

      <section className="mx-auto mt-8 max-w-3xl rounded-[10px] border-[0.5px] border-dockit-border bg-white">
        <div className="border-b-[0.5px] border-dockit-border p-4">
          <h3 className="text-[18px] font-medium text-dockit-heading">
            Generated documents ({documents.length || 3})
          </h3>
        </div>
        <div>
          {documents.map((document) => (
            <div
              key={document.id}
              className="flex flex-col gap-3 border-b-[0.5px] border-dockit-border p-4 last:border-b-0 sm:flex-row sm:items-center"
            >
              <IconFileCheck className="size-5 shrink-0 text-dockit-blue" stroke={1.8} />
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-medium text-dockit-heading">
                  {document.name}
                </p>
                <p className="text-[13px] text-dockit-muted">{document.type}</p>
              </div>
              <StatusBadge status="Ready" />
              <div className="flex gap-3 text-[13px] font-medium">
                <button type="button" className="text-dockit-blue">
                  Preview
                </button>
                <button type="button" className="text-dockit-muted hover:text-dockit-heading">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-3xl gap-5 lg:grid-cols-[1fr_auto]">
        <div className="rounded-[10px] border-[0.5px] border-dockit-border bg-white p-5">
          <div className="flex items-center gap-2">
            <IconMail className="size-5 text-dockit-blue" stroke={1.8} />
            <h3 className="text-[18px] font-medium text-dockit-heading">
              Send to client via email
            </h3>
          </div>
          <div className="mt-4 space-y-3">
            <input
              value={share.email}
              onChange={(event) => share.setEmail(event.target.value)}
              className="dockit-field h-10 w-full"
              placeholder="client@email.com"
            />
            <textarea
              value={share.message}
              onChange={(event) => share.setMessage(event.target.value)}
              className="dockit-field min-h-28 w-full resize-none py-3"
            />
            <DockitButton
              type="button"
              onClick={() => share.sendEmail()}
              disabled={share.isSending}
            >
              Send email
            </DockitButton>
          </div>
        </div>
        <DockitButton type="button" variant="outline" className="h-10 self-start">
          <IconDownload className="size-4" stroke={1.8} />
          Download all as ZIP
        </DockitButton>
      </section>

      <div className="mx-auto mt-8 max-w-3xl">
        <DockitButton href="/project/e-commerce-redesign" variant="ghost">
          Go to project dashboard →
        </DockitButton>
      </div>
    </AppShell>
  );
}
