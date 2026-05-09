"use client";

import { IconCircleFilled } from "@tabler/icons-react";

import { useAiAssistant } from "@/hooks/dockit/use-ai-assistant";
import { cn } from "@/lib/utils";

const AIAssistantPanel = () => {
  const assistant = useAiAssistant();

  return (
    <aside className="flex h-full min-h-[620px] flex-col rounded-[10px] border-[0.5px] border-dockit-border bg-white">
      <div className="flex items-center justify-between border-b-[0.5px] border-dockit-border p-4">
        <h2 className="text-[18px] font-medium text-dockit-heading">
          AI Assistant
        </h2>
        <span className="inline-flex items-center gap-2 text-[13px] text-dockit-blue">
          <IconCircleFilled className="size-2" />
          active
        </span>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div className="rounded-[10px] border-l-2 border-dockit-amber bg-[#FFF8EE] p-4">
          <p className="text-[15px] font-medium leading-6 text-dockit-heading">
            {assistant.currentQuestion.question}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {assistant.currentQuestion.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => assistant.chooseAnswer(option)}
                className={cn(
                  "h-8 rounded-md border-[0.5px] border-dockit-border-emphasis px-3 text-[13px] font-medium text-dockit-heading transition-colors duration-150 hover:bg-dockit-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dockit-blue",
                  assistant.selectedAnswer === option &&
                    "border-dockit-blue bg-dockit-blue text-white hover:bg-dockit-blue",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {Object.entries(assistant.answers).map(([questionId, answer]) => (
          <div
            key={questionId}
            className="rounded-[10px] border-[0.5px] border-dockit-border bg-dockit-secondary p-3 text-[13px] leading-5 text-dockit-muted"
          >
            Noted: <span className="font-medium text-dockit-heading">{answer}</span>
          </div>
        ))}

        <div className="space-y-3">
          {assistant.upcomingQuestions.map((question) => (
            <p
              key={question}
              className="rounded-[10px] border-[0.5px] border-dockit-border bg-dockit-secondary p-3 text-[13px] leading-5 text-dockit-muted opacity-70"
            >
              {question}
            </p>
          ))}
        </div>
      </div>

      <div className="border-t-[0.5px] border-dockit-border p-4">
        <button
          type="button"
          className="text-[13px] font-medium text-dockit-muted transition-colors duration-150 hover:text-dockit-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dockit-blue"
        >
          Skip remaining questions
        </button>
      </div>
    </aside>
  );
};

export default AIAssistantPanel;
