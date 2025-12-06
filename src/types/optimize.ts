export type OptimizeType = "cv" | "post" | "email" | "cover" | "summary" | "bio";

export type ToneType =
  | "corporate"
  | "friendly"
  | "confident"
  | "minimalist"
  | "sharp"
  | "youthful";

export type LanguageType = "tr" | "en";

export interface OptimizeRequestBody {
  type: OptimizeType;
  text: string;
  tone: ToneType;
  language: LanguageType;
}
