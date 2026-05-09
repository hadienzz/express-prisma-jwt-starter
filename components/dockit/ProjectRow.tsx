import Link from "next/link";

import QuickPreviewTooltip from "@/components/ui/QuickPreviewTooltip";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Project } from "@/types/dockit";

type ProjectRowProps = {
  project: Project;
  isPreviewOpen: boolean;
  onPreviewEnter: (projectId: string) => void;
  onPreviewLeave: () => void;
};

const ProjectRow = ({
  project,
  isPreviewOpen,
  onPreviewEnter,
  onPreviewLeave,
}: ProjectRowProps) => {
  const previewDocument = project.documents[0];

  return (
    <tr className="transition-colors duration-150 hover:bg-dockit-secondary">
      <td className="whitespace-nowrap px-4 py-4 text-[14px] font-medium text-dockit-heading">
        {project.name}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-[14px] text-dockit-muted">
        {project.client.name}
      </td>
      <td className="whitespace-nowrap px-4 py-4">
        <StatusBadge status={project.status} />
      </td>
      <td
        className="relative whitespace-nowrap px-4 py-4 text-[14px] text-dockit-muted"
        onMouseEnter={() => onPreviewEnter(project.id)}
        onMouseLeave={onPreviewLeave}
      >
        {project.documentCount} docs
        {isPreviewOpen && previewDocument && (
          <QuickPreviewTooltip document={previewDocument} />
        )}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-[14px] text-dockit-muted">
        {project.lastUpdatedAt}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-[14px]">
        <Link
          href={`/project/${project.id}`}
          className="font-medium text-dockit-blue transition-colors duration-150 hover:text-[#256FD0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dockit-blue"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default ProjectRow;
