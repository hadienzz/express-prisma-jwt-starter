"use client";

import {
  IconCircleCheck,
  IconFileText,
  IconLock,
} from "@tabler/icons-react";

import DockitButton from "@/components/dockit/DockitButton";
import Logo from "@/components/dockit/Logo";
import SigningModal from "@/components/modals/SigningModal";
import StatusBadge from "@/components/ui/StatusBadge";
import { usePreviewSession } from "@/hooks/dockit/use-projects";
import { useSigningFlow } from "@/hooks/dockit/use-signing-flow";

type ClientPreviewViewProps = {
  token: string;
};

const ClientPreviewView = ({ token }: ClientPreviewViewProps) => {
  const { data: preview } = usePreviewSession(token);
  const signing = useSigningFlow(preview?.project.documents ?? []);

  if (!preview) {
    return (
      <main className="grid min-h-screen place-items-center bg-white text-[15px] text-dockit-muted">
        Loading secure preview...
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-dockit-secondary text-dockit-text">
      <header className="border-b-[0.5px] border-dockit-border bg-white">
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between gap-4 px-5">
          <Logo />
          <p className="hidden text-[15px] font-medium text-dockit-heading sm:block">
            {preview.project.name}
          </p>
          <p className="inline-flex items-center gap-2 text-[13px] text-dockit-muted">
            <IconLock className="size-4" stroke={1.8} />
            Secured by Dockit
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[760px] px-5 py-10">
        {signing.isComplete ? (
          <section className="rounded-[10px] border-[0.5px] border-dockit-border bg-white p-8 text-center">
            <IconCircleCheck className="mx-auto size-12 text-dockit-green" stroke={1.8} />
            <h1 className="mt-4 text-[24px] font-medium text-dockit-heading">
              All documents signed!
            </h1>
            <p className="mt-2 text-[15px] text-dockit-muted">
              {preview.developer.name} has been notified.
            </p>
            <DockitButton type="button" className="mt-6" variant="success">
              Download signed documents (PDF)
            </DockitButton>
          </section>
        ) : (
          <>
            <section className="rounded-[10px] border-[0.5px] border-dockit-border bg-white p-6 text-center sm:p-8">
              <div className="mx-auto grid size-12 place-items-center rounded-full bg-dockit-heading text-[14px] font-medium text-white">
                {preview.developer.initials}
              </div>
              <p className="mt-3 text-[13px] text-dockit-muted">
                Sent by {preview.developer.name}
              </p>
              <h1 className="mt-4 text-[24px] font-medium leading-8 text-dockit-heading">
                Please review and sign the documents below
              </h1>
              <blockquote className="mt-5 rounded-[10px] border-[0.5px] border-dockit-border bg-dockit-secondary p-4 text-left text-[15px] leading-7 text-dockit-muted">
                &quot;{preview.message}&quot;
              </blockquote>
              <p className="mt-3 text-[13px] text-dockit-muted">
                Date sent: {preview.sentAt}
              </p>
            </section>

            <section className="mt-6 space-y-3">
              {preview.project.documents.map((document) => {
                const signed = signing.signedDocumentIds.includes(document.id);

                return (
                  <article
                    key={document.id}
                    className="flex flex-col gap-4 rounded-[10px] border-[0.5px] border-dockit-border bg-white p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-md border-[0.5px] border-dockit-border bg-dockit-secondary text-dockit-blue">
                        <IconFileText className="size-6" stroke={1.8} />
                      </span>
                      <div>
                        <span className="rounded-md bg-dockit-secondary px-2 py-1 text-[12px] font-medium text-dockit-muted">
                          {document.type}
                        </span>
                        <h2 className="mt-2 text-[15px] font-medium text-dockit-heading">
                          {document.name}
                        </h2>
                        <p className="mt-1 text-[13px] leading-5 text-dockit-muted">
                          {document.description}
                        </p>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                      <StatusBadge status={signed ? "Signed" : document.status} />
                      <DockitButton
                        type="button"
                        onClick={() => signing.openSigning(document.id)}
                        disabled={signed}
                      >
                        Preview & Sign
                      </DockitButton>
                    </div>
                  </article>
                );
              })}
            </section>
          </>
        )}
      </main>

      <SigningModal
        document={signing.activeDocument}
        project={preview.project}
        onClose={signing.closeSigning}
        onSubmit={signing.submitSignature}
      />
    </div>
  );
};

export default ClientPreviewView;
