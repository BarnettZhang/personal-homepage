// ============================================================
//  旅行照片解析器
//  将 profile.ts 中的照片标识（如 "/dubrovnik/IMG_2398.jpg"）
//  映射到 src/assets/travel 下的真实文件，交给 Astro 图片管线
//  在构建时生成 AVIF / WebP 多尺寸版本。
// ============================================================
import { getImage, type ImageMetadata } from "astro:assets";

// 预加载所有旅行照片（构建期），key 形如
//   "../assets/travel/dubrovnik/IMG_2398.jpg"
const photoModules = import.meta.glob<ImageMetadata>(
  "../assets/travel/**/*.{jpg,JPG,jpeg,webp,png}",
  { eager: true, import: "default" }
);

const ASSET_PREFIX = "/assets/travel/";

// 以 profile.ts 中的标识（去掉开头的 "/"）为 key 建立映射：
//   "/dubrovnik/IMG_2398.jpg" -> "dubrovnik/IMG_2398.jpg"
const photoMap = new Map<string, ImageMetadata>();
for (const [rawKey, meta] of Object.entries(photoModules)) {
  const normalized = rawKey.replace(/\\/g, "/");
  const idx = normalized.lastIndexOf(ASSET_PREFIX);
  const relKey = idx === -1 ? normalized : normalized.slice(idx + ASSET_PREFIX.length);
  photoMap.set(relKey, meta);
}

/**
 * 根据 profile.ts 中的照片标识解析出对应的图片资源。
 * 照片缺失时会在构建期直接抛错，避免线上出现死链。
 */
export function getTravelPhoto(photoPath: string): ImageMetadata {
  const key = photoPath.replace(/^\//, "");
  const meta = photoMap.get(key);
  if (!meta) {
    throw new Error(
      `Travel photo not found in src/assets/travel/: "${photoPath}"\n` +
        `Make sure the file exists (and matches the jpg/JPG extension).`
    );
  }
  return meta;
}

// ------------------------------------------------------------
//  灯箱大图：复用网格 1280w 的 AVIF/WebP 变体（相同转换参数，
//  构建时自动去重），避免额外生成大文件。
// ------------------------------------------------------------
export interface TravelPhotoLarge {
  avifSrc: string;
  webpSrc: string;
  fallbackSrc: string;
  width: number;
  height: number;
}

export async function getTravelPhotoLarge(
  photoPath: string
): Promise<TravelPhotoLarge> {
  const src = getTravelPhoto(photoPath);
  const [avif, webp] = await Promise.all([
    getImage({ src, width: 1280, format: "avif", quality: 80 }),
    getImage({ src, width: 1280, format: "webp", quality: 80 }),
  ]);
  return {
    avifSrc: avif.src,
    webpSrc: webp.src,
    fallbackSrc: webp.src,
    width: avif.attributes.width,
    height: avif.attributes.height,
  };
}
