import { IconCircleCheck, IconClock, IconDots, IconProgress } from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import type { DocumentStatus, ProjectStatus } from "@/types/dockit";

type StatusBadgeProps = {
  status: DocumentStatus | ProjectStatus | "Ready";
  className?: string;
};

const statusStyles: Record<string, string> = {
  Draft: "bg-[#EFEEEB] text-dockit-muted",
  "In Progress": "bg-[#EAF3FF] text-dockit-blue",
  "Pending Signature": "bg-[#FFF3E6] text-dockit-amber",
  Completed: "bg-[#E8F6F3] text-dockit-green",
  Ready: "bg-[#EAF3FF] text-dockit-blue",
  Signed: "bg-[#E8F6F3] text-dockit-green",
};

const statusIcons: Record<string, typeof IconDots> = {
  Draft: IconDots,
  "In Progress": IconProgress,
  "Pending Signature": IconClock,
  Completed: IconCircleCheck,
  Ready: IconCircleCheck,
  Signed: IconCircleCheck,
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const Icon = statusIcons[status] ?? IconDots;

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-md px-2 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      <Icon className="size-3.5" stroke={1.8} />
      {status}
    </span>
  );
};

export default StatusBadge;
