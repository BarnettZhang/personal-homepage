"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type Hls from "hls.js";
import type { Game } from "../data/profile";
import type { Locale } from "../i18n/types";
import { t, tf } from "../i18n/ui";

// ── Steam 数据类型 ─────────────────────────────────────────
export interface SteamGame {
  appId: number;
  name: string;
  playtimeMinutes: number;
  playtimeHours: number;
  lastPlayed: number; // unix timestamp, 0 = never
  recentPlaytime: number; // 2-week minutes
}

export interface SteamData {
  player: { name: string; avatar: string; profileUrl: string };
  totalGames: number;
  totalPlaytimeHours: number;
  games: SteamGame[];
  featuredAppIds: string[];
  fetchedAt: string;
}

interface GameGalleryProps {
  games: Game[];
  steamData?: SteamData;
  lang: Locale;
}

// ── 工具函数 ───────────────────────────────────────────────
function posterUrl(appId: string | number) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;
}

function capsuleUrl(appId: string | number) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/capsule_616x353.jpg`;
}

function timeAgo(lang: Locale, unixTs: number): string {
  if (!unixTs) return "";
  const now = Math.floor(Date.now() / 1000);
  const diff = now - unixTs;
  if (diff < 60) return t(lang, "game.justNow");
  if (diff < 3600) return tf(lang, "game.minutesAgo", { n: Math.floor(diff / 60) });
  if (diff < 86400) return tf(lang, "game.hoursAgo", { n: Math.floor(diff / 3600) });
  if (diff < 2592000) return tf(lang, "game.daysAgo", { n: Math.floor(diff / 86400) });
  if (diff < 31536000) return tf(lang, "game.monthsAgo", { n: Math.floor(diff / 2592000) });
  return tf(lang, "game.yearsAgo", { n: Math.floor(diff / 31536000) });
}

function playtimeLabel(lang: Locale, minutes: number): string {
  const h = minutes / 60;
  if (h >= 1) return tf(lang, "game.hours", { n: Math.round(h * 10) / 10 });
  return tf(lang, "game.minutes", { n: minutes });
}

/** 游戏名的「另一语言」版本，用于卡片眉题的装饰性双语展示 */
function otherName(game: Game, lang: Locale): string {
  return game.name[lang === "zh" ? "en" : "zh"];
}

// ============================================================
//  VideoModal — 点击后全屏弹窗播放
// ============================================================
function VideoModal({
  game,
  lang,
  onClose,
}: {
  game: Game;
  lang: Locale;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls>(null);
  const [loaded, setLoaded] = useState(false);

  // ESC 关闭
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // 初始化 HLS / 原生播放
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const nativeHls = video.canPlayType("application/vnd.apple.mpegurl");
    if (nativeHls) {
      video.src = game.trailerUrl;
      return;
    }

    import("hls.js").then(({ default: Hls }) => {
      if (!videoRef.current || !Hls.isSupported()) return;
      const hls = new Hls({ enableWorker: false });
      hlsRef.current = hls;
      hls.loadSource(game.trailerUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoaded(true);
        videoRef.current?.play().catch(() => undefined);
      });
    });

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [game.trailerUrl]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      style={{
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        animation: "fadeIn 0.25s ease",
      }}
    >
      {/* 内容区 */}
      <div
        className="relative w-full max-w-3xl flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: "modalScaleIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm tracking-wider transition-colors"
        >
          {t(lang, "game.escClose")}
        </button>

        {/* 视频 */}
        <div
          className="relative rounded-xl overflow-hidden bg-black"
          style={{ aspectRatio: "16/9" }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            autoPlay
            playsInline
            onCanPlay={() => setLoaded(true)}
          />

          {/* 加载中 */}
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <div
                className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
                style={{
                  borderTopColor: game.accentColor,
                  borderRightColor: `${game.accentColor}40`,
                }}
              />
            </div>
          )}
        </div>

        {/* 游戏信息 */}
        <div className="flex items-center gap-4 px-1">
          <div>
            <h2 className="text-xl font-serif font-bold text-white">
              {game.name[lang]}
            </h2>
            <p className="text-sm mt-0.5" style={{ color: game.accentColor }}>
              {otherName(game, lang)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 ml-auto">
            {game.genre[lang].split(" / ").map((g) => (
              <span
                key={g}
                className="text-[11px] px-2.5 py-0.5 rounded-full border transition-colors"
                style={{
                  color: `${game.accentColor}cc`,
                  borderColor: `${game.accentColor}30`,
                  background: `${game.accentColor}12`,
                }}
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// ============================================================
//  GameCard — 单张游戏卡片
// ============================================================
function GameCard({ game, index, lang }: { game: Game; index: number; lang: Locale }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [hlsReady, setHlsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>();

  // ── 初始化 HLS，视频始终挂载 ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const nativeHls = video.canPlayType("application/vnd.apple.mpegurl");
    if (nativeHls) {
      video.src = game.trailerUrl;
      video.load();
      setHlsReady(true);
      return;
    }

    import("hls.js").then(({ default: Hls }) => {
      if (!videoRef.current || !Hls.isSupported()) return;
      const hls = new Hls({ enableWorker: false, lowLatencyMode: false });
      hlsRef.current = hls;
      hls.loadSource(game.trailerUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setHlsReady(true);
      });
    });

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [game.trailerUrl]);

  // ── hover 播放 / 离开暂停 ──
  const playVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v || !hlsReady) return;
    v.currentTime = 0;
    v.play().catch(() => undefined);
  }, [hlsReady]);

  const pauseVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
  }, []);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setHovered(true);
      playVideo();
    }, 120);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHovered(false);
    pauseVideo();
  };

  const handleClick = () => {
    // 视频加载完成才允许点开
    if (hlsReady) setModalOpen(true);
  };

  return (
    <>
      <div
        className="group relative overflow-hidden rounded-2xl select-none"
        style={{
          height: 420,
          cursor: hlsReady ? "pointer" : "default",
          boxShadow: hovered
            ? `0 0 0 2px ${game.accentColor}40, 0 8px 48px ${game.accentColor}25, 0 4px 20px rgba(0,0,0,0.3)`
            : "0 2px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.5s ease, transform 0.5s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* ── 海报层（hover 时淡出） ── */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${posterUrl(game.steamAppId)})`,
            backgroundColor: "#1a1a2e",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            opacity: hovered && videoReady ? 0 : 1,
            transition:
              "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s ease",
          }}
        />

        {/* ── 视频层（始终挂载，opacity 控制显隐） ── */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          style={{
            opacity: hovered && videoReady ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        />

        {/* ── 视频未就绪时的暗色占位 ── */}
        {hovered && !videoReady && (
          <div className="absolute inset-0 bg-[#1a1a2e] flex items-center justify-center">
            <div
              className="w-8 h-8 rounded-full border-2 border-transparent animate-spin"
              style={{
                borderTopColor: game.accentColor,
                borderRightColor: `${game.accentColor}40`,
              }}
            />
          </div>
        )}

        {/* ── 底部渐变遮罩 ── */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none z-10"
          style={{
            height: "55%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
            opacity: hovered ? 0.5 : 1,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* ── 文字内容 ── */}
        <div className="absolute inset-x-0 bottom-0 p-6 pb-5 z-20 pointer-events-none">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-1.5 font-semibold transition-all duration-400"
            style={{ color: game.accentColor, opacity: hovered ? 0.9 : 0.8 }}
          >
            {otherName(game, lang)}
          </p>
          <h3 className="text-2xl font-serif font-bold text-white mb-2.5">
            {game.name[lang]}
            <span
              className="inline-block w-2 h-2 rounded-full ml-2 align-middle transition-all duration-500"
              style={{
                background: game.accentColor,
                opacity: hovered ? 1 : 0,
                transform: hovered ? "scale(1)" : "scale(0)",
                boxShadow: `0 0 10px ${game.accentColor}`,
              }}
            />
          </h3>
          <div className="flex flex-wrap gap-2">
            {game.genre[lang].split(" / ").map((g) => (
              <span
                key={g}
                className="text-[11px] px-2.5 py-0.5 rounded-full border transition-all duration-400"
                style={{
                  color: hovered ? "#fff" : "rgba(255,255,255,0.6)",
                  borderColor: hovered
                    ? `${game.accentColor}50`
                    : "rgba(255,255,255,0.1)",
                  background: hovered
                    ? `${game.accentColor}15`
                    : "rgba(0,0,0,0.3)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {g}
              </span>
            ))}
          </div>
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
            style={{ color: `${game.accentColor}cc` }}
          >
            {videoReady ? t(lang, "game.hoverHint") : t(lang, "game.loading")}
          </span>
        </div>
      </div>

      {/* ── 弹窗 ── */}
      {modalOpen && (
        <VideoModal game={game} lang={lang} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}

// ============================================================
//  SteamGameCard — Steam 游戏库卡片（小尺寸）
// ============================================================
function SteamGameCard({
  game,
  maxHours,
  lang,
}: {
  game: SteamGame;
  maxHours: number;
  lang: Locale;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={`https://store.steampowered.com/app/${game.appId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl select-none block"
      style={{ aspectRatio: "2/3" }}
    >
      {/* ── 海报 ── */}
      <img
        src={imgError ? capsuleUrl(game.appId) : posterUrl(game.appId)}
        alt={game.name}
        loading="lazy"
        onError={() => setImgError(true)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundColor: "#1a1a2e" }}
      />

      {/* ── 渐变遮罩 ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.05) 70%, transparent 100%)",
        }}
      />

      {/* ── 最近游玩标记 ── */}
      {game.recentPlaytime > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/85 text-white tracking-wide">
            {t(lang, "game.recentlyPlayed")}
          </span>
        </div>
      )}

      {/* ── 底部信息 ── */}
      <div className="absolute inset-x-0 bottom-0 p-3 pointer-events-none z-10">
        <h4 className="text-white font-bold text-sm leading-tight mb-2 line-clamp-2">
          {game.name}
        </h4>

        {/* 时长条 */}
        <div className="w-full h-1 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.min((game.playtimeHours / maxHours) * 100, 100)}%`,
              background: "linear-gradient(90deg, rgba(100,200,255,0.7), rgba(130,180,255,0.9))",
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white/65 text-[11px]">
            {playtimeLabel(lang, game.playtimeMinutes)}
          </span>
          {game.lastPlayed > 0 && (
            <span className="text-white/35 text-[10px]">
              {timeAgo(lang, game.lastPlayed)}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

// ============================================================
//  SteamLibrary — Steam 游戏库板块
// ============================================================
function SteamLibrary({ data: initialData, lang }: { data: SteamData; lang: Locale }) {
  const [data, setData] = useState<SteamData>(initialData);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const maxHours = Math.max(...data.games.map((g) => g.playtimeHours), 1);

  const handleRefresh = async () => {
    setRefreshing(true);
    setError("");
    try {
      const res = await fetch("/api/refresh-steam");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const fresh = await res.json();
      if (fresh.error) throw new Error(fresh.error);
      setData(fresh);
    } catch (e) {
      setError(String(e));
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="mt-24 max-w-5xl mx-auto">
      {/* ── 头部 ── */}
      <div className="flex items-center gap-4 mb-10 flex-wrap">
        <img
          src={data.player.avatar}
          alt={data.player.name}
          className="w-12 h-12 rounded-full ring-2 ring-white/10"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-serif font-bold text-ink leading-snug">
            {tf(lang, "game.steamLibrary", { name: data.player.name })}
          </h3>
          <p className="text-ink-muted text-sm mt-0.5">
            {tf(lang, "game.totalStats", {
              count: data.totalGames,
              hours: data.totalPlaytimeHours,
            })}
          </p>
        </div>
        <a
          href={data.player.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-wider text-ink-muted hover:text-ink-light transition-colors border border-ink-muted/20 rounded-full px-4 py-2"
        >
          {t(lang, "game.steamProfile")}
        </a>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="text-xs tracking-wider text-ink-muted hover:text-sage disabled:opacity-50 transition-all border border-ink-muted/20 rounded-full px-4 py-2 flex items-center gap-1.5"
        >
          <span
            className={`inline-block w-3 h-3 rounded-full border transition-colors ${
              refreshing
                ? "border-ink-muted/40 border-t-sage animate-spin"
                : error
                  ? "border-red-400"
                  : "border-ink-muted/30"
            }`}
          />
          {refreshing ? t(lang, "game.refreshing") : error ? t(lang, "game.retry") : t(lang, "game.refresh")}
        </button>
      </div>

      {/* ── 错误提示 ── */}
      {error && (
        <p className="text-xs text-red-400/80 mb-4 -mt-6">{t(lang, "game.refreshFailed")} {error}</p>
      )}

      {/* ── 游戏网格 ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.games.map((game) => (
          <SteamGameCard key={game.appId} game={game} maxHours={maxHours} lang={lang} />
        ))}
      </div>

      <p className="text-center text-ink-muted/40 text-xs mt-8">
        {tf(lang, "game.updatedAt", {
          date: new Date(data.fetchedAt).toLocaleString(lang === "zh" ? "zh-CN" : "en-US"),
        })}
      </p>
    </div>
  );
}

// ============================================================
//  Gallery 容器
// ============================================================
export default function GameGallery({ games, steamData, lang }: GameGalleryProps) {
  return (
    <>
      {/* ── 精选游戏 ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {games.map((game, i) => (
          <GameCard key={game.steamAppId} game={game} index={i} lang={lang} />
        ))}
      </div>

      {/* ── Steam 游戏库 ── */}
      {steamData && steamData.games.length > 0 && (
        <SteamLibrary data={steamData} lang={lang} />
      )}
    </>
  );
}
