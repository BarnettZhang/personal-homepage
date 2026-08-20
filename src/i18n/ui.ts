// ============================================================
//  UI 文案字典 — 所有界面文案集中管理
// ============================================================
import type { Locale, LocalizedString } from "./types";

export const ui: Record<string, LocalizedString> = {
  // ── 导航 ──
  "nav.home": { zh: "首页", en: "Home" },
  "nav.work": { zh: "工作", en: "Work" },
  "nav.hobbies": { zh: "爱好", en: "Hobbies" },
  "nav.travel": { zh: "旅行", en: "Travel" },

  // ── Layout / Footer ──
  "layout.defaultTitle": {
    zh: "Barnett Zhang — 前端开发 & 创意工程师",
    en: "Barnett Zhang — Frontend Developer & Creative Coder",
  },
  "layout.defaultDescription": {
    zh: "Barnett Zhang 的个人主页 — 前端开发者 · 热爱技术与生活",
    en: "Barnett Zhang's personal homepage — Frontend developer · passionate about technology and life",
  },
  "footer.builtWith": { zh: "用热爱构建", en: "Built with passion" },
  "footer.crafted": {
    zh: "由 Astro · React · Three.js 精心打造",
    en: "Crafted with Astro · React · Three.js",
  },

  // ── 首页 ──
  "index.title": { zh: "首页", en: "Home" },
  "index.cardWork.title": { zh: "工作", en: "Work" },
  "index.cardWork.desc": { zh: "我的工作经历和技能。", en: "My work experience and skills." },
  "index.cardHobbies.title": { zh: "兴趣爱好", en: "Hobbies" },
  "index.cardHobbies.desc": { zh: "代码之外的热爱。", en: "Passions beyond code." },

  // ── 工作页 ──
  "about.title": { zh: "工作", en: "Work" },
  "about.subtitle": {
    zh: "B 端平台 & AI 应用前端开发，持续交付高质量产品。",
    en: "Frontend development for B2B platforms & AI applications — shipping quality products.",
  },

  // ── 爱好页 ──
  "hobbies.title": { zh: "兴趣爱好", en: "Hobbies" },
  "hobbies.subtitle": {
    zh: "代码之外，这些是我热爱的事物。",
    en: "Beyond code, these are the things I love.",
  },
  "hobbies.gamesTitle": { zh: "玩过的游戏", en: "Games I've played" },

  // ── 旅行页 ──
  "travel.title": { zh: "走过的城市", en: "Cities I've visited" },
  "travel.subtitle": {
    zh: "用脚步丈量世界，用镜头记录旅程。",
    en: "Measuring the world with my steps, capturing journeys with my lens.",
  },
  "travel.viewDetails": { zh: "查看详情 →", en: "View details →" },

  // ── 城市详情页 ──
  "travel.back": { zh: "返回旅行地图", en: "Back to travel map" },
  "travel.detailTitleSuffix": { zh: "旅行", en: "Travel" },
  "travel.attractionsTitle": { zh: "🗺️ 到过的景点", en: "🗺️ Attractions visited" },
  "travel.mustSee": { zh: "必去", en: "Must-see" },
  "travel.nextCity": { zh: "下一个城市", en: "Next city" },

  // ── 游戏画廊 ──
  "game.escClose": { zh: "ESC 关闭", en: "ESC to close" },
  "game.loading": { zh: "加载中...", en: "Loading..." },
  "game.hoverHint": { zh: "▶ 实机演示 · 点击放大", en: "▶ Gameplay · Click to enlarge" },
  "game.recentlyPlayed": { zh: "最近在玩", en: "Recently played" },
  "game.hours": { zh: "{n} 小时", en: "{n} h" },
  "game.minutes": { zh: "{n} 分钟", en: "{n} min" },
  "game.justNow": { zh: "刚刚", en: "just now" },
  "game.minutesAgo": { zh: "{n} 分钟前", en: "{n}m ago" },
  "game.hoursAgo": { zh: "{n} 小时前", en: "{n}h ago" },
  "game.daysAgo": { zh: "{n} 天前", en: "{n}d ago" },
  "game.monthsAgo": { zh: "{n} 个月前", en: "{n}mo ago" },
  "game.yearsAgo": { zh: "{n} 年前", en: "{n}y ago" },
  "game.steamLibrary": { zh: "{name} 的 Steam 游戏库", en: "{name}'s Steam library" },
  "game.totalStats": {
    zh: "{count} 款游戏 · 总计 {hours} 小时",
    en: "{count} games · {hours} hours total",
  },
  "game.steamProfile": { zh: "Steam 主页 ↗", en: "Steam profile ↗" },
  "game.refreshing": { zh: "刷新中...", en: "Refreshing..." },
  "game.retry": { zh: "重试", en: "Retry" },
  "game.refresh": { zh: "刷新数据", en: "Refresh" },
  "game.refreshFailed": { zh: "刷新失败:", en: "Refresh failed:" },
  "game.updatedAt": {
    zh: "数据更新于 {date} · 游玩时长前 12 款",
    en: "Updated {date} · Top 12 by playtime",
  },
};

/** 取指定语言的文案，key 不存在时回退到 key 本身 */
export function t(lang: Locale, key: string): string {
  const entry = ui[key];
  return entry ? entry[lang] : key;
}

/** 带占位符插值的文案，例如 tf(lang, "game.hours", { n: 12 }) */
export function tf(
  lang: Locale,
  key: string,
  vars: Record<string, string | number>,
): string {
  let text = t(lang, key);
  for (const [name, value] of Object.entries(vars)) {
    text = text.split(`{${name}}`).join(String(value));
  }
  return text;
}
