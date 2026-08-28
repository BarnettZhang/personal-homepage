"use client";

import { useState } from "react";
import type { Anime } from "../data/profile";
import type { Locale } from "../i18n/types";
import { t } from "../i18n/ui";

interface AnimeGalleryProps {
  anime: Anime[];
  lang: Locale;
}

// ============================================================
//  AnimeCard — 单张动漫卡片（仿游戏卡片，点击跳转 Bangumi）
// ============================================================
function AnimeCard({
  item,
  index,
  lang,
}: {
  item: Anime;
  index: number;
  lang: Locale;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={item.bangumiUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl select-none"
      style={{
        height: 420,
        boxShadow: hovered
          ? `0 0 0 2px ${item.accentColor}40, 0 8px 48px ${item.accentColor}25, 0 4px 20px rgba(0,0,0,0.3)`
          : "0 2px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.5s ease, transform 0.5s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── 海报层（hover 时淡出） ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${item.coverUrl})`,
          backgroundColor: "#1a1a2e",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          opacity: hovered ? 0 : 1,
          transition:
            "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s ease",
        }}
      />

      {/* ── 场景层（hover 淡入，模拟实机画面） ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${item.bannerUrl})`,
          backgroundColor: "#1a1a2e",
          transform: hovered ? "scale(1.06)" : "scale(1.14)",
          opacity: hovered ? 1 : 0,
          transition:
            "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s ease",
        }}
      />

      {/* ── 底部渐变遮罩 ── */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none z-10"
        style={{
          height: "65%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          opacity: hovered ? 0.55 : 1,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* ── 文字内容 ── */}
      <div className="absolute inset-x-0 bottom-0 p-6 pb-5 z-20 pointer-events-none">
        <p
          className="text-xs tracking-[0.2em] uppercase mb-1.5 font-semibold transition-all duration-400"
          style={{ color: item.accentColor, opacity: hovered ? 0.9 : 0.8 }}
        >
          {item.original}
        </p>
        <h3 className="text-2xl font-serif font-bold text-white mb-2">
          {item.name[lang]}
          <span
            className="inline-block w-2 h-2 rounded-full ml-2 align-middle transition-all duration-500"
            style={{
              background: item.accentColor,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1)" : "scale(0)",
              boxShadow: `0 0 10px ${item.accentColor}`,
            }}
          />
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {item.genre[lang].split(" / ").map((g) => (
            <span
              key={g}
              className="text-[11px] px-2.5 py-0.5 rounded-full border transition-all duration-400"
              style={{
                color: hovered ? "#fff" : "rgba(255,255,255,0.6)",
                borderColor: hovered
                  ? `${item.accentColor}50`
                  : "rgba(255,255,255,0.1)",
                background: hovered
                  ? `${item.accentColor}15`
                  : "rgba(0,0,0,0.3)",
                backdropFilter: "blur(4px)",
              }}
            >
              {g}
            </span>
          ))}
        </div>
        {/* ── 一句话介绍 ── */}
        <p
          className="text-sm leading-relaxed transition-all duration-500"
          style={{
            color: "rgba(255,255,255,0.75)",
            opacity: hovered ? 1 : 0.65,
            transform: hovered ? "translateY(0)" : "translateY(2px)",
          }}
        >
          {item.description[lang]}
        </p>
      </div>

      {/* ── 左上角序号 ── */}
      <div
        className="absolute top-4 left-4 z-10 transition-all duration-500"
        style={{ opacity: hovered ? 0 : 0.5 }}
      >
        <span
          className="text-5xl font-bold font-mono"
          style={{
            color: "rgba(255,255,255,0.06)",
            WebkitTextStroke: "1px rgba(255,255,255,0.12)",
          }}
        >
          {`0${index + 1}`}
        </span>
      </div>

      {/* ── hover 提示 ── */}
      <div
        className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 transition-all duration-400 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <span
          className="text-[11px] tracking-wider"
          style={{ color: `${item.accentColor}cc` }}
        >
          {t(lang, "anime.bangumiHint")}
        </span>
      </div>
    </a>
  );
}

// ============================================================
//  Gallery 容器
// ============================================================
export default function AnimeGallery({ anime, lang }: AnimeGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
      {anime.map((item, i) => (
        <AnimeCard key={item.bangumiUrl} item={item} index={i} lang={lang} />
      ))}
    </div>
  );
}