"use client";

import type { ReactNode } from "react";
import { IconArrowLeft, IconArrowRight, IconCircleFilled, IconGripVertical, IconPlus } from "@tabler/icons-react";

import DockitButton from "@/components/dockit/DockitButton";
import AIAssistantPanel from "@/components/features/AIAssistantPanel";
import AppShell from "@/components/layout/AppShell";
import StepIndicator from "@/components/layout/StepIndicator";
import { useCurrentDockitProjectId } from "@/hooks/dockit/use-current-project-id";
import { useProjectDetail } from "@/hooks/dockit/use-projects";
import { usePrdEditor } from "@/hooks/dockit/use-prd-editor";
import type { Project } from "@/types/dockit";

const EditableInput = ({
  value,
  onChange,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => (
  <input
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className={`w-full border-b-[0.5px] border-transparent bg-transparent py-1 text-[15px] leading-7 text-dockit-text outline-none transition-colors duration-150 focus:border-dockit-blue ${className}`}
  />
);

const EditableTextarea = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <textarea
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className="min-h-20 w-full resize-none border-b-[0.5px] border-transparent bg-transparent py-1 text-[15px] leading-7 text-dockit-text outline-none transition-colors duration-150 focus:border-dockit-blue"
  />
);

const SectionHeader = ({ children }: { children: ReactNode }) => (
  <div className="group relative -ml-8 flex items-center justify-between gap-3 pl-8">
    <IconGripVertical className="absolute left-0 size-4 text-dockit-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
    {children}
    <button
      type="button"
      className="rounded-md px-2 text-[18px] text-dockit-muted opacity-0 transition-colors duration-150 hover:bg-dockit-hover group-hover:opacity-100"
      aria-label="Section options"
    >
      ···
    </button>
  </div>
);

export default function PrdBuilderPage() {
  const projectId = useCurrentDockitProjectId();
  const { data: project } = useProjectDetail(projectId ?? "e-commerce-redesign");

  return <PrdBuilderContent key={project?.id ?? "mock"} project={project} />;
}

type PrdBuilderContentProps = {
  project?: Project;
};

const PrdBuilderContent = ({ project }: PrdBuilderContentProps) => {
  const prd = usePrdEditor(project?.prd);
  const projectQuery = project ? `?projectId=${project.id}` : "";

  return (
    <AppShell title="Build your PRD" subtitle="Review and refine the generated requirements.">
      <StepIndicator currentStep={2} />

      <div className="mt-8 grid gap-6 xl:grid-cols-[62fr_38fr]">
        <section className="rounded-[10px] border-[0.5px] border-dockit-border bg-white">
          <div className="flex flex-col gap-3 border-b-[0.5px] border-dockit-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[18px] font-medium text-dockit-heading">
              Product Requirements Document
            </h2>
            <span className="inline-flex items-center gap-2 text-[13px] text-dockit-green">
              <IconCircleFilled className="size-2" />
              Auto-saved
            </span>
          </div>

          <article className="space-y-8 p-5 sm:p-8">
            <section>
              <SectionHeader>
                <h2 className="text-[24px] font-medium text-dockit-heading">
                  Project Overview
                </h2>
              </SectionHeader>
              <div className="mt-3">
                <EditableTextarea
                  value={prd.content.overview}
                  onChange={(value) => prd.updateField("overview", value)}
                />
              </div>
            </section>

            <section>
              <SectionHeader>
                <h3 className="text-[18px] font-medium text-dockit-heading">
                  Goals
                </h3>
              </SectionHeader>
              <div className="mt-3 space-y-2">
                {prd.content.goals.map((goal, index) => (
                  <label key={index} className="flex items-center gap-3">
                    <input type="checkbox" className="size-4 accent-dockit-blue" />
                    <EditableInput
                      value={goal}
                      onChange={(value) =>
                        prd.updateListItem("goals", index, value)
                      }
                    />
                  </label>
                ))}
              </div>
            </section>

            <section>
              <SectionHeader>
                <h3 className="text-[18px] font-medium text-dockit-heading">
                  Scope
                </h3>
              </SectionHeader>
              <div className="mt-3">
                <EditableTextarea
                  value={prd.content.scope}
                  onChange={(value) => prd.updateField("scope", value)}
                />
              </div>
            </section>

            <section>
              <SectionHeader>
                <h3 className="text-[18px] font-medium text-dockit-heading">
                  Key Features
                </h3>
              </SectionHeader>
              <ol className="mt-3 space-y-2">
                {prd.content.features.map((feature, index) => (
                  <li key={index} className="grid grid-cols-[24px_1fr] items-center gap-2">
                    <span className="text-[15px] text-dockit-muted">{index + 1}.</span>
                    <EditableInput
                      value={feature}
                      onChange={(value) =>
                        prd.updateListItem("features", index, value)
                      }
                    />
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={prd.addFeature}
                className="mt-3 inline-flex items-center gap-2 text-[13px] font-medium text-dockit-blue"
              >
                <IconPlus className="size-4" stroke={1.8} />
                Add feature
              </button>
            </section>

            <section>
              <SectionHeader>
                <h3 className="text-[18px] font-medium text-dockit-heading">
                  Tech Stack
                </h3>
              </SectionHeader>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {Object.entries(prd.content.stack).map(([key, value]) => (
                  <label key={key} className="text-[13px] text-dockit-muted">
                    <span className="capitalize">{key}</span>
                    <EditableInput
                      value={value}
                      onChange={(nextValue) =>
                        prd.updateStack(
                          key as keyof typeof prd.content.stack,
                          nextValue,
                        )
                      }
                    />
                  </label>
                ))}
              </div>
            </section>

            <section>
              <SectionHeader>
                <h3 className="text-[18px] font-medium text-dockit-heading">
                  Estimated Timeline
                </h3>
              </SectionHeader>
              <div className="mt-3 grid gap-2">
                <EditableInput value="Week 1-2: Discovery, UX flow, and UI design" onChange={() => undefined} />
                <EditableInput value="Week 3-4: Frontend foundation and backend API" onChange={() => undefined} />
                <EditableInput value="Week 5-8: Integration, testing, deployment" onChange={() => undefined} />
              </div>
            </section>

            <section>
              <SectionHeader>
                <h3 className="text-[18px] font-medium text-dockit-heading">
                  Acceptance Criteria
                </h3>
              </SectionHeader>
              <div className="mt-3 space-y-2">
                {prd.content.acceptanceCriteria.map((criteria, index) => (
                  <label key={index} className="flex items-center gap-3">
                    <input type="checkbox" className="size-4 accent-dockit-blue" />
                    <EditableInput
                      value={criteria}
                      onChange={(value) =>
                        prd.updateListItem("acceptanceCriteria", index, value)
                      }
                    />
                  </label>
                ))}
              </div>
              <button
                type="button"
                onClick={prd.addAcceptanceCriteria}
                className="mt-3 inline-flex items-center gap-2 text-[13px] font-medium text-dockit-blue"
              >
                <IconPlus className="size-4" stroke={1.8} />
                Add criteria
              </button>
            </section>
          </article>
        </section>

        <AIAssistantPanel />
      </div>

      <div className="h-24" />
      <div className="fixed inset-x-0 bottom-0 z-20 border-t-[0.5px] border-dockit-border bg-white px-5 py-4 lg:left-60 lg:px-12">
        <div className="flex items-center justify-between">
          <DockitButton href="/project/new/input" variant="ghost">
            <IconArrowLeft className="size-4" stroke={1.8} />
            Back
          </DockitButton>
          <DockitButton href={`/project/new/flowchart${projectQuery}`}>
            Looks good, next
            <IconArrowRight className="size-4" stroke={1.8} />
          </DockitButton>
        </div>
      </div>
    </AppShell>
  );
};
