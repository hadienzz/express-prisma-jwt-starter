const getEnvKey = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable not found: ${key}`);
  }
  return value;
};

export const envConfig = {
  //   PORT: getEnvKey("PORT"),
  DATABASE_URL: getEnvKey("DATABASE_URL"),
  ACCESS_TOKEN_SECRET: getEnvKey("ACCESS_TOKEN_SECRET"),
  REFRESH_TOKEN_SECRET: getEnvKey("REFRESH_TOKEN_SECRET"),
};
