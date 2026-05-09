"use client";

import { useEffect, useId, useState } from "react";

export const useMermaidRenderer = (definition: string) => {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      const mermaid = (await import("mermaid")).default;

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        themeVariables: {
          primaryColor: "#F7F6F3",
          primaryTextColor: "#37352F",
          primaryBorderColor: "#D3D1CB",
          lineColor: "#787774",
          secondaryColor: "#F0F7FF",
          tertiaryColor: "#FFFFFF",
          fontFamily: "Plus Jakarta Sans, sans-serif",
        },
      });

      const result = await mermaid.render(`dockit-${id}`, definition);
console.log(id)
      if (isMounted) {
        setSvg(result.svg);
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [definition, id]);

  return svg;
};
