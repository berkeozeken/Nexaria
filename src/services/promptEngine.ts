// src/services/promptEngine.ts

// Nexaria Prompt Engine
// Tüm prompt metinleri VE sadece buradan yönetilen logic.
// Başka hiçbir yerde prompt string yazılmamalı.

export type OptimizeType = "cv" | "post" | "email" | "cover" | "summary" | "bio";

export type Tone =
  | "corporate"
  | "friendly"
  | "confident"
  | "minimalist"
  | "sharp"
  | "youthful";

export type Language = "tr" | "en";

export interface PromptEngineInput {
  type: OptimizeType;
  text: string;
  tone?: Tone;
  language?: Language;
  enableHashtags?: boolean; // Pro/Premium için ileride
}

export interface PromptEngineResult {
  systemPrompt: string;
  userPrompt: string;
}

/* =====================================================
   MAIN ENTRY
===================================================== */
export function buildPrompts(input: PromptEngineInput): PromptEngineResult {
  const language: Language = input.language ?? "en";
  const tone: Tone = input.tone ?? getDefaultToneForType(input.type);

  const systemPrompt = getSystemPromptForType(input.type);
  const userPrompt = buildUserPrompt({
    ...input,
    language,
    tone,
  });

  return { systemPrompt, userPrompt };
}

/* =====================================================
   SYSTEM PROMPTS (TYPE-BASED)
===================================================== */

function getSystemPromptForType(type: OptimizeType): string {
  switch (type) {
    case "cv":
      return CV_SYSTEM_PROMPT;
    case "post":
      return POST_SYSTEM_PROMPT;
    case "email":
      return EMAIL_SYSTEM_PROMPT;
    case "cover":
      return COVER_LETTER_SYSTEM_PROMPT;
    case "summary":
    case "bio":
      return SUMMARY_SYSTEM_PROMPT;
    default:
      return GENERIC_SYSTEM_PROMPT;
  }
}

const GENERIC_SYSTEM_PROMPT = `
You are Nexaria, an AI-powered professional writing assistant.

RULES:
- Improve clarity, grammar and flow.
- Adapt the tone to the requested style.
- Keep the original meaning and facts.
- NEVER invent fake jobs, dates, education, achievements or companies.
- NEVER add new content beyond what is implied.

OUTPUT RULES (VERY IMPORTANT):
- Do NOT add meta phrases like "Here is...", "Below is...", "Optimized text:".
- Do NOT add section titles or labels.
- Start directly with the rewritten text.
- Output ONLY the final text with no explanations.
`.trim();

/* =====================================================
   CV SYSTEM PROMPT (MAX STRICT MODE)
===================================================== */

const CV_SYSTEM_PROMPT = `
You are Nexaria, an AI-powered professional CV writing assistant.

STRICT RULES:
- NEVER invent new jobs, dates, education, companies or achievements.
- NEVER add skills, tools or responsibilities that are not clearly implied.
- NEVER change seniority (junior → senior) or years of experience.
- NEVER turn a short text into a long generic biography.
- ONLY rewrite what the user already wrote.

ALLOWED TRANSFORMATIONS:
- Fix grammar, spelling and punctuation.
- Improve clarity and flow.
- Make wording more professional WITHOUT adding meaning.
- Reformat existing bullet points (if any).
- Add SMALL ATS-friendly phrasing ONLY if it is clearly aligned with the given text.

LENGTH RULES:
- Keep output roughly similar in length to the original.
- If the user gives 1 sentence, output 1–2 short sentences MAX.
- Do NOT create new CV sections.

OUTPUT RULES:
- DO NOT write "Here is your CV:", "Rewritten:" or similar.
- DO NOT add labels, titles or commentary.
- Start DIRECTLY with the improved CV text.
`.trim();

/* =====================================================
   POST SYSTEM PROMPT
===================================================== */

const POST_SYSTEM_PROMPT = `
You are Nexaria, a LinkedIn post optimization assistant.

RULES:
- Improve hook strength.
- Improve clarity, flow and readability.
- Avoid overly decorative language.
- Remove repetition.
- Preserve meaning.
- Do NOT invent achievements, statistics or new information.

HASHTAGS:
- Add up to 6 hashtags ONLY IF requested in instructions.

OUTPUT RULES:
- Do NOT add "Here is your post:" or similar meta lines.
- Start directly with the optimized post text.
`.trim();

/* =====================================================
   EMAIL SYSTEM PROMPT
===================================================== */

const EMAIL_SYSTEM_PROMPT = `
You are Nexaria, a professional email optimization assistant.

RULES:
- Maintain professionalism and politeness.
- Be clear and concise.
- Add greeting + closing ONLY if missing.
- Do NOT invent any new promises or details.

OUTPUT FORMAT:
1) Subject: <suggested subject>
2) Email body only  
(No explanations, no meta lines.)
`.trim();

/* =====================================================
   COVER LETTER SYSTEM PROMPT
===================================================== */

const COVER_LETTER_SYSTEM_PROMPT = `
You are Nexaria, a cover letter writing assistant.

RULES:
- 3–5 short paragraphs.
- No exaggeration, no artificial praise.
- Never invent roles, education or experience.
- Only refine what is provided.

OUTPUT RULES:
- Start directly with the cover letter.
- No "Here is...", no labels, no commentary.
`.trim();

/* =====================================================
   SUMMARY / BIO SYSTEM PROMPT
===================================================== */

const SUMMARY_SYSTEM_PROMPT = `
You are Nexaria, a professional summary/bio writer.

RULES:
- Output must be 2–5 sentences.
- Very short, crisp and factual.
- No exaggeration.
- No invented achievements.

OUTPUT RULES:
- Start directly with the summary.
- No meta intro or labels.
`.trim();

/* =====================================================
   USER PROMPT BUILDER
===================================================== */

interface BuildUserPromptInput extends PromptEngineInput {
  language: Language;
  tone: Tone;
}

function buildUserPrompt(input: BuildUserPromptInput): string {
  const { type, text, language, tone, enableHashtags } = input;

  const toneInstruction = getToneInstruction(tone, language);
  const languageInstruction = getLanguageInstruction(language);
  const typeInstruction = getTypeSpecificInstruction(type, language, enableHashtags);

  const baseIntro =
    language === "tr"
      ? `Aşağıdaki metni verilen kurallara göre yeniden yaz. Yalnızca nihai metni üret; açıklama ekleme.`
      : `Rewrite the text below according to the rules. Output ONLY the final text, with no explanations.`;

  const originalLabel = language === "tr" ? "ORİJİNAL METİN" : "ORIGINAL TEXT";

  return [
    baseIntro,
    "",
    typeInstruction,
    toneInstruction,
    languageInstruction,
    "",
    `${originalLabel}:`,
    text.trim(),
  ].join("\n");
}

/* =====================================================
   TONE INSTRUCTIONS
===================================================== */

function getToneInstruction(tone: Tone, language: Language): string {
  if (language === "tr") {
    switch (tone) {
      case "corporate":
        return `Ton: Resmi ve kurumsal.`;
      case "friendly":
        return `Ton: Samimi ama profesyonel.`;
      case "confident":
        return `Ton: Kendinden emin ve net.`;
      case "minimalist":
        return `Ton: Minimalist, kısa ve sade.`;
      case "sharp":
        return `Ton: Çok net, direkt ve odaklı.`;
      case "youthful":
        return `Ton: Dinamik ve modern.`;
    }
  } else {
    switch (tone) {
      case "corporate":
        return `Tone: Formal, corporate and professional.`;
      case "friendly":
        return `Tone: Friendly but professional.`;
      case "confident":
        return `Tone: Confident and clear.`;
      case "minimalist":
        return `Tone: Minimalist, short and crisp.`;
      case "sharp":
        return `Tone: Sharp, direct and high clarity.`;
      case "youthful":
        return `Tone: Energetic and modern.`;
    }
  }
}

/* =====================================================
   LANGUAGE INSTRUCTION
===================================================== */

function getLanguageInstruction(language: Language): string {
  if (language === "tr") {
    return `ÇIKTI DİLİ: Sadece TÜRKÇE yaz. Açıklama ekleme.`;
  }
  return `OUTPUT LANGUAGE: Write ONLY in ENGLISH. No explanations.`;
}

/* =====================================================
   TYPE-SPECIFIC INSTRUCTIONS
===================================================== */

function getTypeSpecificInstruction(
  type: OptimizeType,
  language: Language,
  enableHashtags?: boolean
): string {
  const isTr = language === "tr";

  switch (type) {
    case "cv":
      return isTr
        ? [
            `TÜR: CV / Özgeçmiş metni.`,
            `- Yeni pozisyon, şirket, tarih veya beceri UYDURMA.`,
            `- Metni çok uzatma; orijinal uzunluğa yakın tut.`,
            `- Kısa cümleyi roman yapma.`,
            `- Doğrudan CV metni yaz; "işte CV" gibi giriş cümleleri yazma.`,
          ].join("\n")
        : [
            `TYPE: CV text.`,
            `- Do NOT invent roles, companies, dates or skills.`,
            `- Keep length close to original.`,
            `- Do NOT turn one sentence into a long bio.`,
            `- Start directly with CV text; no meta intro.`,
          ].join("\n");

    case "post": {
      const hashtagLine = enableHashtags
        ? isTr
          ? `- Gerekirse en fazla 6 hashtag ekle (HASHTAGS:).`
          : `- Add up to 6 hashtags if requested (HASHTAGS:).`
        : isTr
        ? `- HASHTAGS özelliği Pro/Premium içindir.`
        : `- HASHTAGS feature reserved for Pro/Premium.`;

      return isTr
        ? [
            `TÜR: LinkedIn paylaşımı.`,
            `- Yeni başarı, veri veya proje uydurma.`,
            `- Fazla süsleme yapma.`,
            `- Metni akıcı ve doğal hale getir.`,
            `- Giriş cümlesini güçlendir.`,
            hashtagLine,
          ].join("\n")
        : [
            `TYPE: LinkedIn post.`,
            `- Do NOT invent achievements, stats or projects.`,
            `- Improve clarity and hook.`,
            `- Keep it readable and natural.`,
            hashtagLine,
          ].join("\n");
    }

    case "email":
      return isTr
        ? [
            `TÜR: Profesyonel e-posta.`,
            `- Yeni bilgi, söz veya vaat ekleme.`,
            `- Net ve profesyonel yaz.`,
            `- Selamlama + kapanış ekle (yoksa).`,
          ].join("\n")
        : [
            `TYPE: Email.`,
            `- Do NOT add new commitments or facts.`,
            `- Be clear and professional.`,
            `- Add greeting/closing if missing.`,
          ].join("\n");

    case "cover":
      return isTr
        ? [
            `TÜR: Ön yazı.`,
            `- 3–5 kısa paragraf.`,
            `- Abartı yok.`,
            `- Yeni deneyim uydurma.`,
          ].join("\n")
        : [
            `TYPE: Cover letter.`,
            `- 3–5 short paragraphs.`,
            `- No exaggeration.`,
            `- No invented experience.`,
          ].join("\n");

    case "summary":
    case "bio":
      return isTr
        ? [
            `TÜR: Özet / Biyografi.`,
            `- 2–5 cümle.`,
            `- Abartı yok.`,
            `- Yeni bilgi ekleme.`,
          ].join("\n")
        : [
            `TYPE: Summary / Bio.`,
            `- 2–5 sentences.`,
            `- No exaggeration.`,
            `- No invented information.`,
          ].join("\n");
  }
}

/* =====================================================
   DEFAULT TONE FOR EACH TYPE
===================================================== */

function getDefaultToneForType(type: OptimizeType): Tone {
  switch (type) {
    case "cv":
    case "email":
    case "cover":
      return "corporate";
    case "post":
      return "friendly";
    case "summary":
    case "bio":
      return "confident";
    default:
      return "corporate";
  }
}
