import axiosInstance from "@/lib/axios";

export interface LogoutResponse {
  status: string;
  message: string;
  data?: unknown;
}

const logout = async (): Promise<LogoutResponse> => {
  const { data } = await axiosInstance.post<LogoutResponse>(
    "/api/auth/logout",
  );

  return {
    status: data.status,
    message: data.message,
    data: data
  };
};

export default logout;
