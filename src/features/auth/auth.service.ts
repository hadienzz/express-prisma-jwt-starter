import bcrypt from "bcrypt";
import { VerificationType } from "../../../generated/prisma/client";

import { APIError } from "../../middleware/error.middleware";
import { CreateUserDTO, LoginInput } from "../../types/auth/types";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.util";
import { authRepository } from "./auth.repository";

const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const issueTokensForUser = async (userId: string, email: string) => {
  const payload = { userId, email };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await authRepository.revokeAllUserRefreshTokens(userId);
  await authRepository.saveRefreshToken(
    userId,
    refreshToken,
    new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
  );

  return { accessToken, refreshToken };
};

const registerUser = async (payload: CreateUserDTO) => {
  const { email, password, phone, full_name } = payload;

  const existingUserByEmail = await authRepository.findUserByEmail(email);

  if (existingUserByEmail) {
    throw new APIError("User with this email already exists", 400);
  }

  const existingUserByPhone = await authRepository.findUserByPhone(phone);

  if (existingUserByPhone) {
    throw new APIError("User with this phone already exists", 400);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await authRepository.createUser({
    email,
    password_hash: passwordHash,
    phone,
    full_name,
  });

  const tokens = await issueTokensForUser(user.id, user.email);
  const { password_hash: _passwordHash, ...safeUser } = user;

  return {
    user: safeUser,
    ...tokens,
  };
};

const loginUser = async (input: LoginInput) => {
  const { phone, password } = input;

  const user = await authRepository.findUserByPhone(phone);

  if (!user) {
    throw new APIError("Invalid phone or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new APIError("Invalid phone or password", 401);
  }

  const tokens = await issueTokensForUser(user.id, user.email);
  const { password_hash: _passwordHash, ...safeUser } = user;

  return {
    user: safeUser,
    ...tokens,
  };
};

const verifyCode = async (input: {
  user_id: string;
  code: string;
  type: VerificationType;
}) => {
  const verification = await authRepository.findValidVerificationCode(
    input.user_id,
    input.code,
    input.type,
  );

  if (!verification) {
    throw new APIError("Invalid or expired verification code", 400);
  }

  const updatedVerification = await authRepository.markVerificationCodeUsed(
    verification.id,
  );

  return updatedVerification;
};

export const authService = {
  registerUser,
  loginUser,
  verifyCode,
};
