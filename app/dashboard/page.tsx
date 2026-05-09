"use client";

import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";

import DockitButton from "@/components/dockit/DockitButton";
import ProjectRow from "@/components/dockit/ProjectRow";
import AppShell from "@/components/layout/AppShell";
import MetricCard from "@/components/ui/MetricCard";
import { useDashboardSummary } from "@/hooks/dockit/use-projects";
import { useQuickPreview } from "@/hooks/dockit/use-quick-preview";

export default function DashboardPage() {
  const { data } = useDashboardSummary();
  const preview = useQuickPreview();

  const stats = data?.stats ?? {
    activeProjects: 0,
    docsGenerated: 0,
    pendingSignatures: 0,
    completedProjects: 0,
  };

  return (
    <AppShell
      title={
        <>
          Good morning <span aria-hidden="true">👋</span>{" "}
          {data?.developer.name.split(" ")[0] ?? "Rizky"}
        </>
      }
      subtitle="Here's what's happening with your projects"
      action={
        <DockitButton href="/project/new/input">
          <IconPlus className="size-4" stroke={1.8} />
          New Project
        </DockitButton>
      }
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active Projects" value={stats.activeProjects} />
        <MetricCard label="Docs Generated" value={stats.docsGenerated} />
        <MetricCard label="Pending Signatures" value={stats.pendingSignatures} />
        <MetricCard label="Completed Projects" value={stats.completedProjects} />
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-[24px] font-medium text-dockit-heading">
            Recent Projects
          </h2>
          <Link
            href="/project/e-commerce-redesign"
            className="inline-flex items-center text-[14px] font-medium text-dockit-blue transition-colors duration-150 hover:text-[#256FD0]"
          >
            View all →
          </Link>
        </div>

        <div className="overflow-x-auto rounded-[10px] border-[0.5px] border-dockit-border bg-white">
          <table className="min-w-[880px] w-full border-collapse text-left">
            <thead className="bg-dockit-secondary">
              <tr className="border-b-[0.5px] border-dockit-border">
                {[
                  "Project Name",
                  "Client",
                  "Status",
                  "Documents",
                  "Last Updated",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.06em] text-dockit-muted"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(data?.recentProjects ?? []).map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  isPreviewOpen={preview.activeId === project.id}
                  onPreviewEnter={preview.show}
                  onPreviewLeave={preview.hide}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
