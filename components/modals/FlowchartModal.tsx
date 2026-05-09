"use client";

import { useRef } from "react";
import {
  IconDownload,
  IconMinus,
  IconPlus,
  IconRefresh,
  IconScan,
  IconX,
} from "@tabler/icons-react";
import type { PointerEventHandler, WheelEventHandler } from "react";

import DockitButton from "@/components/dockit/DockitButton";
import MermaidDiagram from "@/components/features/MermaidDiagram";
import { useModalBehavior } from "@/hooks/dockit/use-modal-behavior";
import type { FlowchartDiagram } from "@/types/dockit";

type FlowchartModalProps = {
  diagram: FlowchartDiagram | null;
  projectName: string;
  zoom: number;
  position: { x: number; y: number };
  onClose: () => void;
  onFitScreen: () => void;
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
  onReset: () => void;
  onWheel: WheelEventHandler<HTMLDivElement>;
  onZoomIn: () => void;
  onZoomOut: () => void;
};

const FlowchartModal = ({
  diagram,
  projectName,
  zoom,
  position,
  onClose,
  onFitScreen,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onReset,
  onWheel,
  onZoomIn,
  onZoomOut,
}: FlowchartModalProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useModalBehavior({
    isOpen: Boolean(diagram),
    onClose,
    dialogRef,
  });

  if (!diagram) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-dockit-overlay p-3"
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
        className="flex h-[95vh] w-[95vw] flex-col overflow-hidden rounded-[10px] bg-white"
      >
        <div className="flex flex-col gap-3 border-b-[0.5px] border-dockit-border px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[18px] font-medium text-dockit-heading">
              {diagram.name}
            </h2>
            <p className="text-[13px] text-dockit-muted">{projectName}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={onZoomOut} className="toolbar-icon">
              <IconMinus className="size-4" stroke={1.8} />
            </button>
            <span className="w-12 text-center text-[13px] text-dockit-muted">
              {zoom}%
            </span>
            <button type="button" onClick={onZoomIn} className="toolbar-icon">
              <IconPlus className="size-4" stroke={1.8} />
            </button>
            <button type="button" onClick={onFitScreen} className="toolbar-icon">
              <IconScan className="size-4" stroke={1.8} />
            </button>
            <button type="button" onClick={onReset} className="toolbar-icon">
              <IconRefresh className="size-4" stroke={1.8} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <DockitButton type="button" variant="outline" size="sm">
              <IconDownload className="size-4" stroke={1.8} />
              Export PNG
            </DockitButton>
            <DockitButton type="button" variant="outline" size="sm">
              Export SVG
            </DockitButton>
            <button
              type="button"
              onClick={onClose}
              className="toolbar-icon"
              aria-label="Close diagram viewer"
            >
              <IconX className="size-4" stroke={1.8} />
            </button>
          </div>
        </div>

        <div
          className="min-h-0 flex-1 cursor-grab overflow-hidden bg-dockit-secondary p-6 active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onWheel={onWheel}
        >
          <div
            className="flex min-h-full items-center justify-center rounded-[10px] border-[0.5px] border-dockit-border bg-white"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100})`,
            }}
          >
            <MermaidDiagram definition={diagram.definition} className="p-8" />
          </div>
        </div>

        <div className="flex items-center justify-between border-t-[0.5px] border-dockit-border px-4 py-3 text-[13px] text-dockit-muted">
          <span>{diagram.nodeCount} nodes</span>
          <span>Last updated {diagram.lastUpdatedAt}</span>
        </div>
      </div>
    </div>
  );
};

export default FlowchartModal;
