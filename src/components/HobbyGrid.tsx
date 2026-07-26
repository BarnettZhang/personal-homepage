"use client";

import { cn } from "../utils/cn";

interface HobbyGridProps {
  hobbies: Array<{
    title: string;
    description: string;
    tags: string[];
    icon?: string;
  }>;
}

export default function HobbyGrid({ hobbies }: HobbyGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hobbies.map((hobby) => (
        <div key={hobby.title} className="glass glass-hover p-8 rounded-2xl group">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-2xl">
              {hobby.icon === "code" && "💻"}
              {hobby.icon === "camera" && "📷"}
              {hobby.icon === "gamepad" && "🎮"}
              {!hobby.icon && "✨"}
            </span>
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">{hobby.title}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{hobby.description}</p>

          <div className="flex flex-wrap gap-2">
            {hobby.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-gray-400 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
