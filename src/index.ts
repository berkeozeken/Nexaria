import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { optimizeRouter } from "./routes/optimize";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", optimizeRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "nexaria-backend" });
});

app.listen(env.port, () => {
  logger.info(`Nexaria API listening on http://localhost:${env.port}`);
});
