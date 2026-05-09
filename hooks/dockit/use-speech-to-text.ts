"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  createSpeechRecognitionService,
  speechRecognitionLanguages,
} from "@/services/dockit/speech-recognition";
import type {
  SpeechRecognitionLanguageCode,
  SpeechRecognitionService,
  SpeechRecognitionStatus,
} from "@/types/dockit/speech";

const formatElapsedTime = (elapsedSeconds: number) => {
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const useSpeechToText = () => {
  const serviceRef = useRef<SpeechRecognitionService | null>(null);
  const shouldKeepListeningRef = useRef(false);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [status, setStatus] = useState<SpeechRecognitionStatus>("idle");
  const [language, setLanguage] =
    useState<SpeechRecognitionLanguageCode>("id-ID");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const service = createSpeechRecognitionService();
    serviceRef.current = service;

    return () => {
      shouldKeepListeningRef.current = false;

      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }

      service.abort();
    };
  }, []);

  useEffect(() => {
    if (status !== "listening") {
      return;
    }

    const timer = setInterval(() => {
      setElapsedSeconds((value) => value + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  const start = useCallback(
    (resetTranscript = true) => {
      const service = serviceRef.current;

      if (!service || !service.isSupported()) {
        setStatus("unsupported");
        setErrorMessage(
          "Speech recognition is not supported in this browser. Use Chrome or Edge, or type manually.",
        );
        return;
      }

      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }

      shouldKeepListeningRef.current = true;
      setErrorMessage(null);
      setInterimTranscript("");

      if (resetTranscript) {
        setFinalTranscript("");
        setElapsedSeconds(0);
      }

      const activeService = service;

      function runRecognition(nextResetTranscript: boolean) {
        activeService.start({
          language,
          resetTranscript: nextResetTranscript,
          onStart: () => setStatus("listening"),
          onTranscript: (transcript) => {
            setFinalTranscript(transcript.finalTranscript);
            setInterimTranscript(transcript.interimTranscript);
          },
          onError: (message) => {
            shouldKeepListeningRef.current = false;
            setStatus("error");
            setErrorMessage(message);
          },
          onEnd: () => {
            if (!shouldKeepListeningRef.current) {
              setStatus("idle");
              return;
            }

            restartTimerRef.current = setTimeout(() => {
              runRecognition(false);
            }, 250);
          },
        });
      }

      runRecognition(resetTranscript);
    },
    [language],
  );

  const stop = useCallback(() => {
    shouldKeepListeningRef.current = false;

    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
    }

    serviceRef.current?.stop();
    setInterimTranscript("");
    setStatus((current) => (current === "unsupported" ? current : "idle"));
  }, []);

  const reset = useCallback(() => {
    setFinalTranscript("");
    setInterimTranscript("");
    setErrorMessage(null);
    setElapsedSeconds(0);
  }, []);

  const toggle = useCallback(() => {
    if (status === "listening") {
      stop();
      return;
    }

    start(true);
  }, [start, status, stop]);

  const transcript = useMemo(() => {
    return [finalTranscript, interimTranscript].filter(Boolean).join(" ").trim();
  }, [finalTranscript, interimTranscript]);

  return {
    elapsedSeconds,
    errorMessage,
    formattedElapsed: formatElapsedTime(elapsedSeconds),
    isListening: status === "listening",
    isSupported: status !== "unsupported",
    language,
    languages: speechRecognitionLanguages,
    status,
    transcript,
    finalTranscript,
    interimTranscript,
    reset,
    setLanguage,
    start,
    stop,
    toggle,
  };
};
