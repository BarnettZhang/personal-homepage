"use client";

import type { WorkExperienceItem } from "../data/profile";

interface TimelineProps {
  items: WorkExperienceItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* 竖线 */}
      <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
           style={{ background: "linear-gradient(180deg, #c4a595 0%, #a8c0a1 50%, #c8a87c 100%)" }} />

      <div className="space-y-10">
        {items.map((item, index) => (
          <div
            key={item.year}
            className={`relative pl-14 md:pl-0 md:w-1/2 ${
              index % 2 === 0 ? "md:pr-14 md:ml-0" : "md:pl-14 md:ml-auto"
            }`}
          >
            {/* 圆点 */}
            <div
              className={`absolute top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-sage ring-4 ring-cream ${
                index % 2 === 0
                  ? "left-[0.32rem] md:left-auto md:right-[-0.33rem]"
                  : "left-[0.32rem] md:left-[-0.33rem]"
              }`}
            />

            <div className="card p-6">
              <span class="text-xs font-mono text-sage tracking-wide">{item.year}</span>
              <h3 class="text-base font-serif font-semibold text-ink mt-1.5 mb-2">
                {item.title}
                {item.company && (
                  <span class="text-ink-muted font-normal"> @ {item.company}</span>
                )}
              </h3>
              <p class="text-sm text-ink-light leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
