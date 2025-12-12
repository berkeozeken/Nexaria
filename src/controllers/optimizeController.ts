// src/controllers/optimizeController.ts

import { Request, Response } from "express";
import { ZodError } from "zod";
import { optimizeText } from "../services/optimizeService";
import { logger } from "../utils/logger";

export async function optimizeHandler(req: Request, res: Response) {
  try {
    const result = await optimizeText(req.body);

    return res.json({
      success: true,
      type: result.type,
      optimized: result.optimized,
    });
  } catch (err: any) {
    logger.error("Optimize failed", err);

    // Validation error (Zod)
    if (err instanceof ZodError) {
      return res.status(400).json({
        success: false,
        error: "VALIDATION_ERROR",
        details: err.issues,
      });
    }

    // Lokal AI servisi çökerse / ulaşılamazsa
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
