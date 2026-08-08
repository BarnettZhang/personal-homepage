// ============================================================
//  TravelPhotoLightbox — 旅行照片灯箱
//  页面级事件委托：点击任意带 data-photo-index 的图片打开全屏预览，
//  支持左右按钮切换、方向键导航、ESC 关闭、相邻图片预加载。
// ============================================================
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface TravelLightboxPhoto {
  avifSrc: string;
  webpSrc: string;
  fallbackSrc: string;
  alt: string;
  caption: string;
}

interface Props {
  photos: TravelLightboxPhoto[];
}

export default function TravelPhotoLightbox({ photos }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );

  // 事件委托：点击网格中的任意图片打开灯箱
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest<HTMLElement>("[data-photo-index]");
      if (!el) return;
      const idx = Number(el.dataset.photoIndex);
      if (Number.isInteger(idx)) setIndex(idx);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // 键盘导航 + 锁滚动 + 聚焦关闭按钮
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  // 预加载相邻图片，切换更跟手
  useEffect(() => {
    if (index === null || photos.length <= 1) return;
    const preload = (i: number) => {
      const img = new Image();
      img.src = photos[i].avifSrc;
    };
    preload((index + 1) % photos.length);
    preload((index - 1 + photos.length) % photos.length);
  }, [index, photos]);

  if (index === null) return null;

  const photo = photos[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={`照片预览 ${index + 1} / ${photos.length}`}
      style={{
        background: "rgba(8, 12, 20, 0.92)",
        backdropFilter: "blur(12px)",
        animation: "travelFadeIn 0.25s ease",
      }}
    >
      {/* 关闭按钮 */}
      <button
        ref={closeButtonRef}
        onClick={close}
        aria-label="关闭预览"
        className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X size={18} />
        ESC
      </button>

      {/* 上一张 */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="上一张"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
        >
          <ChevronLeft size={26} />
        </button>
      )}

      {/* 图片 + 信息 */}
      <div
        className="relative max-w-[92vw] flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-center"
          style={{
            animation: "travelModalIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <picture>
            <source srcSet={photo.avifSrc} type="image/avif" />
            <source srcSet={photo.webpSrc} type="image/webp" />
            <img
              key={photo.avifSrc}
              src={photo.fallbackSrc}
              alt={photo.alt}
              className="max-w-[92vw] max-h-[78vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            />
          </picture>
        </div>

        <div className="flex items-center gap-3 text-sm select-none">
          <span className="font-mono text-white/80">
            {index + 1} / {photos.length}
          </span>
          <span className="text-white/55">{photo.caption}</span>
        </div>
      </div>

      {/* 下一张 */}
      {photos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="下一张"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
        >
          <ChevronRight size={26} />
        </button>
      )}

      <style>{`
        @keyframes travelFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes travelModalIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
