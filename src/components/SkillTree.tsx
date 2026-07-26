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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {skills.map((skill) => (
        <div key={skill.name} className="glass glass-hover p-5 text-center group">
          <div className="relative w-16 h-16 mx-auto mb-3">
            {/* Circular progress */}
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                className="text-white/5"
                strokeWidth="3"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="url(#skillGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${(skill.level / 100) * 176} 176`}
                className="transition-all duration-1000 ease-out group-hover:opacity-100"
              />
              <defs>
                <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              {skill.level}%
            </span>
          </div>
          <h4 className="text-sm font-medium text-gray-300">{skill.name}</h4>
        </div>
      ))}
    </div>
  );
}
