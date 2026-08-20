// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // 服务端渲染，让 middleware 能根据每个请求的 cookie 解析语言
  output: "server",
  adapter: vercel(),
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});
