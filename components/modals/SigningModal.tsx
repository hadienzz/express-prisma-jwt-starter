"use client";

import { useCallback, useRef, useState } from "react";
import { IconX } from "@tabler/icons-react";

import DockitButton from "@/components/dockit/DockitButton";
import Logo from "@/components/dockit/Logo";
import SignaturePad from "@/components/features/SignaturePad";
import { useModalBehavior } from "@/hooks/dockit/use-modal-behavior";
import type { DockitDocument, Project } from "@/types/dockit";

type SigningModalProps = {
  document: DockitDocument | null;
  project: Project;
  onClose: () => void;
  onSubmit: () => void;
};

const SigningModal = ({
  document,
  project,
  onClose,
  onSubmit,
}: SigningModalProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [signatureState, setSignatureState] = useState<{
    documentId: string | null;
    isReady: boolean;
  }>({
    documentId: null,
    isReady: false,
  });
  const handleReadyChange = useCallback((ready: boolean) => {
    setSignatureState({
      documentId: document?.id ?? null,
      isReady: ready,
    });
  }, [document?.id]);

  useModalBehavior({
    isOpen: Boolean(document),
    onClose,
    dialogRef,
  });

  if (!document) {
    return null;
  }

  const isSignatureReady =
    signatureState.documentId === document.id && signatureState.isReady;

  return (
    <div
      className="fixed inset-0 z-[85] flex items-center justify-center bg-dockit-overlay sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className="grid h-screen w-screen overflow-hidden bg-white sm:h-[92vh] sm:w-[90vw] sm:rounded-[10px] lg:grid-cols-[65fr_35fr]"
      >
        <section className="min-h-0 overflow-auto bg-dockit-secondary p-5">
          <article className="mx-auto min-h-[860px] max-w-[680px] border border-dockit-border bg-white px-8 py-10 sm:px-14">
            <header className="flex items-center justify-between">
              <Logo compact />
              <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-dockit-muted">
                Signing Copy
              </span>
            </header>
            <div className="my-6 border-t-[0.5px] border-dockit-border" />
            <h2 className="text-center text-[18px] font-bold uppercase text-dockit-heading">
              {document.name}
            </h2>
            <p className="mt-2 text-center text-[13px] text-dockit-muted">
              Project: {project.name} | Client: {project.client.name}
            </p>
            <div className="mt-10 space-y-6 text-[14px] leading-7 text-dockit-text">
              <p>{document.previewLines[0]}</p>
              <p>{document.previewLines[1]}</p>
              <p>{document.previewLines[2]}</p>
              <p>
                Dengan menandatangani dokumen ini, pihak klien menyatakan telah
                membaca, memahami, dan menyetujui ketentuan yang tercantum.
              </p>
            </div>
            <div className="mt-20 grid grid-cols-2 gap-10 text-center text-[13px]">
              <div>
                <p>Developer</p>
                <div className="mt-12 border-t-[0.5px] border-dockit-heading pt-2">
                  Rizky Pratama
                </div>
              </div>
              <div>
                <p>Client</p>
                <div className="mt-12 border-t-[0.5px] border-dockit-heading pt-2">
                  {project.client.name}
                </div>
              </div>
            </div>
          </article>
        </section>

        <aside className="min-h-0 overflow-auto border-l-[0.5px] border-dockit-border bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[24px] font-medium text-dockit-heading">
                Review & Sign
              </h2>
              <p className="mt-2 text-[13px] leading-5 text-dockit-muted">
                Please review before submitting your signature.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid size-8 place-items-center rounded-md text-dockit-muted transition-colors duration-150 hover:bg-dockit-hover"
              aria-label="Close signing modal"
            >
              <IconX className="size-5" stroke={1.8} />
            </button>
          </div>

          <ul className="mt-6 space-y-3 text-[14px] leading-6 text-dockit-heading">
            <li>• I have reviewed this document.</li>
            <li>• The project scope and terms are correct.</li>
            <li>• I agree to sign electronically.</li>
          </ul>

          <div className="my-6 border-t-[0.5px] border-dockit-border" />

          <SignaturePad key={document.id} onReadyChange={handleReadyChange} />

          <DockitButton
            type="button"
            variant="success"
            className="mt-6 w-full"
            onClick={onSubmit}
            disabled={!isSignatureReady}
          >
            Submit Signature
          </DockitButton>
          <p className="mt-3 text-[12px] leading-5 text-dockit-muted">
            By signing, you agree to the terms stated in this document.
          </p>
        </aside>
      </div>
    </div>
  );
};

export default SigningModal;
