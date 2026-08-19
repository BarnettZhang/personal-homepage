"use client";

interface SkillCategory {
  category: string;
  items: string[];
}

interface SkillTagsProps {
  categories: SkillCategory[];
}

export default function SkillTags({ categories }: SkillTagsProps) {
  return (
    <div className="space-y-6">
      {categories.map((group) => (
        <div key={group.category} className="flex flex-wrap items-baseline gap-3">
          <span className="text-xs font-medium text-ink-muted w-28 shrink-0 pt-0.5">
            {group.category}
          </span>
          <div className="flex flex-wrap gap-2">
            {group.items.map((skill) => (
              <span key={skill} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
