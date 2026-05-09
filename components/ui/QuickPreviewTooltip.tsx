import StatusBadge from "@/components/ui/StatusBadge";
import type { DockitDocument } from "@/types/dockit";

type QuickPreviewTooltipProps = {
  document: DockitDocument;
};

const QuickPreviewTooltip = ({ document }: QuickPreviewTooltipProps) => {
  return (
    <div className="absolute left-full top-1/2 z-20 ml-3 w-60 -translate-y-1/2 rounded-[10px] border-[0.5px] border-dockit-border-emphasis bg-white p-3 opacity-100 transition-opacity duration-150 ease-in-out">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-medium text-dockit-heading">
          {document.type}
        </p>
        <StatusBadge status={document.status} />
      </div>
      <div className="mt-2 space-y-1 text-[12px] leading-5 text-dockit-muted">
        {document.previewLines.slice(0, 3).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default QuickPreviewTooltip;
