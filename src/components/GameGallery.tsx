"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Game } from "../data/profile";

interface GameGalleryProps {
  games: Game[];
}

function posterUrl(appId: string) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;
}

// ============================================================
//  VideoModal — 点击后全屏弹窗播放
// ============================================================
function VideoModal({
  game,
  onClose,
}: {
  game: Game;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
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
        videoRef.current?.play().catch(() => {});
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
          ESC 关闭
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
              {game.name}
            </h2>
            <p className="text-sm mt-0.5" style={{ color: game.accentColor }}>
              {game.nameEn}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 ml-auto">
            {game.genre.split(" / ").map((g) => (
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
function GameCard({ game, index }: { game: Game; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [hlsReady, setHlsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
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
    v.play().catch(() => {});
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
            {game.nameEn}
          </p>
          <h3 className="text-2xl font-serif font-bold text-white mb-2.5">
            {game.name}
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
            {videoReady ? "▶ 实机演示  ·  点击放大" : "加载中..."}
          </span>
        </div>
      </div>

      {/* ── 弹窗 ── */}
      {modalOpen && (
        <VideoModal game={game} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}

// ============================================================
//  Gallery 容器
// ============================================================
export default function GameGallery({ games }: GameGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
      {games.map((game, i) => (
        <GameCard key={game.steamAppId} game={game} index={i} />
      ))}
    </div>
  );
}