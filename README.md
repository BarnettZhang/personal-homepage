# Personal Homepage

基于 **Astro** 构建的个人主页 / 作品集网站，整合工作经历、技能、兴趣爱好与旅行足迹。全站数据集中维护在 `src/data/profile.ts`，修改一处即可更新全站内容。

## 功能特色

- **首页**：首屏 3D 粒子涡旋动画（Three.js），搭配导航卡片引导浏览
- **明暗主题**：全站双主题配色，跟随系统偏好并支持手动切换（localStorage 记忆）
- **工作**：工作经历、项目亮点、技能标签分类展示
- **兴趣爱好**：游戏画廊使用 Steam 海报做卡片背景，悬停即播放 HLS 预告片，点击进入全屏播放
- **旅行**：3D 地球标记到访城市，每个城市有独立详情页，展示景点介绍与摄影作品（照片在构建时自动压缩为 AVIF/WebP 多尺寸版本，点击可全屏预览、左右切换）
- **Steam 集成**（可选）：构建时通过 Steam Web API 拉取真实游戏库数据并缓存为静态 JSON

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Astro 7、React 19、TypeScript |
| 样式 | Tailwind CSS 4（Vite 插件） |
| 3D 可视化 | Three.js、@react-three/fiber、drei、postprocessing |
| 动效 | GSAP、ScrollReveal |
| 视频 | hls.js（预告片 HLS 流播放） |
| 部署 | @astrojs/vercel（SSR serverless） |

## 快速开始

环境要求：**Node.js >= 22.12**

```sh
npm install
```

启动开发服务器（后台模式）：

```sh
astro dev --background
```

常用命令：

| 命令 | 说明 |
| --- | --- |
| `astro dev --background` | 后台启动开发服务器（`astro dev status` / `astro dev logs` / `astro dev stop` 管理） |
| `npm run build` | 构建生产版本到 `dist/`（构建前自动拉取 Steam 数据） |
| `npm run preview` | 本地预览构建产物 |
| `npm run fetch-steam` | 手动拉取 Steam 游戏库数据 |

## Steam 游戏库（可选）

构建时通过 Steam Web API 拉取玩家资料与游戏库，缓存到 `src/data/steam-games.json`，并自动过滤精选游戏避免重复展示。

在项目根目录创建 `.env` 并配置：

```env
STEAM_API_KEY=你的SteamWebAPIKey
STEAM_ID=你的Steam64位ID
```

要求 Steam 个人资料公开（游戏详情可见）。API Key 可免费申请：<https://steamcommunity.com/dev/apikey>

> 注意：`npm run build` 的 `prebuild` 阶段会执行数据拉取，若未配置 `.env` 构建会失败；不需要该功能时可删除 `package.json` 中的 `prebuild` 脚本。

## 目录结构

```text
├── public/                  # 静态资源：简历 PDF、favicon
├── scripts/
│   └── fetch-steam.ts       # 构建时拉取 Steam 数据
└── src/
    ├── assets/travel/       # 旅行照片原图（构建时经 astro:assets 优化输出）
    ├── components/          # 页面组件（Hero、游戏画廊、3D 场景等）
    │   └── three/           # Three.js 场景：地球、粒子涡旋等
    ├── data/
    │   ├── profile.ts       # ★ 全站内容唯一数据源
    │   └── steam-games.json # Steam 拉取结果的缓存
    ├── layouts/             # 页面布局（字体、SEO 元信息）
    ├── pages/               # 首页 / 工作 / 爱好 / 旅行 / Steam API
    └── styles/              # 全局样式
```

## 内容维护

大部分内容都在 `src/data/profile.ts` 中维护：

- **个人信息**：姓名（站点显示名）、简介、个人介绍段落
- **工作**：工作经历、项目亮点、技能分类
- **旅行**：城市列表、经纬度（用于 3D 地球定位）、景点与照片标识
- **游戏**：精选游戏卡片（Steam App ID、强调色、预告片地址）
- **社交链接**：GitHub、邮箱等

新增旅行照片时：把原图放到 `src/assets/travel/<城市>/` 下，并在 `profile.ts` 中引用
（如 `/dubrovnik/IMG_2398.jpg`）。构建时 `src/lib/photos.ts` 会校验文件是否存在，
并自动生成 AVIF / WebP 三种宽度的响应式版本，缺失或拼写错误会直接在构建期报错。

## 部署

使用 Vercel 部署：项目根目录直接导入即可，Vercel 会自动识别 Astro 并执行 `astro build`。SSR 产物由 `@astrojs/vercel` 适配器生成 serverless 函数，无需配置入口文件。若未配置 Steam 环境变量，`fetch-steam.ts` 会自动跳过拉取，不影响构建。
