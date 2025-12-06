import { OptimizeRequestBody } from "../types/optimize";

interface PromptResult {
  systemPrompt: string;
  userPrompt: string;
}

export function buildPrompts(body: OptimizeRequestBody): PromptResult {
  const { type, text, tone, language } = body;

  const baseTone = `Tone: ${tone}. Language: ${language}. Do not invent new experiences or jobs. Keep the original meaning, improve clarity and professionalism.`;

  let systemPrompt = "";
  let userPrompt = "";

  switch (type) {
    case "cv":
      systemPrompt =
        "You are Nexaria, an AI-powered CV optimization assistant. Improve grammar, clarity, structure and ATS compatibility. Never invent new positions, dates or achievements.";
      break;
    case "post":
      systemPrompt =
        "You are Nexaria, a LinkedIn post optimization assistant. Improve hook, flow, readability and engagement without sounding robotic.";
      break;
    case "email":
      systemPrompt =
        "You are Nexaria, a professional email optimization assistant. Keep it polite, clear, concise and business-appropriate.";
      break;
    case "cover":
      systemPrompt =
        "You are Nexaria, a cover letter generator and optimizer. Create a short, focused, role-aligned cover letter (3–5 paragraphs).";
      break;
    case "summary":
    case "bio":
      systemPrompt =
        "You are Nexaria, specializing in short, impactful professional summaries and bios. Be concise, clear and realistic.";
      break;
  }

  systemPrompt += ` ${baseTone}`;

  userPrompt = `Here is the original text that needs optimization:\n\n${text}\n\nReturn ONLY the optimized text.`;

  return { systemPrompt, userPrompt };
}
