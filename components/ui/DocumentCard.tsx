import type { ComponentType } from "react";

import { cn } from "@/lib/utils";

type DocumentCardProps = {
  icon: ComponentType<{ className?: string; stroke?: number }>;
  title: string;
  description: string;
  selected: boolean;
  onToggle: () => void;
};

const DocumentCard = ({
  icon: Icon,
  title,
  description,
  selected,
  onToggle,
}: DocumentCardProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex min-h-24 w-full items-center gap-4 rounded-[10px] border-[0.5px] border-dockit-border bg-white p-4 text-left transition-colors duration-150 ease-in-out hover:bg-dockit-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dockit-blue",
        selected && "border-[1.5px] border-dockit-blue bg-[#F0F7FF]",
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-md border-[0.5px] border-dockit-border-emphasis bg-white text-dockit-blue">
        <Icon className="size-6" stroke={1.7} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium text-dockit-heading">
          {title}
        </span>
        <span className="mt-1 block text-[13px] leading-5 text-dockit-muted">
          {description}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full border-[0.5px] border-dockit-border-emphasis bg-dockit-hover transition-colors duration-150",
          selected && "border-dockit-blue bg-dockit-blue",
        )}
      >
        <span
          className={cn(
            "absolute left-1 top-1 size-4 rounded-full bg-white transition-transform duration-150",
            selected && "translate-x-5",
          )}
        />
      </span>
    </button>
  );
};

export default DocumentCard;
