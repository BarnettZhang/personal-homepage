"use client";

import { useState, useRef, useEffect } from "react";
import type { Game } from "../data/profile";

interface GameGalleryProps {
  games: Game[];
}

function posterUrl(appId: string) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;
}

function GameCard({ game, index }: { game: Game; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>();

  // ── HLS 播放器生命周期 ──
  useEffect(() => {
    if (!hovered) {
      // 离开 → 清理
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      setVideoReady(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Safari 原生支持 HLS
    const nativeHls = video.canPlayType("application/vnd.apple.mpegurl");

    if (nativeHls) {
      video.src = game.trailerUrl;
      video.load();
      video.play().catch(() => {});
      return;
    }

    // Chrome / Firefox → 动态加载 hls.js
    import("hls.js").then(({ default: Hls }) => {
      if (!videoRef.current) return;

      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: false,
          lowLatencyMode: false,
        });
        hlsRef.current = hls;
        hls.loadSource(game.trailerUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play().catch(() => {});
        });
      }
    });

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [hovered, game.trailerUrl]);

  // ── 延迟 hover 避免误触 ──
  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => setHovered(true), 180);
  };
  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHovered(false);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl cursor-pointer select-none"
      style={{
        height: 420,
        boxShadow: hovered
          ? `0 0 0 2px ${game.accentColor}40, 0 8px 48px ${game.accentColor}25, 0 4px 20px rgba(0,0,0,0.3)`
          : "0 2px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.5s ease, transform 0.5s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── 海报层 ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${posterUrl(game.steamAppId)})`,
          backgroundColor: "#1a1a2e",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          opacity: hovered ? 0 : 1,
          transition:
            "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease",
        }}
      />

      {/* ── 游玩视频层（hover 播放） ── */}
      {hovered && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          onCanPlay={() => setVideoReady(true)}
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      )}

      {/* ── 视频加载中的闪烁占位 ── */}
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
          opacity: hovered ? 0.55 : 1,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* ── 文字内容区 ── */}
      <div
        className="absolute inset-x-0 bottom-0 p-6 pb-5 z-20"
        style={{
          transform: hovered ? "translateY(0)" : "translateY(0)",
          transition: "transform 0.4s ease",
        }}
      >
        {/* 英文标题 */}
        <p
          className="text-xs tracking-[0.2em] uppercase mb-1.5 font-semibold transition-all duration-400"
          style={{
            color: game.accentColor,
            opacity: hovered ? 0.9 : 0.8,
          }}
        >
          {game.nameEn}
        </p>

        {/* 中文标题 + 光点 */}
        <h3 className="text-2xl font-serif font-bold text-white mb-2.5">
          {game.name}
          <span
            className="inline-block w-2 h-2 rounded-full ml-2 align-middle transition-all duration-500"
            style={{
              background: game.accentColor,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1)" : "scale(0)",
              boxShadow: `0 0 10px ${game.accentColor}, 0 0 24px ${game.accentColor}50`,
            }}
          />
        </h3>

        {/* 类型标签 */}
        <div className="flex flex-wrap gap-2 transition-all duration-400">
          {game.genre.split(" / ").map((g) => (
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

      {/* ── hover 时右下角「观看实机」提示 ── */}
      <div
        className="absolute bottom-4 right-4 z-20 flex items-center gap-2 transition-all duration-400"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <span
          className="text-[11px] tracking-wider"
          style={{ color: `${game.accentColor}cc` }}
        >
          {videoReady ? "▶ 实机演示" : "加载中..."}
        </span>
      </div>
    </div>
  );
}

export default function GameGallery({ games }: GameGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
      {games.map((game, i) => (
        <GameCard key={game.steamAppId} game={game} index={i} />
      ))}
    </div>
  );
}