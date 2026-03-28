import { VerificationType } from "../../../generated/prisma/client";
import prisma from "../../database/prisma";

type CreateUserRecordInput = {
  email: string;
  password_hash: string;
  phone: string;
  full_name?: string;
};

const findRefreshToken = async (token: string) => {
  return prisma.refreshToken.findUnique({
    where: { token },
  });
};

export const revokeRefreshToken = async (token: string) => {
  return prisma.refreshToken.update({
    where: { token },
    data: { revoked_at: new Date() },
  });
};

export const revokeAllUserRefreshTokens = async (userId: string) => {
  return prisma.refreshToken.updateMany({
    where: { user_id: userId, revoked_at: null },
    data: { revoked_at: new Date() },
  });
};

const saveRefreshToken = async (
  userId: string,
  token: string,
  expiresAt: Date,
) => {
  return prisma.refreshToken.create({
    data: {
      user_id: userId,
      token,
      expires_at: expiresAt,
    },
  });
};

const createUser = async (userData: CreateUserRecordInput) => {
  return prisma.user.create({
    data: userData,
  });
};

const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const findUserByPhone = async (phone: string) => {
  return prisma.user.findUnique({
    where: { phone },
  });
};

const createVerificationCode = async (
  userId: string,
  type: VerificationType,
  target: string,
  code: string,
  expiresAt: Date,
) => {
  return prisma.verification.create({
    data: {
      user_id: userId,
      type,
      target,
      code,
      expires_at: expiresAt,
    },
  });
};

const findValidVerificationCode = async (
  userId: string,
  code: string,
  type: VerificationType,
) => {
  return prisma.verification.findFirst({
    where: {
      user_id: userId,
      code,
      type,
      status: "pending",
      expires_at: { gt: new Date() },
    },
    orderBy: { created_at: "desc" },
  });
};

const markVerificationCodeUsed = async (id: string) => {
  return prisma.verification.update({
    where: { id },
    data: {
      status: "used",
      used_at: new Date(),
    },
  });
};

export const authRepository = {
  findRefreshToken,
  createUser,
  findUserByEmail,
  findUserByPhone,
  revokeRefreshToken,
  revokeAllUserRefreshTokens,
  saveRefreshToken,
  createVerificationCode,
  findValidVerificationCode,
  markVerificationCodeUsed,
};
