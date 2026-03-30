import jwt, { SignOptions } from 'jsonwebtoken';

export interface TokenPayload {
  userId: number;
  iat?: number;
  exp?: number;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function generateAccessToken(userId: number): string {
  const secret = requireEnv('JWT_ACCESS_SECRET');
  const options: SignOptions = {
    expiresIn: (process.env.JWT_ACCESS_EXPIRY ?? '15m') as SignOptions['expiresIn'],
  };
  return jwt.sign({ userId }, secret, options);
}

export function generateRefreshToken(userId: number): string {
  const secret = requireEnv('JWT_REFRESH_SECRET');
  const options: SignOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRY ?? '7d') as SignOptions['expiresIn'],
  };
  return jwt.sign({ userId }, secret, options);
}

export function verifyAccessToken(token: string): TokenPayload {
  const secret = requireEnv('JWT_ACCESS_SECRET');
  const payload = jwt.verify(token, secret) as TokenPayload;
  return payload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  const secret = requireEnv('JWT_REFRESH_SECRET');
  const payload = jwt.verify(token, secret) as TokenPayload;
  return payload;
}
