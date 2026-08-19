// ============================================================
//  i18n middleware — 解析当前语言并写入 Astro.locals.lang
//  优先级：cookie > Accept-Language 头 > 默认 zh
// ============================================================
import { defineMiddleware } from "astro:middleware";

type Locale = "zh" | "en";

function normalize(lang: string | undefined): Locale | null {
  if (!lang) return null;
  const value = lang.toLowerCase();
  if (value.startsWith("zh")) return "zh";
  if (value.startsWith("en")) return "en";
  return null;
}

function detectLocale(request: Request): Locale {
  // 1. cookie（由右上角切换按钮或首次自动检测脚本写入）
  const cookie = request.headers.get("cookie");
  if (cookie) {
    const match = /(?:^|;\s*)lang=([a-z-]+)/i.exec(cookie);
    const fromCookie = normalize(match?.[1]);
    if (fromCookie) return fromCookie;
  }

  // 2. Accept-Language（服务端对系统语言的最佳猜测）
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const first = acceptLanguage.split(",")[0]?.trim();
    const fromAccept = normalize(first);
    if (fromAccept) return fromAccept;
  }

  // 3. 默认中文
  return "zh";
}

export const onRequest = defineMiddleware((context, next) => {
  context.locals.lang = detectLocale(context.request);
  return next();
});
