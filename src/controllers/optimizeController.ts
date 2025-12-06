import { Request, Response } from "express";
import { z } from "zod";
import { buildPrompts } from "../services/promptEngine";
// OpenAI yerine Ollama client
import { runLocalLLM } from "../services/ollamaClient";
import { logger } from "../utils/logger";

const optimizeSchema = z.object({
  type: z.enum(["cv", "post", "email", "cover", "summary", "bio"]),
  text: z.string().min(1),
  tone: z.enum([
    "corporate",
    "friendly",
    "confident",
    "minimalist",
    "sharp",
    "youthful",
  ]),
  language: z.enum(["tr", "en"]),
});

export async function optimizeHandler(req: Request, res: Response) {
  try {
    const parsed = optimizeSchema.parse(req.body);

    const { systemPrompt, userPrompt } = buildPrompts(parsed);

    // Artık OpenAI değil, lokal Llama 3.1 çağırıyoruz
    const optimized = await runLocalLLM(systemPrompt, userPrompt);

    return res.json({
      success: true,
      type: parsed.type,
      optimized,
    });
  } catch (err: any) {
    logger.error("Optimize failed", err);

    // Validation error
    if (err?.name === "ZodError") {
      return res.status(400).json({
        success: false,
        error: "VALIDATION_ERROR",
      });
    }

    // Lokal AI servisi çökerse / ulaşılamazsa (biz ollamaClient'ta AI_SERVICE_ERROR fırlatacağız)
    if (err?.message === "AI_SERVICE_ERROR") {
      return res.status(503).json({
        success: false,
        error: "AI_SERVICE_UNAVAILABLE",
        message:
          "Nexaria'nın yerel AI servisine şu anda ulaşılamıyor. Lütfen kısa bir süre sonra tekrar deneyin.",
      });
    }

    // Genel hata
    return res.status(500).json({
      success: false,
      error: "INTERNAL_ERROR",
    });
  }
}
