import axiosInstance from "@/lib/axios";
import { RegisterPayload } from "@/types";

export interface LogoutResponse {
  status: string;
  message: string;
  data?: unknown;
}

const register = async (payload: RegisterPayload): Promise<LogoutResponse> => {
  const { data } = await axiosInstance.post<LogoutResponse>(
    "/api/auth/logout",
    payload,
  );

  return {
    status: data.status,
    message: data.message,
    data: data
  };
};

export default register;
