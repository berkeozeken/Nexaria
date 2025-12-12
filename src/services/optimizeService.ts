// src/services/optimizeService.ts

import { z } from "zod";
import {
  buildPrompts,
  type OptimizeType,
  type Tone,
  type Language,
} from "./promptEngine";
import { runLocalLLM } from "./ollamaClient";

export const optimizeRequestSchema = z.object({
  type: z.enum(["cv", "post", "email", "cover", "summary", "bio"]),
  text: z.string().min(1, "Text is required"),
  tone: z
    .enum([
      "corporate",
      "friendly",
      "confident",
      "minimalist",
      "sharp",
      "youthful",
    ])
    .optional(),
  language: z.enum(["tr", "en"]).optional(),
  enableHashtags: z.boolean().optional(), // Pro/Premium için ileride
});

export type OptimizeRequestDto = z.infer<typeof optimizeRequestSchema>;

export interface OptimizeServiceResult {
  success: boolean;
  type: OptimizeType;
  optimized: string;
}

/**
 * Body alır, validate eder, prompt üretir, Ollama'ya yollar.
 */
export async function optimizeText(
  body: unknown
): Promise<OptimizeServiceResult> {
  // 1) Validate
  const parsed = optimizeRequestSchema.parse(body);

  const type = parsed.type as OptimizeType;
  const tone = parsed.tone as Tone | undefined;
  const language = parsed.language as Language | undefined;

  // 2) Prompt’ları üret
  const { systemPrompt, userPrompt } = buildPrompts({
    type,
    text: parsed.text,
    tone,
    language,
    enableHashtags: parsed.enableHashtags,
  });

  // 3) Lokal Llama 3.1 (Ollama) çağrısı
  // runLocalLLM, hata durumunda "AI_SERVICE_ERROR" fırlatacak şekilde implemente edilmeli.
  const modelOutput = await runLocalLLM(systemPrompt, userPrompt);

  return {
    success: true,
    type,
    optimized: modelOutput.trim(),
  };
}
