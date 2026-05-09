"use client";

import {
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

export type SignatureMode = "draw" | "type";

export const useSignaturePad = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<SignatureMode>("draw");
  const [typedName, setTypedName] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ratio = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    const context = canvas.getContext("2d");
    context?.scale(ratio, ratio);
  }, []);

  const getPoint = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    const context = event.currentTarget.getContext("2d");
    const point = getPoint(event);

    event.currentTarget.setPointerCapture(event.pointerId);
    context?.beginPath();
    context?.moveTo(point.x, point.y);
    setIsDrawing(true);
    setHasDrawing(true);
  };

  const draw = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    const context = event.currentTarget.getContext("2d");
    const point = getPoint(event);

    if (!context) {
      return;
    }

    context.lineWidth = 2;
    context.lineCap = "round";
    context.strokeStyle = "#1A1A1A";
    context.lineTo(point.x, point.y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
  };

  return {
    canvasRef,
    hasSignature: mode === "type" ? Boolean(typedName.trim()) : hasDrawing,
    mode,
    typedName,
    clear,
    draw,
    setMode,
    setTypedName,
    startDrawing,
    stopDrawing,
  };
};
