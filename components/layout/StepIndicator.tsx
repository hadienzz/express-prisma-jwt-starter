import { IconCheck } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

const steps = ["Input", "PRD", "Flowchart", "Documents", "Sign"];

type StepIndicatorProps = {
  currentStep: number;
  completed?: boolean;
};

const StepIndicator = ({ currentStep, completed = false }: StepIndicatorProps) => {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <ol className="mx-auto flex min-w-[520px] max-w-3xl items-start justify-between">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isDone = completed || stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep && !completed;

          return (
            <li key={label} className="relative flex flex-1 flex-col items-center">
              {index < steps.length - 1 && (
                <span
                  className={cn(
                    "absolute left-1/2 top-4 h-px w-full border-t-[0.5px] border-dashed border-dockit-border-emphasis",
                    isDone && "border-solid border-dockit-green",
                  )}
                />
              )}
              <span
                className={cn(
                  "relative z-10 grid size-8 place-items-center rounded-full border-[0.5px] border-dockit-border-emphasis bg-white text-[13px] font-medium text-dockit-muted",
                  isCurrent && "border-dockit-blue bg-dockit-blue text-white",
                  isDone && "border-dockit-green bg-dockit-green text-white",
                )}
              >
                {isDone ? <IconCheck className="size-4" stroke={2} /> : stepNumber}
              </span>
              <span className="mt-2 text-[13px] text-dockit-muted">{label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default StepIndicator;
