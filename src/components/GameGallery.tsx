"use client";

import { useState, useMemo } from "react";
import type { Game } from "../data/profile";

interface GameGalleryProps {
  games: Game[];
}

// Steam CDN helpers
function posterUrl(appId: string) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;
}
function gameplayBgUrl(appId: string) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/page_bg_generated_v6b.jpg`;
}

// ── 稳定粒子位置（不随渲染变化） ──
function useStableParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        w: 2 + Math.random() * 3,
        h: 2 + Math.random() * 3,
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 2,
      })),
    [count],
  );
}

function GameCard({ game, index }: { game: Game; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [gameplayLoaded, setGameplayLoaded] = useState(true);
  const particles = useStableParticles(6);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl cursor-pointer select-none"
      style={{
        height: 420,
        boxShadow: hovered
          ? `0 0 0 2px ${game.accentColor}40, 0 8px 40px ${game.accentColor}20, 0 4px 16px rgba(0,0,0,0.25)`
          : "0 2px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.45s ease, transform 0.45s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 预加载游玩截图（隐藏 img，用于检测加载失败） */}
      <img
        src={gameplayBgUrl(game.steamAppId)}
        alt=""
        className="hidden"
        onError={() => setGameplayLoaded(false)}
      />

      {/* ── 海报层（始终可见） ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${posterUrl(game.steamAppId)})`,
          backgroundColor: "#1a1a2e",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      {/* ── 游玩截图层（hover 淡入） ── */}
      {gameplayLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${gameplayBgUrl(game.steamAppId)})`,
            opacity: hovered ? 0.65 : 0,
            transform: hovered ? "scale(1.05)" : "scale(1.15)",
            transition:
              "opacity 0.5s ease, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      )}

      {/* ── 氛围暗角 ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.35) 100%)",
          opacity: hovered ? 0.5 : 0.85,
          transition: "opacity 0.45s ease",
        }}
      />

      {/* ── 底部渐变遮罩 ── */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "55%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
        }}
      />

      {/* ── 装饰粒子（hover 出现） ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.w,
              height: p.h,
              background: game.accentColor,
              left: p.left,
              top: p.top,
              animation: hovered
                ? `particleFloat ${p.duration}s ease-in-out infinite ${p.delay}s`
                : "none",
              boxShadow: `0 0 6px ${game.accentColor}`,
            }}
          />
        ))}
      </div>

      {/* ── 光效扫描线（hover 扫过） ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${game.accentColor}10 50%, transparent 100%)`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(-100%)",
          transition: "opacity 0.3s ease, transform 0.5s ease",
        }}
      />

      {/* ── 文字内容区 ── */}
      <div className="absolute inset-x-0 bottom-0 p-6 pb-5 z-10">
        {/* 英文标题 */}
        <p
          className="text-xs tracking-[0.2em] uppercase mb-2 font-medium transition-all duration-400"
          style={{
            color: game.accentColor,
            opacity: hovered ? 1 : 0.75,
            transform: hovered ? "translateY(0)" : "translateY(4px)",
          }}
        >
          {game.nameEn}
        </p>

        {/* 中文标题 */}
        <h3
          className="text-2xl font-serif font-bold text-white mb-3 transition-all duration-400"
          style={{
            transform: hovered ? "translateY(0)" : "translateY(2px)",
          }}
        >
          {game.name}
          {/* hover 时出现的光点 */}
          <span
            className="inline-block w-2 h-2 rounded-full ml-2 align-middle transition-all duration-400"
            style={{
              background: game.accentColor,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1)" : "scale(0)",
              boxShadow: `0 0 10px ${game.accentColor}, 0 0 20px ${game.accentColor}60`,
            }}
          />
        </h3>

        {/* 类型标签 */}
        <div className="flex flex-wrap gap-2 mb-3">
          {game.genre.split(" / ").map((g) => (
            <span
              key={g}
              className="text-[11px] px-2.5 py-0.5 rounded-full border transition-all duration-400"
              style={{
                color: hovered ? "#fff" : "rgba(255,255,255,0.65)",
                borderColor: hovered
                  ? `${game.accentColor}60`
                  : "rgba(255,255,255,0.12)",
                background: hovered
                  ? `${game.accentColor}18`
                  : "rgba(255,255,255,0.05)",
                backdropFilter: "blur(4px)",
              }}
            >
              {g}
            </span>
          ))}
        </div>

        {/* 描述（hover 展开） */}
        <p
          className="text-sm leading-relaxed transition-all duration-400 overflow-hidden"
          style={{
            color: "rgba(255,255,255,0.72)",
            maxHeight: hovered ? "120px" : "0px",
            opacity: hovered ? 1 : 0,
            marginTop: hovered ? "0" : "-8px",
          }}
        >
          {game.description}
        </p>
      </div>

      {/* ── 左上角序号 ── */}
      <div
        className="absolute top-4 left-4 z-10 transition-all duration-400"
        style={{ opacity: hovered ? 0 : 0.6 }}
      >
        <span
          className="text-5xl font-bold font-mono"
          style={{
            color: "rgba(255,255,255,0.08)",
            WebkitTextStroke: "1px rgba(255,255,255,0.15)",
          }}
        >
          {`0${index + 1}`}
        </span>
      </div>
    </div>
  );
}

export default function GameGallery({ games }: GameGalleryProps) {
  return (
    <>
      <style>{`
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
          25%  { transform: translateY(-14px) translateX(6px) scale(1.3); opacity: 0.9; }
          50%  { transform: translateY(-6px) translateX(-5px) scale(0.9); opacity: 0.4; }
          75%  { transform: translateY(-20px) translateX(2px) scale(1.2); opacity: 0.7; }
        }
      `}</style>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {games.map((game, i) => (
          <GameCard key={game.steamAppId} game={game} index={i} />
        ))}
      </div>
    </>
  );
}