"use client";

import type { Game } from "../data/profile";

interface GameGalleryProps {
  games: Game[];
}

export default function GameGallery({ games }: GameGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {games.map((game) => (
        <div
          key={game.name}
          className={`card p-6 group flex flex-col gap-3 ${
            game.highlight
              ? "ring-1 ring-amber/30 border-amber/20"
              : ""
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-serif font-semibold text-ink flex items-center gap-2">
              {game.name}
              {game.highlight && (
                <span className="text-amber text-xs" title="最爱">
                  ★
                </span>
              )}
            </h3>
            <span className="tag shrink-0">{game.genre}</span>
          </div>

          <p className="text-sm text-ink-light leading-relaxed">
            {game.description}
          </p>
        </div>
      ))}
    </div>
  );
}
