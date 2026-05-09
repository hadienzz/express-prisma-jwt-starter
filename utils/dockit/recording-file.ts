const maxRecordingFileSize = 100 * 1024 * 1024;

const supportedRecordingExtensions = ["mp3", "mp4", "webm", "m4a"];

export const getRecordingFileSizeLabel = (file: File) => {
  return `${(file.size / 1024 / 1024).toFixed(1)} MB`;
};

export const validateRecordingFile = (file: File) => {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (!supportedRecordingExtensions.includes(extension)) {
    return "Unsupported file format. Use MP3, MP4, WEBM, or M4A.";
  }

  if (file.size > maxRecordingFileSize) {
    return "File too large. Maximum recording size is 100MB.";
  }

  return null;
};
