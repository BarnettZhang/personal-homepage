import { useEffect, useRef, useState } from "react";

interface HeroSectionProps {
  name: string;
  tagline: string;
  description: string;
}

export default function HeroSection({ name, tagline, description }: HeroSectionProps) {
  const [displayText, setDisplayText] = useState("");
  const fullText = tagline;
  const indexRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (indexRef.current < fullText.length) {
        setDisplayText(fullText.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(timer);
      }
    }, 90);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-screen px-6 text-center pointer-events-none">
      {/* 柔光装饰 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full blur-3xl opacity-30"
           style={{ background: "radial-gradient(ellipse, #e8efe4 0%, #f5ede8 40%, transparent 70%)" }} />

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-6 text-ink">
        {name}
      </h1>

      <div className="h-10 md:h-12 mb-8">
        <p className="text-lg md:text-xl text-ink-muted font-sans tracking-wide">
          {displayText}
          <span className="inline-block w-px h-5 md:h-6 bg-sage ml-1.5 align-middle animate-pulse opacity-60" />
        </p>
      </div>

      <p className="text-ink-light/80 text-base md:text-lg max-w-md leading-relaxed">
        {description}
      </p>

      {/* 向下滚动提示 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <svg
          className="w-5 h-5 text-ink-muted/40 animate-bounce"
          fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
