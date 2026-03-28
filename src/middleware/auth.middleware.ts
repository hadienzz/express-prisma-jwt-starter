import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { authRepository } from "../features/auth/auth.repository";
import { APIResponse } from "../utils/response.util";
import {
  generateAccessToken,
  setAccessTokenCookie,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/token.util";
import { APIError } from "./error.middleware";
import prisma from "../database/prisma";

declare module "express-serve-static-core" {
  export interface Request {
    user?: {
      id: string;
      email: string;
      phone: string;
    };
  }
}

export const verifyToken = async (
  req: Request,
  res: Response<APIResponse>,
  next: NextFunction,
) => {
  try {
    const accessToken =
      req.cookies?.accessToken ??
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7)
        : undefined);

    if (accessToken) {
      try {
        const accessPayload = verifyAccessToken(accessToken);

        const user = await prisma.user.findUnique({
          where: { id: accessPayload.userId },
          select: {
            id: true,
            email: true,
            phone: true,
          },
        });

        if (!user) {
          throw new APIError("Unauthorized", 401);
        }

        req.user = user;
        return next();
      } catch (error) {
        if (error instanceof APIError) {
          throw error;
        }

        if (
          !(error instanceof jwt.TokenExpiredError) &&
          !(error instanceof jwt.JsonWebTokenError)
        ) {
          throw error;
        }
      }
    }

    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new APIError("Unauthorized", 401);
    }

    const refreshPayload = verifyRefreshToken(refreshToken);
    const storedToken = await authRepository.findRefreshToken(refreshToken);

    if (
      !storedToken ||
      storedToken.revoked_at !== null ||
      storedToken.expires_at <= new Date()
    ) {
      throw new APIError("Unauthorized", 401);
    }

    const newAccessToken = generateAccessToken({
      userId: refreshPayload.userId,
      email: refreshPayload.email,
    });

    setAccessTokenCookie(res, newAccessToken);

    const user = await prisma.user.findUnique({
      where: { id: refreshPayload.userId },
      select: {
        id: true,
        email: true,
        phone: true,
      },
    });

    if (!user) {
      throw new APIError("Unauthorized", 401);
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof APIError) {
      return next(error);
    }

    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      return next(new APIError("Unauthorized", 401));
    }

    console.error("Verify token error:", error);

    return next(new APIError("Authentication failed", 500));
  }
};
