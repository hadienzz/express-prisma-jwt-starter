"use client";

import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { useSignaturePad } from "@/hooks/dockit/use-signature-pad";

type SignaturePadProps = {
  onReadyChange?: (isReady: boolean) => void;
};

const SignaturePad = ({ onReadyChange }: SignaturePadProps) => {
  const {
    canvasRef,
    clear,
    draw,
    hasSignature,
    mode,
    setMode,
    setTypedName,
    startDrawing,
    stopDrawing,
    typedName,
  } = useSignaturePad();

  useEffect(() => {
    onReadyChange?.(hasSignature);
  }, [hasSignature, onReadyChange]);

  return (
    <div>
      <div className="grid grid-cols-2 rounded-md border-[0.5px] border-dockit-border-emphasis p-1">
        {(["draw", "type"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setMode(option)}
            className={cn(
              "h-8 rounded-md text-[13px] font-medium capitalize text-dockit-muted transition-colors duration-150 hover:bg-dockit-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dockit-blue",
              mode === option && "bg-dockit-hover text-dockit-heading",
            )}
          >
            {option}
          </button>
        ))}
      </div>

      {mode === "draw" ? (
        <div className="mt-4">
          <canvas
            ref={canvasRef}
            className="h-[120px] w-full touch-none rounded-md border-2 border-dashed border-dockit-border-emphasis bg-white"
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
          />
          <div className="mt-2 flex items-center justify-between">
            <p className="text-[12px] text-dockit-muted">Sign here</p>
            <button
              type="button"
              onClick={clear}
              className="text-[12px] font-medium text-dockit-blue transition-colors duration-150 hover:text-[#256FD0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dockit-blue"
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <input
            value={typedName}
            onChange={(event) => setTypedName(event.target.value)}
            placeholder="Type full name"
            className="h-10 w-full rounded-md border-[0.5px] border-dockit-border-emphasis px-3 text-[15px] outline-none transition-colors duration-150 focus:border-dockit-blue"
          />
          <p className="mt-4 min-h-12 rounded-md border-[0.5px] border-dockit-border bg-dockit-secondary px-3 py-2 font-[cursive] text-[28px] text-dockit-heading">
            {typedName || "Signature preview"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
