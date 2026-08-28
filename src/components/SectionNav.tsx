"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../i18n/types";
import { t } from "../i18n/ui";

// ============================================================
//  SectionNav — 页面右侧透明悬浮目录
// ============================================================
export default function SectionNav({ lang }: { lang: Locale }) {
  const sections = [
    { id: "games", label: t(lang, "hobbies.navGames") },
    { id: "anime", label: t(lang, "hobbies.navAnime") },
  ];

  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 120;
      let current = "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= pos) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40"
      aria-label={t(lang, "hobbies.navLabel")}
    >
      <div className="flex flex-col items-end gap-0.5 rounded-2xl border border-border/60 bg-cream/50 backdrop-blur-md px-2 py-2.5 shadow-sm">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => goTo(s.id)}
              className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs tracking-widest transition-all duration-300 cursor-pointer"
              style={{
                color: isActive ? "var(--sage)" : "var(--ink-muted)",
              }}
            >
              <span
                className="transition-all duration-300 group-hover:tracking-[0.18em]"
                style={{
                  color: "inherit",
                }}
              >
                {s.label}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                style={{
                  background: isActive
                    ? "var(--sage)"
                    : "transparent",
                  border: `1px solid ${
                    isActive ? "var(--sage)" : "var(--ink-muted)"
                  }`,
                }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}