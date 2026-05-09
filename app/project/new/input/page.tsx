"use client";

import {
  IconArrowLeft,
  IconArrowRight,
  IconFileUpload,
  IconKeyboard,
  IconMicrophone,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";

import DockitButton from "@/components/dockit/DockitButton";
import AppShell from "@/components/layout/AppShell";
import StepIndicator from "@/components/layout/StepIndicator";
import { useMeetingInput } from "@/hooks/dockit/use-meeting-input";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "live", label: "Live Listen", icon: IconMicrophone },
  { id: "upload", label: "Upload Recording", icon: IconUpload },
  { id: "manual", label: "Type Manually", icon: IconKeyboard },
] as const;

export default function MeetingInputPage() {
  const meeting = useMeetingInput();

  return (
    <AppShell
      title="Tell us about your client meeting"
      subtitle="Choose how you want to input the meeting content below."
    >
      <StepIndicator currentStep={1} />

      <div className="mt-8 rounded-[10px] border-[0.5px] border-dockit-border bg-white">
        <div className="flex flex-wrap border-b-[0.5px] border-dockit-border px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => meeting.setActiveTab(tab.id)}
              className={cn(
                "dockit-tab inline-flex items-center gap-2",
                meeting.activeTab === tab.id && "dockit-tab-active",
              )}
            >
              <tab.icon className="size-4" stroke={1.8} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-8">
          {meeting.activeTab === "live" && (
            <section>
              <p className="text-[15px] leading-7 text-dockit-muted">
                Click the button below and start speaking. We&apos;ll transcribe in
                real time.
              </p>
              <div className="mt-8 flex flex-col items-center">
                <button
                  type="button"
                  onClick={meeting.toggleRecording}
                  disabled={meeting.speechStatus === "unsupported"}
                  className={cn(
                    "grid size-20 place-items-center rounded-full border-[0.5px] border-transparent bg-dockit-blue text-white transition-colors duration-150 hover:bg-[#256FD0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dockit-blue disabled:opacity-50",
                    meeting.isRecording && "bg-dockit-danger hover:bg-[#C93636]",
                  )}
                  aria-label="Toggle recording"
                >
                  <IconMicrophone className="size-8" stroke={1.8} />
                </button>
                <p className="mt-4 text-[15px] text-dockit-heading">
                  {meeting.isRecording && `Recording... ${meeting.formattedElapsed}`}
                  {!meeting.isRecording &&
                    meeting.speechStatus !== "unsupported" &&
                    "Click to start"}
                  {meeting.speechStatus === "unsupported" &&
                    "Speech recognition unavailable"}
                </p>
                {meeting.isRecording && (
                  <div className="mt-6 flex h-12 items-end gap-1">
                    {Array.from({ length: 22 }).map((_, index) => (
                      <span
                        key={index}
                        className="wave-bar w-1.5 rounded-full bg-dockit-blue"
                        style={{ animationDelay: `${index * 45}ms` }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <textarea
                readOnly
                value={meeting.transcript}
                placeholder="Transcript will appear here..."
                className="mt-8 h-[200px] w-full resize-none rounded-[10px] border-[0.5px] border-dockit-border-emphasis bg-white p-4 text-[15px] leading-7 text-dockit-text outline-none"
              />
              {meeting.speechError && (
                <p className="mt-3 rounded-md border-[0.5px] border-dockit-danger bg-[#FFF1F1] px-3 py-2 text-[13px] leading-5 text-dockit-danger">
                  {meeting.speechError}
                </p>
              )}
              <label className="mt-4 block max-w-xs">
                <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.06em] text-dockit-muted">
                  Language
                </span>
                <select
                  value={meeting.language}
                  onChange={(event) =>
                    meeting.setLanguage(
                      event.target.value as typeof meeting.language,
                    )
                  }
                  className="dockit-field h-10 w-full"
                >
                  {meeting.languages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.label}
                    </option>
                  ))}
                </select>
              </label>
            </section>
          )}

          {meeting.activeTab === "upload" && (
            <section>
              <label
                onDrop={meeting.onDrop}
                onDragOver={(event) => event.preventDefault()}
                className="flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-dockit-border-emphasis text-center transition-colors duration-150 hover:bg-dockit-secondary"
              >
                <input
                  type="file"
                  accept=".mp3,.mp4,.webm,.m4a,audio/*,video/*"
                  className="sr-only"
                  onChange={meeting.onFileChange}
                />
                <IconFileUpload className="size-8 text-dockit-muted" stroke={1.8} />
                <p className="mt-3 text-[15px] font-medium text-dockit-heading">
                  Drag your recording here
                </p>
                <p className="mt-1 text-[14px] text-dockit-muted">
                  or <span className="text-dockit-blue">browse files</span>
                </p>
                <p className="mt-4 text-[13px] text-dockit-muted">
                  MP3, MP4, WEBM, M4A - max 100MB
                </p>
              </label>

              {meeting.uploadedFile && (
                <div className="mt-4 flex flex-col gap-3 rounded-[10px] border-[0.5px] border-dockit-border bg-dockit-secondary p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[15px] font-medium text-dockit-heading">
                      {meeting.uploadedFile.name}
                    </p>
                    <p className="mt-1 text-[13px] text-dockit-muted">
                      {meeting.uploadedFile.size} &middot;{" "}
                      {meeting.uploadedFile.duration}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={meeting.removeUploadedFile}
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-dockit-danger"
                  >
                    <IconTrash className="size-4" stroke={1.8} />
                    Remove
                  </button>
                </div>
              )}
              {meeting.isTranscribingUpload && (
                <p className="mt-3 rounded-md border-[0.5px] border-dockit-blue bg-[#F0F7FF] px-3 py-2 text-[13px] leading-5 text-dockit-blue">
                  Transcribing recording with AI...
                </p>
              )}
              {meeting.uploadedTranscript && (
                <textarea
                  readOnly
                  value={meeting.uploadedTranscript}
                  className="mt-4 h-[180px] w-full resize-none rounded-[10px] border-[0.5px] border-dockit-border-emphasis bg-white p-4 text-[15px] leading-7 text-dockit-text outline-none"
                />
              )}
              {meeting.fileError && (
                <p className="mt-3 rounded-md border-[0.5px] border-dockit-danger bg-[#FFF1F1] px-3 py-2 text-[13px] leading-5 text-dockit-danger">
                  {meeting.fileError}
                </p>
              )}
            </section>
          )}

          {meeting.activeTab === "manual" && (
            <section>
              <label>
                <span className="mb-3 block text-[15px] font-medium text-dockit-heading">
                  Paste or type what was discussed in the meeting
                </span>
                <textarea
                  value={meeting.manualText}
                  onChange={(event) =>
                    meeting.setManualText(event.target.value.slice(0, 5000))
                  }
                  placeholder="e.g. Client wants an e-commerce website with product catalog, shopping cart, payment gateway via Midtrans, and admin dashboard. Timeline: 2 months. Budget: Rp 15.000.000..."
                  className="h-[320px] w-full resize-none rounded-[10px] border-[0.5px] border-dockit-border-emphasis p-4 text-[15px] leading-7 text-dockit-text outline-none transition-colors duration-150 focus:border-dockit-blue"
                />
              </label>
              <p className="mt-2 text-right text-[13px] text-dockit-muted">
                {meeting.manualText.length} / 5000
              </p>
            </section>
          )}
        </div>
      </div>

      <div className="h-24" />
      <div className="fixed inset-x-0 bottom-0 z-20 border-t-[0.5px] border-dockit-border bg-white px-5 py-4 lg:left-60 lg:px-12">
        <div className="flex items-center justify-between">
          <DockitButton href="/dashboard" variant="ghost">
            <IconArrowLeft className="size-4" stroke={1.8} />
            Back
          </DockitButton>
          <div className="flex flex-col items-end gap-2">
            {meeting.analyzeError && (
              <p className="max-w-sm text-right text-[13px] text-dockit-danger">
                {meeting.analyzeError}
              </p>
            )}
            <DockitButton
              type="button"
              onClick={() => meeting.analyzeMeeting()}
              disabled={!meeting.isReady || meeting.isAnalyzing}
            >
              {meeting.isAnalyzing ? "Analyzing..." : "Analyze with AI"}
            <IconArrowRight className="size-4" stroke={1.8} />
            </DockitButton>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
