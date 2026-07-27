// ============================================================
//  个人资料集中管理 — 修改这个文件即可更新全站内容
// ============================================================

export const profile = {
  name: "张子培",
  tagline: "B 端平台 & AI 应用前端开发。",
  description:
    "3 年前端开发经验，聚焦 B 端平台与 AI 应用。在这里记录我的项目和思考。",
  /** 个人简介段落，会逐段渲染 */
  bioParagraphs: [
    "3 年前端开发经验，聚焦 B 端平台与 AI 应用前端开发，\
具备复杂系统从需求分析、技术方案设计到开发上线的完整推进经验。\
熟悉 Vue、React、SvelteKit、Tiptap、Tailwind 等主流技术栈，\
擅长复杂交互、流式响应、富文本编辑器、前端工程化与性能优化。",

    "具备前端负责人经验，能够独立推动核心模块落地，\
并通过组件沉淀与研发规范建设提升团队交付效率。\
目前在中信银行总行软件开发中心担任 Web 前端开发工程师，\
主导智能企业助手、智控平台等核心系统的前端开发，支撑超过 2 万名内部用户使用。",

    "硕士毕业于帝国理工学院计算机科学专业，本科毕业于伦敦大学学院。\
拥有海外留学背景，具备流利的英语商务交流能力。\
工作之余喜欢摄影和游戏，偶尔也会研究一些有趣的独立开发项目。",
  ],
  avatar: "👨‍💻",
};

// -----------------------------------------------------------
//  工作履历
// -----------------------------------------------------------
export interface WorkExperienceItem {
  year: string;
  title: string;
  company?: string;
  description: string;
}

export const workExperience: WorkExperienceItem[] = [
  {
    year: "2023.03 — 至今",
    title: "Web 前端开发工程师",
    company: "中信银行总行软件开发中心",
    description:
      "主导智能企业助手、智控平台等核心系统的前端开发，交付深度研究、过程管理、\
富文本知识库等复杂功能模块，支撑超过 2 万名内部用户使用。\
负责前端工程化与组件化建设，推动超过 20 个功能模块从需求到上线的完整落地。\
组织代码评审和技术讨论，参与外包团队技术面试与考核。",
  },
  {
    year: "2021.09 — 2022.09",
    title: "计算机科学与技术 硕士",
    company: "帝国理工学院",
    description:
      "二等一级荣誉学位。主修软件工程、算法、计算机视觉、计算机架构、分布式系统。\
在英期间系统提升了计算机科学理论基础与工程实践能力。",
  },
  {
    year: "2017.09 — 2022.06",
    title: "生物医学工程 本科",
    company: "伦敦大学学院",
    description:
      "一等荣誉学位。四年制本硕连读项目，培养了跨学科的工程思维与问题解决能力。\
为后续转行计算机科学打下了扎实的数理基础。",
  },
];

// -----------------------------------------------------------
//  旅行过的城市
// -----------------------------------------------------------
export interface TravelCity {
  city: string;
  country: string;
  emoji: string;
  year: string;
  description: string;
}

export const travelCities: TravelCity[] = [
  {
    city: "伦敦",
    country: "英国",
    emoji: "🇬🇧",
    year: "2017 — 2022",
    description:
      "在这里度过了五年求学时光。从 UCL 的 Bloomsbury 校区到帝国理工的 South Kensington，\
泰晤士河畔的日落、大英博物馆的午后、东区的街头艺术——伦敦教会我的，远不止书本上的知识。",
  },
  {
    city: "东京",
    country: "日本",
    emoji: "🗼",
    year: "2024",
    description:
      "在涩谷的十字路口感受都市脉搏，在浅草寺的雷门下仰望千年风韵。\
秋叶原的霓虹与代代木公园的静谧，是这座城市的两种心跳。",
  },
  {
    city: "清迈",
    country: "泰国",
    emoji: "🏯",
    year: "2023",
    description:
      "古城墙下慢悠悠的午后，素贴山上俯瞰整座城市的日落。\
周末夜市的手工艺品和芒果糯米饭，构成了最熨帖的回忆。",
  },
  {
    city: "爱丁堡",
    country: "英国",
    emoji: "🏰",
    year: "2019",
    description:
      "卡尔顿山上的希腊风格国家纪念碑，皇家英里大道两旁的中世纪建筑。\
八月的军乐节和艺穗节让整座城市变成一场狂欢——来英国一定不要错过。",
  },
  {
    city: "京都",
    country: "日本",
    emoji: "⛩️",
    year: "2019",
    description:
      "伏见稻荷的千本鸟居延绵到山顶，岚山的竹林小径幽深如画。\
在花见小路偶遇真正的艺伎——那一抹朱红是整个旅途的点睛之笔。",
  },
  {
    city: "北京",
    country: "中国",
    emoji: "🏮",
    year: "2023 — 至今",
    description:
      "生活和工作的城市。胡同里的烟火气、景山公园俯瞰故宫的视角、\
秋天钓鱼台银杏大道的金黄——北京的厚重需要慢慢品味。",
  },
];

// -----------------------------------------------------------
//  玩过的游戏
// -----------------------------------------------------------
export interface Game {
  name: string;
  genre: string;
  description: string;
  highlight?: boolean;
}

export const games: Game[] = [
  {
    name: "风暴英雄",
    genre: "MOBA",
    description:
      "暴雪全家桶的情怀之作。虽然已经进入维护模式，但那些与好友开黑的夜晚\
和团战翻盘的瞬间，是无可替代的游戏记忆。最爱玩阿巴瑟和希尔瓦娜斯。",
    highlight: true,
  },
  {
    name: "塞尔达传说：王国之泪",
    genre: "开放世界 / 动作冒险",
    description:
      "从天空岛一跃而下，穿过云层俯瞰海拉鲁大陆。究极手的创造自由度\
让人惊叹——林克真是史上最强工程师。",
    highlight: true,
  },
  {
    name: "艾尔登法环",
    genre: "动作 RPG",
    description:
      "狭间之地的每一寸土地都充满危险与惊喜。在无数次「YOU DIED」之后，\
击败玛莲妮亚的那一刻，手掌出汗，心跳加速。",
  },
  {
    name: "星露谷物语",
    genre: "模拟经营",
    description:
      "种田、钓鱼、挖矿、恋爱——简单像素下是一个让人忘记时间的世界。\
每当压力大的时候就会回鹈鹕镇住几天。",
  },
  {
    name: "空洞骑士",
    genre: "类银河城 / 动作",
    description:
      "圣巢的每一处角落都被手绘的美丽与忧伤填满。\
在白宫跳跳乐中磨炼出的耐心，大概比代码调试还多。",
  },
  {
    name: "荒野大镖客：救赎 2",
    genre: "开放世界 / 剧情",
    description:
      "亚瑟·摩根的故事是关于救赎的最美悲剧。在西部荒野中策马奔腾，\
看日出日落，这是一个让人愿意慢下来沉浸其中的世界。",
  },
];

// -----------------------------------------------------------
//  技能
// -----------------------------------------------------------
export interface Skill {
  name: string;
  level: number; // 0-100
}

export const skills: Skill[] = [
  { name: "Vue 2 / 3", level: 92 },
  { name: "React", level: 80 },
  { name: "SvelteKit", level: 80 },
  { name: "TypeScript", level: 88 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Tiptap", level: 85 },
  { name: "ECharts / 可视化", level: 82 },
  { name: "SSE / WebSocket", level: 78 },
  { name: "Docker / Nginx", level: 72 },
  { name: "CI / CD", level: 70 },
];

// -----------------------------------------------------------
//  社交链接
// -----------------------------------------------------------
export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

// -----------------------------------------------------------
//  分类技能（用于工作页标签展示）
// -----------------------------------------------------------
export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "前端框架",
    items: ["Vue 2 / 3", "React", "SvelteKit", "TypeScript"],
  },
  {
    category: "UI & 编辑器",
    items: ["Tailwind CSS", "Tiptap", "Element UI", "Vant UI"],
  },
  {
    category: "可视化 & 交互",
    items: ["ECharts", "GridStack", "LogicFlow", "Markdown"],
  },
  {
    category: "AI & 实时通信",
    items: ["SSE", "WebSocket", "Socket.IO", "Open WebUI", "Claude Code"],
  },
  {
    category: "工程化",
    items: ["Vite", "Jenkins", "Docker", "Nginx", "CI/CD"],
  },
];

// -----------------------------------------------------------
//  项目亮点（用于工作页展示）
// -----------------------------------------------------------
export interface ProjectHighlight {
  name: string;
  emoji: string;
  role: string;
  description: string;
  tech: string[];
}

export const projectHighlights: ProjectHighlight[] = [
  {
    name: "智能企业助手",
    emoji: "🧠",
    role: "Web 前端负责人 · 2025.03 — 2026.06",
    description:
      "面向全行员工的 AI 大模型体验平台。主导深度研究、会话附件上传、\
联网搜索、加密会话、AI 绘图等核心功能的交互设计与前端开发。\
围绕流式响应、长会话渲染等复杂场景进行前端封装与优化。",
    tech: ["SvelteKit", "Tiptap", "Socket.IO", "Tailwind"],
  },
  {
    name: "智控平台",
    emoji: "📊",
    role: "Web 前端负责人 · 2023.06 — 2025.02",
    description:
      "内部过程管理平台，覆盖过程管理、量化考核、知识库等核心模块。\
主导前端技术选型与架构演进，基于 LogicFlow 实现可视化工作流配置，\
负责前端工程化体系建设（Docker、Nginx、Jenkins）。",
    tech: ["Vue 2/3", "Element UI", "Tiptap", "LogicFlow", "ECharts"],
  },
];

// -----------------------------------------------------------
//  社交链接
// -----------------------------------------------------------
export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    url: "https://github.com/BarnettZhang",
    label: "GitHub",
  },
  {
    platform: "email",
    url: "mailto:zhangzipei0913@hotmail.com",
    label: "Email",
  },
];
