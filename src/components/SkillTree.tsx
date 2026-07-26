"use client";

const skills = [
  { name: "TypeScript", level: 95 },
  { name: "React", level: 90 },
  { name: "Vue", level: 80 },
  { name: "Three.js", level: 75 },
  { name: "Node.js", level: 70 },
  { name: "CSS / Tailwind", level: 92 },
  { name: "Rust", level: 35 },
  { name: "Python", level: 60 },
  { name: "WebGL / GLSL", level: 65 },
  { name: "Git / DevOps", level: 78 },
];

export default function SkillTree() {
  return (
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {skills.map((skill) => (
        <div key={skill.name} class="card p-5 text-center group">
          {/* 环形进度 */}
          <div class="relative w-14 h-14 mx-auto mb-3">
            <svg class="w-14 h-14 -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32" cy="32" r="26"
                fill="none" stroke="#f0ece6" stroke-width="3"
              />
              <circle
                cx="32" cy="32" r="26"
                fill="none"
                stroke="url(#skillGrad)"
                stroke-width="3"
                stroke-linecap="round"
                stroke-dasharray={`${(skill.level / 100) * 163} 163`}
                class="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#7d9b76" />
                  <stop offset="50%" stop-color="#c8a87c" />
                  <stop offset="100%" stop-color="#c4a595" />
                </linearGradient>
              </defs>
            </svg>
            <span class="absolute inset-0 flex items-center justify-center text-xs font-medium text-ink">
              {skill.level}
            </span>
          </div>
          <h4 class="text-sm font-medium text-ink">{skill.name}</h4>
        </div>
      ))}
    </div>
  );
}
