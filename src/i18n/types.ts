// ============================================================
//  i18n 基础类型
// ============================================================

export type Locale = "zh" | "en";

export const locales: Locale[] = ["zh", "en"];

/** 一段同时提供中英文的文本 */
export interface LocalizedString {
  zh: string;
  en: string;
}

/** 从本地化文本中取出指定语言 */
export function pick(text: LocalizedString, lang: Locale): string {
  return text[lang];
}
