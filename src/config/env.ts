import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  nodeEnv: process.env.NODE_ENV || "development",
};
