"use client";

import { cn } from "@/lib/utils";
import { useMermaidRenderer } from "@/hooks/dockit/use-mermaid-renderer";

type MermaidDiagramProps = {
  definition: string;
  className?: string;
};

const MermaidDiagram = ({ definition, className }: MermaidDiagramProps) => {
  const svg = useMermaidRenderer(definition);

  return (
    <div
      className={cn(
        "mermaid-output flex min-h-64 w-full items-center justify-center text-dockit-muted",
        className,
      )}
      dangerouslySetInnerHTML={{
        __html: svg || "<span>Rendering diagram...</span>",
      }}
    />
  );
};

export default MermaidDiagram;
