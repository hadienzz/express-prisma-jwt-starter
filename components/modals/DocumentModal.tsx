"use client";

import { useRef } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconEdit,
  IconLink,
  IconMail,
  IconMinus,
  IconPlus,
  IconScan,
  IconX,
} from "@tabler/icons-react";

import DockitButton from "@/components/dockit/DockitButton";
import Logo from "@/components/dockit/Logo";
import StatusBadge from "@/components/ui/StatusBadge";
import { useModalBehavior } from "@/hooks/dockit/use-modal-behavior";
import type { DockitDocument, Project } from "@/types/dockit";

type DocumentModalProps = {
  document: DockitDocument | null;
  project: Project;
  isOpen: boolean;
  activeIndex: number;
  totalCount: number;
  zoom: number;
  onClose: () => void;
  onFitWidth: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
};

const DocumentModal = ({
  document,
  project,
  isOpen,
  activeIndex,
  totalCount,
  zoom,
  onClose,
  onFitWidth,
  onNext,
  onPrevious,
  onZoomIn,
  onZoomOut,
}: DocumentModalProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useModalBehavior({
    isOpen,
    onClose,
    dialogRef,
  });

  if (!isOpen || !document) {
    return null;
  }

  const isSigned = document.status === "Signed";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-dockit-overlay p-0 opacity-100 transition-opacity duration-150 sm:p-4"
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
        className="grid h-screen w-screen scale-100 grid-rows-[1fr_auto] overflow-hidden bg-white transition-transform duration-150 sm:h-[95vh] sm:w-[90vw] sm:rounded-[10px] lg:grid-cols-[65fr_35fr] lg:grid-rows-1"
      >
        <section className="flex min-h-0 flex-col bg-dockit-secondary">
          <div className="flex items-center justify-between border-b-[0.5px] border-dockit-border bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onZoomOut}
                className="grid size-8 place-items-center rounded-md border-[0.5px] border-dockit-border-emphasis text-dockit-muted transition-colors duration-150 hover:bg-dockit-hover"
                aria-label="Zoom out"
              >
                <IconMinus className="size-4" stroke={1.8} />
              </button>
              <span className="w-14 text-center text-[13px] text-dockit-muted">
                {zoom}%
              </span>
              <button
                type="button"
                onClick={onZoomIn}
                className="grid size-8 place-items-center rounded-md border-[0.5px] border-dockit-border-emphasis text-dockit-muted transition-colors duration-150 hover:bg-dockit-hover"
                aria-label="Zoom in"
              >
                <IconPlus className="size-4" stroke={1.8} />
              </button>
              <button
                type="button"
                onClick={onFitWidth}
                className="grid size-8 place-items-center rounded-md border-[0.5px] border-dockit-border-emphasis text-dockit-muted transition-colors duration-150 hover:bg-dockit-hover"
                aria-label="Fit width"
              >
                <IconScan className="size-4" stroke={1.8} />
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close document preview"
              className="grid size-8 place-items-center rounded-md text-dockit-muted transition-colors duration-150 hover:bg-dockit-hover hover:text-dockit-heading"
            >
              <IconX className="size-5" stroke={1.8} />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-auto p-6">
            <article
              className="mx-auto min-h-[900px] max-w-[680px] origin-top rounded-sm border border-dockit-border bg-white px-8 py-10 text-dockit-text sm:px-14 sm:py-12"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <header className="flex items-center justify-between">
                <Logo compact />
                <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-dockit-muted">
                  Official Document
                </p>
              </header>
              <div className="my-6 border-t-[0.5px] border-dockit-border" />
              <h2 className="text-center text-[18px] font-bold uppercase leading-7 text-dockit-heading">
                {document.type === "BAST"
                  ? "Berita Acara Serah Terima"
                  : document.name}
              </h2>
              <p className="mt-2 text-center text-[13px] leading-5 text-dockit-muted">
                Project: {project.name} | Client: {project.client.name} | Date:{" "}
                {document.generatedAt}
              </p>

              <section className="mt-10 space-y-6 text-[14px] leading-7">
                <div>
                  <h3 className="text-[13px] font-bold uppercase text-dockit-heading">
                    Para Pihak
                  </h3>
                  <p className="mt-2">
                    Dokumen ini dibuat antara Rizky Pratama sebagai developer dan{" "}
                    {project.client.name} sebagai klien untuk proyek {project.name}.
                  </p>
                </div>
                <div>
                  <h3 className="text-[13px] font-bold uppercase text-dockit-heading">
                    Ruang Lingkup
                  </h3>
                  <p className="mt-2">{project.prd.scope}</p>
                </div>
                <div>
                  <h3 className="text-[13px] font-bold uppercase text-dockit-heading">
                    Ketentuan Utama
                  </h3>
                  <p className="mt-2">
                    Pekerjaan mengikuti PRD yang telah disetujui, dengan timeline{" "}
                    {project.prd.timeline} dan nilai proyek {project.prd.budget}.
                    Perubahan scope wajib disepakati secara tertulis.
                  </p>
                </div>
              </section>

              <div className="mt-16 grid grid-cols-2 gap-10 text-center text-[13px] text-dockit-heading">
                <div>
                  <p>Developer</p>
                  <div className="mt-12 border-t-[0.5px] border-dockit-heading pt-2">
                    Rizky Pratama
                  </div>
                  <p className="mt-1 text-dockit-muted">Date: __________</p>
                </div>
                <div>
                  <p>Client</p>
                  <div className="mt-12 border-t-[0.5px] border-dockit-heading pt-2">
                    {project.client.name}
                  </div>
                  <p className="mt-1 text-dockit-muted">Date: __________</p>
                </div>
              </div>

              <p className="mt-20 text-center text-[12px] text-dockit-muted">
                Page 1 of 1
              </p>
            </article>
          </div>

          <div className="flex items-center justify-center gap-4 border-t-[0.5px] border-dockit-border bg-white p-3">
            <button
              type="button"
              onClick={onPrevious}
              className="grid size-9 place-items-center rounded-md border-[0.5px] border-dockit-border-emphasis transition-colors duration-150 hover:bg-dockit-hover"
              aria-label="Previous document"
            >
              <IconChevronLeft className="size-5" stroke={1.8} />
            </button>
            <p className="text-[13px] text-dockit-muted">
              Document {activeIndex + 1} of {totalCount}
            </p>
            <button
              type="button"
              onClick={onNext}
              className="grid size-9 place-items-center rounded-md border-[0.5px] border-dockit-border-emphasis transition-colors duration-150 hover:bg-dockit-hover"
              aria-label="Next document"
            >
              <IconChevronRight className="size-5" stroke={1.8} />
            </button>
          </div>
        </section>

        <aside className="max-h-[45vh] overflow-auto border-t-[0.5px] border-dockit-border bg-white p-5 lg:max-h-none lg:border-l-[0.5px] lg:border-t-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[18px] font-medium leading-6 text-dockit-heading">
                {document.name}
              </h2>
              <div className="mt-2">
                <StatusBadge status={document.type === "BAST" ? "Ready" : document.status} />
              </div>
            </div>
            <StatusBadge status={document.status} />
          </div>

          <div className="my-5 border-t-[0.5px] border-dockit-border" />

          <div className="space-y-2">
            <DockitButton className="w-full justify-start" type="button">
              <IconDownload className="size-4" stroke={1.8} />
              Download PDF
            </DockitButton>
            <DockitButton className="w-full justify-start" type="button" variant="outline">
              <IconLink className="size-4" stroke={1.8} />
              Copy Share Link
            </DockitButton>
            <DockitButton className="w-full justify-start" type="button" variant="outline">
              <IconMail className="size-4" stroke={1.8} />
              Send to Client
            </DockitButton>
            <DockitButton className="w-full justify-start" type="button" variant="outline">
              <IconEdit className="size-4" stroke={1.8} />
              Edit Document
            </DockitButton>
          </div>

          <div className="my-5 border-t-[0.5px] border-dockit-border" />

          <dl className="space-y-3 text-[13px]">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-dockit-muted">Generated</dt>
              <dd className="text-dockit-heading">{document.generatedAt}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-dockit-muted">Last modified</dt>
              <dd className="text-dockit-heading">{document.lastModifiedAt}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-dockit-muted">Signed by</dt>
              <dd className="text-right text-dockit-heading">
                {document.signedBy
                  ? `${document.signedBy}, ${document.signedAt}`
                  : "Not yet"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-dockit-muted">File size</dt>
              <dd className="text-dockit-heading">{document.fileSize}</dd>
            </div>
          </dl>

          <div className="my-5 border-t-[0.5px] border-dockit-border" />

          <div className={isSigned ? "rounded-[10px] bg-[#E8F6F3] p-4" : "rounded-[10px] bg-[#FFF3E6] p-4"}>
            <p className={isSigned ? "text-[14px] font-medium text-dockit-green" : "text-[14px] font-medium text-dockit-amber"}>
              {isSigned
                ? `Signed by ${document.signedBy} on ${document.signedAt}`
                : "Awaiting client signature"}
            </p>
            {!isSigned && (
              <button
                type="button"
                className="mt-2 text-[13px] font-medium text-dockit-amber underline-offset-4 hover:underline"
              >
                Send reminder
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DocumentModal;
