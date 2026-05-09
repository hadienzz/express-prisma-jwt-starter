"use client";

import { ChangeEvent, DragEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useSpeechToText } from "@/hooks/dockit/use-speech-to-text";
import { saveCurrentDockitProjectId } from "@/hooks/dockit/use-current-project-id";
import { transcribeRecording } from "@/services/dockit/meeting";
import { analyzeMeeting } from "@/services/dockit/projects";
import getBackendErrorMessage from "@/utils/get-backend-error-message";
import {
  getRecordingFileSizeLabel,
  validateRecordingFile,
} from "@/utils/dockit/recording-file";

export type MeetingInputTab = "live" | "upload" | "manual";

export const useMeetingInput = () => {
  const router = useRouter();
  const speech = useSpeechToText();
  const [activeTab, setActiveTab] = useState<MeetingInputTab>("live");
  const [manualText, setManualText] = useState("");
  const [uploadedTranscript, setUploadedTranscript] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    duration: string;
  } | null>(null);

  const getActiveTranscript = () => {
    if (activeTab === "manual") {
      return manualText.trim();
    }

    if (activeTab === "upload") {
      return uploadedTranscript.trim();
    }

    return speech.transcript.trim();
  };

  const transcribeMutation = useMutation({
    mutationKey: ["dockit", "recordings", "transcribe"],
    mutationFn: transcribeRecording,
    onSuccess: (result) => {
      setUploadedTranscript(result.transcript);
    },
    onError: (error) => {
      setUploadedFile(null);
      setUploadedTranscript("");
      setFileError(
        getBackendErrorMessage(error, "Failed to transcribe recording."),
      );
    },
  });

  const analyzeMutation = useMutation({
    mutationKey: ["dockit", "projects", "analyze"],
    mutationFn: () =>
      analyzeMeeting({
        sourceType: activeTab,
        transcript: getActiveTranscript(),
      }),
    onSuccess: (project) => {
      saveCurrentDockitProjectId(project.id);
      router.push(`/project/new/prd?projectId=${project.id}`);
    },
  });

  const isReady = Boolean(
    getActiveTranscript() && !transcribeMutation.isPending,
  );

  const changeTab = (tab: MeetingInputTab) => {
    if (tab !== "live" && speech.isListening) {
      speech.stop();
    }

    setActiveTab(tab);
  };

  const handleFile = (file?: File) => {
    if (!file) {
      return;
    }

    const validationMessage = validateRecordingFile(file);

    if (validationMessage) {
      setUploadedFile(null);
      setFileError(validationMessage);
      return;
    }

    setFileError(null);
    setUploadedTranscript("");
    setUploadedFile({
      name: file.name,
      size: getRecordingFileSizeLabel(file),
      duration: "24:18",
    });
    transcribeMutation.mutate(file);
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files?.[0]);
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    setUploadedTranscript("");
    setFileError(null);
  };

  return {
    activeTab,
    analyzeError: analyzeMutation.error
      ? getBackendErrorMessage(
          analyzeMutation.error,
          "Failed to analyze meeting.",
        )
      : null,
    analyzeMeeting: analyzeMutation.mutate,
    elapsedSeconds: speech.elapsedSeconds,
    fileError,
    formattedElapsed: speech.formattedElapsed,
    isReady,
    isAnalyzing: analyzeMutation.isPending,
    isRecording: speech.isListening,
    isSpeechSupported: speech.isSupported,
    isTranscribingUpload: transcribeMutation.isPending,
    language: speech.language,
    languages: speech.languages,
    manualText,
    speechError: speech.errorMessage,
    speechStatus: speech.status,
    transcript: speech.transcript,
    uploadedFile,
    uploadedTranscript,
    onDrop,
    onFileChange,
    removeUploadedFile,
    setActiveTab: changeTab,
    setLanguage: speech.setLanguage,
    setManualText,
    toggleRecording: speech.toggle,
  };
};
