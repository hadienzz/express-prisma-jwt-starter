"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconMinus,
  IconPlus,
  IconX,
} from "@tabler/icons-react";

import { useModalBehavior } from "@/hooks/dockit/use-modal-behavior";

type ImageLightboxProps = {
  image: string | null;
  activeIndex: number | null;
  totalCount: number;
  zoom: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
};

const ImageLightbox = ({
  image,
  activeIndex,
  totalCount,
  zoom,
  onClose,
  onNext,
  onPrevious,
  onZoomIn,
  onZoomOut,
}: ImageLightboxProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useModalBehavior({
    isOpen: Boolean(image),
    onClose,
    dialogRef,
  });

  if (!image || activeIndex === null) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(0,0,0,0.82)] p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div ref={dialogRef} role="dialog" aria-modal="true" className="contents">
        <div className="absolute left-1/2 top-4 -translate-x-1/2 text-[13px] text-white">
          {activeIndex + 1} / {totalCount}
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <button type="button" className="lightbox-icon">
            <IconDownload className="size-5" stroke={1.8} />
          </button>
          <button type="button" onClick={onClose} className="lightbox-icon" aria-label="Close image">
            <IconX className="size-5" stroke={1.8} />
          </button>
        </div>
        <button type="button" onClick={onPrevious} className="lightbox-icon absolute left-4 top-1/2 -translate-y-1/2" aria-label="Previous image">
          <IconChevronLeft className="size-6" stroke={1.8} />
        </button>
        <Image
          src={image}
          alt="Project asset"
          width={1200}
          height={800}
          unoptimized
          className="max-h-[85vh] max-w-[90vw] object-contain"
          style={{ transform: `scale(${zoom / 100})` }}
        />
        <button type="button" onClick={onNext} className="lightbox-icon absolute right-4 top-1/2 -translate-y-1/2" aria-label="Next image">
          <IconChevronRight className="size-6" stroke={1.8} />
        </button>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
          <button type="button" onClick={onZoomOut} className="lightbox-icon" aria-label="Zoom out">
            <IconMinus className="size-5" stroke={1.8} />
          </button>
          <button type="button" onClick={onZoomIn} className="lightbox-icon" aria-label="Zoom in">
            <IconPlus className="size-5" stroke={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
