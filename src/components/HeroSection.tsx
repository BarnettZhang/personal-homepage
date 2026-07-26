import { useEffect, useRef, useState } from "react";

interface HeroSectionProps {
  name: string;
  tagline: string;
  description: string;
}

export default function HeroSection({ name, tagline, description }: HeroSectionProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = tagline;
  const indexRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (indexRef.current < fullText.length) {
        setDisplayText(fullText.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-screen px-6 text-center pointer-events-none">
      {/* Gradient glow behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl" />

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6">
        <span className="gradient-text">{name}</span>
      </h1>

      <div className="h-10 md:h-12 mb-8">
        <p className="text-xl md:text-2xl text-gray-300 font-mono">
          {displayText}
          <span
            className={`inline-block w-0.5 h-6 md:h-7 bg-cyan-400 ml-1 align-middle ${
              isTyping ? "animate-pulse" : "opacity-0"
            }`}
          />
        </p>
      </div>

      <p className="text-gray-400 text-base md:text-lg max-w-lg">{description}</p>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
