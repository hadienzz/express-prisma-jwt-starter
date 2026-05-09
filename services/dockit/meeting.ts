import axiosInstance from "@/lib/axios";

type BackendResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T;
};

type TranscribeRecordingResponse = {
  transcript: string;
  file: {
    name: string;
    mimeType: string;
    size: number;
  };
};

export const transcribeRecording = async (file: File) => {
  const formData = new FormData();
  formData.append("recording", file);

  const { data } = await axiosInstance.post<
    BackendResponse<TranscribeRecordingResponse>
  >("/api/dockit/recordings/transcribe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
};
