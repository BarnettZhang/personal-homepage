"use client";

interface HobbyGridProps {
  hobbies: Array<{
    title: string;
    description: string;
    tags: string[];
    icon?: string;
  }>;
}

const iconMap: Record<string, string> = {
  code: "💻",
  camera: "📷",
  gamepad: "🎮",
};

const iconBgMap: Record<string, string> = {
  code: "bg-sage-subtle",
  camera: "bg-rose-subtle",
  gamepad: "bg-amber-50",
};

export default function HobbyGrid({ hobbies }: HobbyGridProps) {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {hobbies.map((hobby) => (
        <div key={hobby.title} class="card p-8 group">
          {/* 图标 */}
          <div
            class={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5
                     group-hover:scale-110 transition-transform duration-300
                     ${hobby.icon ? iconBgMap[hobby.icon] || "bg-cream-warm" : "bg-cream-warm"}`}
          >
            <span class="text-2xl">
              {hobby.icon ? iconMap[hobby.icon] || "✨" : "✨"}
            </span>
          </div>

          <h3 class="text-lg font-serif font-semibold text-ink mb-2">
            {hobby.title}
          </h3>
          <p class="text-sm text-ink-light mb-4 leading-relaxed">
            {hobby.description}
          </p>

          <div class="flex flex-wrap gap-2">
            {hobby.tags.map((tag) => (
              <span key={tag} class="tag">{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
