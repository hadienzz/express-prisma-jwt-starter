import axios from "axios";

const getBackendErrorMessage = (
  error: unknown,
  fallbackMessage = "Terjadi kesalahan.",
) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return fallbackMessage;
};

export default getBackendErrorMessage;
