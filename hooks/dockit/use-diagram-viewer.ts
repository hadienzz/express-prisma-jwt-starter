"use client";

import { PointerEvent, WheelEvent, useMemo, useState } from "react";

import type { DiagramType, FlowchartDiagram } from "@/types/dockit";

export const useDiagramViewer = (diagrams: FlowchartDiagram[]) => {
  const [activeType, setActiveType] = useState<DiagramType>("User Flow");
  const [modalDiagramId, setModalDiagramId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{
    x: number;
    y: number;
    startX: number;
    startY: number;
  } | null>(null);

  const activeDiagram =
    diagrams.find((diagram) => diagram.type === activeType) ?? diagrams[0];

  const modalDiagram = useMemo(() => {
    return diagrams.find((diagram) => diagram.id === modalDiagramId) ?? null;
  }, [diagrams, modalDiagramId]);

  const zoomIn = () => setZoom((value) => Math.min(value + 10, 160));
  const zoomOut = () => setZoom((value) => Math.max(value - 10, 60));
  const fitScreen = () => {
    setZoom(100);
    setPosition({ x: 0, y: 0 });
  };
  const reset = fitScreen;

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    setZoom((value) =>
      event.deltaY > 0 ? Math.max(value - 5, 60) : Math.min(value + 5, 160),
    );
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragStart({
      x: event.clientX,
      y: event.clientY,
      startX: position.x,
      startY: position.y,
    });
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart) {
      return;
    }

    setPosition({
      x: dragStart.startX + event.clientX - dragStart.x,
      y: dragStart.startY + event.clientY - dragStart.y,
    });
  };

  const onPointerUp = () => {
    setDragStart(null);
  };

  return {
    activeDiagram,
    activeType,
    modalDiagram,
    position,
    zoom,
    fitScreen,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onWheel,
    openModal: setModalDiagramId,
    closeModal: () => setModalDiagramId(null),
    reset,
    setActiveType,
    zoomIn,
    zoomOut,
  };
};
