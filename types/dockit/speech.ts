export type SpeechRecognitionLanguageCode = "id-ID" | "en-US";

export type SpeechRecognitionStatus =
  | "idle"
  | "listening"
  | "unsupported"
  | "error";

export interface SpeechRecognitionLanguage {
  code: SpeechRecognitionLanguageCode;
  label: string;
}

export interface SpeechTranscriptUpdate {
  finalTranscript: string;
  interimTranscript: string;
  fullTranscript: string;
}

export interface StartSpeechRecognitionOptions {
  language: SpeechRecognitionLanguageCode;
  resetTranscript: boolean;
  onStart: () => void;
  onTranscript: (transcript: SpeechTranscriptUpdate) => void;
  onEnd: () => void;
  onError: (message: string) => void;
}

export interface SpeechRecognitionService {
  isSupported: () => boolean;
  start: (options: StartSpeechRecognitionOptions) => void;
  stop: () => void;
  abort: () => void;
}

export interface BrowserSpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface BrowserSpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item: (index: number) => BrowserSpeechRecognitionAlternative;
  [index: number]: BrowserSpeechRecognitionAlternative;
}

export interface BrowserSpeechRecognitionResultList {
  readonly length: number;
  item: (index: number) => BrowserSpeechRecognitionResult;
  [index: number]: BrowserSpeechRecognitionResult;
}

export interface BrowserSpeechRecognitionResultEvent {
  readonly resultIndex: number;
  readonly results: BrowserSpeechRecognitionResultList;
}

export interface BrowserSpeechRecognitionErrorEvent {
  readonly error: string;
  readonly message?: string;
}

export interface BrowserSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: BrowserSpeechRecognitionResultEvent) => void) | null;
  onerror: ((event: BrowserSpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

export type BrowserSpeechRecognitionConstructor =
  new () => BrowserSpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: BrowserSpeechRecognitionConstructor;
    webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor;
  }
}
