import type {
  BrowserSpeechRecognition,
  BrowserSpeechRecognitionConstructor,
  SpeechRecognitionLanguage,
  SpeechRecognitionService,
  StartSpeechRecognitionOptions,
} from "@/types/dockit/speech";

export const speechRecognitionLanguages: SpeechRecognitionLanguage[] = [
  {
    code: "id-ID",
    label: "Bahasa Indonesia",
  },
  {
    code: "en-US",
    label: "English",
  },
];

const errorMessages: Record<string, string> = {
  "audio-capture":
    "Microphone not found. Check your input device, then try again.",
  "not-allowed":
    "Microphone permission denied. Allow microphone access in browser settings.",
  "no-speech": "No speech detected. Speak clearly, then try again.",
  network: "Speech recognition network error. Check connection, then retry.",
};

const normalizeTranscript = (value: string) => {
  return value.replace(/\s+/g, " ").trim();
};

const getRecognitionConstructor = (): BrowserSpeechRecognitionConstructor | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
};

export class BrowserSpeechRecognitionService
  implements SpeechRecognitionService
{
  private recognition: BrowserSpeechRecognition | null = null;
  private finalTranscript = "";

  isSupported = () => {
    return Boolean(getRecognitionConstructor());
  };

  start = (options: StartSpeechRecognitionOptions) => {
    const Recognition = getRecognitionConstructor();

    if (!Recognition) {
      options.onError("Speech recognition is not supported in this browser.");
      return;
    }

    this.abort();

    if (options.resetTranscript) {
      this.finalTranscript = "";
    }

    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = options.language;

    recognition.onstart = options.onStart;
    recognition.onend = options.onEnd;
    recognition.onerror = (event) => {
      const message =
        errorMessages[event.error] ??
        event.message ??
        "Speech recognition failed. Please try again.";

      options.onError(message);
    };
    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const transcript = result[0]?.transcript ?? "";

        if (result.isFinal) {
          this.finalTranscript = normalizeTranscript(
            `${this.finalTranscript} ${transcript}`,
          );
        } else {
          interimTranscript = normalizeTranscript(
            `${interimTranscript} ${transcript}`,
          );
        }
      }

      const finalTranscript = normalizeTranscript(this.finalTranscript);

      options.onTranscript({
        finalTranscript,
        interimTranscript,
        fullTranscript: normalizeTranscript(
          `${finalTranscript} ${interimTranscript}`,
        ),
      });
    };

    this.recognition = recognition;
    recognition.start();
  };

  stop = () => {
    this.recognition?.stop();
  };

  abort = () => {
    this.recognition?.abort();
    this.recognition = null;
  };
}

export const createSpeechRecognitionService = (): SpeechRecognitionService => {
  return new BrowserSpeechRecognitionService();
};
