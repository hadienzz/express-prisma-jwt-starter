import z from "zod";
import { VerificationType } from "../../../generated/prisma/client";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
  phone: z.string().min(8).max(20),
  full_name: z.string().trim().min(1).max(120).optional(),
});

export const loginSchema = z.object({
  phone: z.string().min(8).max(20),
  password: z.string().min(6).max(100),
});

export const verifySchema = z.object({
  user_id: z.string().uuid(),
  code: z.string().trim().min(4).max(10),
  type: z.nativeEnum(VerificationType),
});
