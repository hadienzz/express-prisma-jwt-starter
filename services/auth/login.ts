import axiosInstance from "@/lib/axios";
import { LoginPayload } from "@/types";

export interface LoginResponse {
  status: string;
  message: string;
  data?: unknown;
}

const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    "/api/auth/login",
    payload,
  );

  return {
    status: data.status,
    message: data.message,
    data: data
  };
};

export default login;
