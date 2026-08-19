import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/** 双语文本，与 src/i18n/types.ts 的 LocalizedString 保持一致 */
const localized = z.object({
  zh: z.string(),
  en: z.string(),
});

const hobbies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/hobbies" }),
  schema: z.object({
    title: localized,
    description: localized,
    icon: z.string().optional(),
    tags: z.array(localized).default([]),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { hobbies };
