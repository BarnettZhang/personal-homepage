"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../utils/cn";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export default function ScrollReveal({ children, className, direction = "up" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
  }[direction];

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 transition-all duration-700 ease-out",
        dirClass,
        "reveal-visible:opacity-100 reveal-visible:translate-y-0 reveal-visible:translate-x-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
