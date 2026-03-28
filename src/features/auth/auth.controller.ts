import { NextFunction, Request, Response } from "express";

import { authRepository } from "./auth.repository";
import { authService } from "./auth.service";
import { APIResponse } from "../../utils/response.util";
import { clearAuthCookies, setAuthCookies } from "../../utils/token.util";

const registerUser = async (
  req: Request,
  res: Response<APIResponse>,
  next: NextFunction,
) => {
  try {
    const { email, password, phone, full_name } = req.body;

    const result = await authService.registerUser({
      email,
      password,
      phone,
      full_name,
    });

    setAuthCookies(res, result.accessToken, result.refreshToken);

    return res.status(201).json({
      message: "User registered successfully",
      status: "success",
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (
  req: Request,
  res: Response<APIResponse>,
  next: NextFunction,
) => {
  try {
    const { phone, password } = req.body;

    const result = await authService.loginUser({ phone, password });

    setAuthCookies(res, result.accessToken, result.refreshToken);

    return res.status(200).json({
      message: "User logged in successfully",
      status: "success",
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (
  req: Request,
  res: Response<APIResponse>,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      await authRepository.revokeRefreshToken(refreshToken).catch(() => undefined);
    }

    clearAuthCookies(res);

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const me = async (
  req: Request,
  res: Response<APIResponse>,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Current user",
      data: { user: req.user },
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (
  req: Request,
  res: Response<APIResponse>,
  next: NextFunction,
) => {
  try {
    const { user_id, code, type } = req.body;

    const verification = await authService.verifyCode({
      user_id,
      code,
      type,
    });

    res.status(200).json({
      status: "success",
      message: "Verification successful",
      data: { verification },
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  registerUser,
  loginUser,
  logoutUser,
  me,
  verify,
};