import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const hobbies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/hobbies" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    github: z.string().url().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { hobbies, projects };
