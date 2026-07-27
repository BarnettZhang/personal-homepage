"use client";

import type { TravelCity } from "../data/profile";

interface TravelGridProps {
  cities: TravelCity[];
}

export default function TravelGrid({ cities }: TravelGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cities.map((city) => (
        <div key={city.city} className="card p-6 group flex flex-col gap-3">
          {/* 城市名 + 国旗 */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">{city.emoji}</span>
            <div>
              <h3 className="text-lg font-serif font-semibold text-ink">
                {city.city}
              </h3>
              <p className="text-xs text-ink-muted">
                {city.country} · {city.year}
              </p>
            </div>
          </div>

          {/* 描述 */}
          <p className="text-sm text-ink-light leading-relaxed">
            {city.description}
          </p>
        </div>
      ))}
    </div>
  );
}
