import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 7070,
  nodeEnv: process.env.NODE_ENV || "development",
  coingeckoApiKey: process.env.COINGECKO_API_KEY || "",
  coingeckoBaseUrl:
    process.env.COINGECKO_BASE_URL || "https://api.coingecko.com/api/v3",
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:3000,http://localhost:3001")
    .split(",")
    .map((o) => o.trim()),
};
