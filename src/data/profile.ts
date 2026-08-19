// ============================================================
//  个人资料集中管理 — 修改这个文件即可更新全站内容
//  所有文案字段均为 { zh, en } 双语结构
// ============================================================
import type { LocalizedString } from "../i18n/types";

export const profile = {
  name: "ZZP",
  tagline: {
    zh: "B 端平台 & AI 应用前端开发。",
    en: "Frontend developer for B2B platforms & AI applications.",
  },
  description: {
    zh: "3 年前端开发经验，聚焦 B 端平台与 AI 应用。在这里记录我的项目和思考。",
    en: "3 years of frontend experience, focused on B2B platforms and AI applications. This is where I document my projects and thoughts.",
  },
  /** 个人简介段落，会逐段渲染 */
  bioParagraphs: [
    {
      zh: "3 年前端开发经验，聚焦 B 端平台与 AI 应用前端开发，具备复杂系统从需求分析、技术方案设计到开发上线的完整推进经验。熟悉 Vue、React、SvelteKit、Tiptap、Tailwind 等主流技术栈，擅长复杂交互、流式响应、富文本编辑器、前端工程化与性能优化。",
      en: "3 years of frontend experience focused on B2B platforms and AI applications, with end-to-end delivery experience across complex systems — from requirements analysis and technical design to development and launch. Proficient in Vue, React, SvelteKit, Tiptap, Tailwind and other mainstream stacks, with expertise in complex interactions, streaming responses, rich-text editors, frontend engineering and performance optimization.",
    },
    {
      zh: "具备前端负责人经验，能够独立推动核心模块落地，并通过组件沉淀与研发规范建设提升团队交付效率。目前在中信银行总行软件开发中心担任 Web 前端开发工程师，主导智能企业助手、智控平台等核心系统的前端开发，支撑超过 2 万名内部用户使用。",
      en: "With frontend-lead experience, I independently drive core modules to delivery and improve team efficiency through component libraries and engineering standards. I currently work as a Web frontend engineer at the Software Development Center of China CITIC Bank, leading frontend development for core systems like the Intelligent Enterprise Assistant and the Smart Control Platform, serving over 20,000 internal users.",
    },
    {
      zh: "硕士毕业于帝国理工学院计算机科学专业，本科毕业于伦敦大学学院。拥有海外留学背景，具备流利的英语商务交流能力。工作之余喜欢摄影和游戏，偶尔也会研究一些有趣的独立开发项目。",
      en: "I hold a Master's degree in Computer Science from Imperial College London and a Bachelor's degree from University College London. With an overseas education background and fluent business English, I enjoy photography and gaming in my spare time, occasionally exploring fun indie development projects.",
    },
  ],
  avatar: "👨‍💻",
};

// -----------------------------------------------------------
//  工作履历
// -----------------------------------------------------------
export interface WorkExperienceItem {
  year: LocalizedString;
  title: LocalizedString;
  company?: LocalizedString;
  description: LocalizedString;
  /** 用于区分「工作」与「教育」两类条目 */
  type: "work" | "education";
}

export const workExperience: WorkExperienceItem[] = [
  {
    year: { zh: "2023.03 — 至今", en: "2023.03 — Present" },
    title: { zh: "Web 前端开发工程师", en: "Web Frontend Engineer" },
    company: { zh: "中信银行总行软件开发中心", en: "Software Development Center, China CITIC Bank" },
    description: {
      zh: "主导智能企业助手、智控平台等核心系统的前端开发，交付深度研究、过程管理、富文本知识库等复杂功能模块，支撑超过 2 万名内部用户使用。负责前端工程化与组件化建设，推动超过 20 个功能模块从需求到上线的完整落地。组织代码评审和技术讨论，参与外包团队技术面试与考核。",
      en: "Lead frontend development for core systems including the Intelligent Enterprise Assistant and Smart Control Platform, delivering complex modules such as deep research, process management, and rich-text knowledge bases for over 20,000 internal users. Own frontend engineering and componentization, driving 20+ modules from requirements to launch. Organize code reviews and technical discussions, and participate in vendor team interviews and assessments.",
    },
    type: "work",
  },
  {
    year: { zh: "2021.09 — 2022.09", en: "2021.09 — 2022.09" },
    title: { zh: "计算机科学与技术 硕士", en: "MSc Computer Science" },
    company: { zh: "帝国理工学院", en: "Imperial College London" },
    description: {
      zh: "二等一级荣誉学位。主修软件工程、算法、计算机视觉、计算机架构、分布式系统。在英期间系统提升了计算机科学理论基础与工程实践能力。",
      en: "Upper Second Class Honours. Focused on software engineering, algorithms, computer vision, computer architecture, and distributed systems, deepening both the theoretical foundations and engineering practice of computer science.",
    },
    type: "education",
  },
  {
    year: { zh: "2017.09 — 2022.06", en: "2017.09 — 2022.06" },
    title: { zh: "生物医学工程 本科", en: "BEng Biomedical Engineering" },
    company: { zh: "伦敦大学学院", en: "University College London" },
    description: {
      zh: "一等荣誉学位。四年制本硕连读项目，培养了跨学科的工程思维与问题解决能力。为后续转行计算机科学打下了扎实的数理基础。",
      en: "First Class Honours. A four-year integrated programme that cultivated cross-disciplinary engineering thinking and problem-solving, laying a solid quantitative foundation for the later pivot into computer science.",
    },
    type: "education",
  },
];

// -----------------------------------------------------------
//  工作要点（用于工作页主卡片）
// -----------------------------------------------------------
export const workHighlights: LocalizedString[] = [
  {
    zh: "主导智能企业助手、智控平台等核心系统前端开发，支撑超过 2 万名内部用户使用",
    en: "Lead frontend development for the Intelligent Enterprise Assistant and Smart Control Platform, serving 20,000+ internal users",
  },
  {
    zh: "负责复杂交互场景的前端实现与体验优化，覆盖流式输出、富文本编辑、工作流配置、可视化面板等方向",
    en: "Own implementation and UX optimization for complex interactions — streaming output, rich-text editing, workflow configuration, and visual dashboards",
  },
  {
    zh: "负责前端工程化与组件化建设，搭建可复用组件能力并推动开发规范统一",
    en: "Drive frontend engineering and componentization — building reusable components and unifying development standards",
  },
  {
    zh: "推动超过 20 个功能模块从需求澄清、方案设计到开发上线的完整落地",
    en: "Ship 20+ feature modules end-to-end, from requirements clarification and design to development and launch",
  },
  {
    zh: "组织代码评审和技术讨论，参与外包团队技术面试与考核",
    en: "Organize code reviews and technical discussions; participate in vendor team interviews and assessments",
  },
];

// -----------------------------------------------------------
//  旅行过的城市
// -----------------------------------------------------------
export interface TravelCity {
  city: LocalizedString;
  /** URL 友好的英文标识 */
  slug: string;
  country: LocalizedString;
  emoji: string;
  year: string;
  description: LocalizedString;
  /** 经纬度，用于 3D 地球定位 */
  lat: number;
  lng: number;
  /** 景点列表 */
  attractions: Attraction[];
  /** 照片列表（URL 或路径） */
  photos: string[];
}

export interface Attraction {
  name: LocalizedString;
  description: LocalizedString;
  highlight?: boolean;
  /** 该景点对应的照片（相对于 public 的路径） */
  photos: string[];
}

export const travelCities: TravelCity[] = [
  {
    city: { zh: "杜布罗夫尼克", en: "Dubrovnik" },
    slug: "dubrovnik",
    country: { zh: "克罗地亚", en: "Croatia" },
    emoji: "🏰",
    year: "2024",
    lat: 42.6507,
    lng: 18.0944,
    description: {
      zh: "亚得里亚海的明珠，君临城的故事在这里上演。古城墙环绕的老城，橙红色屋顶在阳光下熠熠生辉，每一块石板路都诉说着千年的故事。",
      en: "The pearl of the Adriatic, where the tale of King's Landing unfolds. The old town, ringed by ancient walls, glows under its orange-red rooftops in the sunlight, and every cobblestone whispers stories of a thousand years.",
    },
    attractions: [
      {
        name: { zh: "Lovrijenac 堡垒", en: "Lovrijenac Fortress" },
        description: {
          zh: "矗立在 37 米高海崖上的古老堡垒，是《权力的游戏》红堡的取景地。穿过拱形石门，内部的石砌庭院与垛口框住一片蔚蓝的亚得里亚海；从外侧回望，整座堡垒像一头灰色的狮子蹲伏在浪花拍打的悬崖之上。",
          en: "An ancient fortress perched atop a 37-metre sea cliff, filming location of the Red Keep in Game of Thrones. Through its arched stone gate, the stone courtyards and battlements frame a swathe of azure Adriatic; from the outside, the fortress crouches like a grey lion over the wave-lashed cliff.",
        },
        highlight: true,
        photos: ["/dubrovnik/IMG_2398.jpg", "/dubrovnik/IMG_2414.jpg"],
      },
      {
        name: { zh: "杜布罗夫尼克老港", en: "Dubrovnik Old Port" },
        description: {
          zh: "黄昏的蓝调时刻，渔船与游艇静静地泊在港湾里，水面像一面深蓝色的镜子。对岸的山坡上，老城房屋的灯火一盏盏亮起，把海岸线缝成一条温暖的金线。",
          en: "At the blue hour of dusk, fishing boats and yachts rest quietly in the harbour, the water a deep-blue mirror. On the hillside opposite, the lights of the old town's houses come on one by one, stitching the coastline into a warm thread of gold.",
        },
        photos: ["/dubrovnik/IMG_2373.jpg"],
      },
      {
        name: { zh: "耶稣会阶梯", en: "Jesuit Staircase" },
        description: {
          zh: "巴洛克式的宽阔石阶从山顶的耶稣会教堂一直延伸到老城腹地。站在阶梯顶端向下望，两侧是暖黄色的石墙和零星的市集摊位，行人像电影里的剪影一样在石阶上起落。",
          en: "A broad Baroque staircase sweeps from the Jesuit church at the top of the hill down into the heart of the old town. From the top, warm-yellow stone walls and scattered market stalls line the descent, and passers-by rise and fall on the steps like silhouettes from a film.",
        },
        photos: ["/dubrovnik/IMG_2446.jpg"],
      },
      {
        name: { zh: "亚得里亚海日落", en: "Adriatic Sunset" },
        description: {
          zh: "太阳沉向海的尽头，天空被染成橙红与紫罗兰的渐变色。远处的海岸线隐没在深绿的松林里，度假屋的轮廓在余晖中变得柔和；有时云层在低空翻涌，像一出无声的戏剧在天幕上谢幕。",
          en: "The sun sinks toward the edge of the sea, staining the sky in a gradient of orange-red and violet. The distant coastline fades into dark-green pine forests, and the outlines of holiday homes soften in the afterglow; at times clouds surge low overhead, like a wordless drama taking its final bow across the sky.",
        },
        photos: ["/dubrovnik/IMG_2424.jpg", "/dubrovnik/IMG_2426.jpg"],
      },
    ],
    photos: [
      "/dubrovnik/IMG_2373.jpg",
      "/dubrovnik/IMG_2398.jpg",
      "/dubrovnik/IMG_2414.jpg",
      "/dubrovnik/IMG_2424.jpg",
      "/dubrovnik/IMG_2426.jpg",
      "/dubrovnik/IMG_2446.jpg",
    ],
  },
  {
    city: { zh: "苏格兰", en: "Scotland" },
    slug: "scotland",
    country: { zh: "英国", en: "United Kingdom" },
    emoji: "🏴",
    year: "2019",
    lat: 56.0,
    lng: -3.7,
    description: {
      zh: "从爱丁堡城堡踞守的死火山岩，到格拉斯哥维多利亚时代的红砖街巷——苏格兰用一种苍凉而粗犷的美，把中世纪的记忆、高地的风、和工业时代的幽默一起装进了这块土地。",
      en: "From the extinct volcanic rock crowned by Edinburgh Castle to Glasgow's Victorian red-brick streets — Scotland packs the memory of the Middle Ages, the wind of the Highlands, and the humour of the industrial age into one wild, austere land.",
    },
    attractions: [
      {
        name: { zh: "爱丁堡城堡", en: "Edinburgh Castle" },
        description: {
          zh: "死火山 Castle Rock 的顶端，这座城堡已经守卫了爱丁堡近千年。雾气中的城门上方，金色的狮子纹章与「NEMO ME IMPUNE LACESSIT」的格言熠熠生辉；从王子街远眺，整座城堡像一座灰色的王冠戴在峭壁之上，皇家苏格兰灰龙骑兵团纪念碑的骑马雕像守望着它。",
          en: "Atop the dead volcano Castle Rock, this castle has guarded Edinburgh for nearly a thousand years. Above the mist-shrouded gate, the golden lion crest and the motto 'NEMO ME IMPUNE LACESSIT' gleam; seen from Princes Street, the castle sits like a grey crown on the crag, watched over by the equestrian statue of the Royal Scots Greys monument.",
        },
        highlight: true,
        photos: ["/scotland/IMG_5282.jpg", "/scotland/IMG_5415.jpg"],
      },
      {
        name: { zh: "荷里路德修道院", en: "Holyrood Abbey" },
        description: {
          zh: "十二世纪奥古斯丁修道院的遗迹，高耸的哥特式花窗如今只剩下石框，像一幅镂空的画框把天空裁成几何图案。残破的立柱与拱门在潮湿的地面上投下长长的影子，雨滴积成小水洼，倒映着几个世纪的兴衰。",
          en: "The ruins of a twelfth-century Augustinian abbey — its soaring Gothic tracery now only stone frames, like an open lattice cropping the sky into geometric shapes. Broken columns and arches cast long shadows on the damp ground, and raindrops pool in puddles mirroring centuries of rise and fall.",
        },
        photos: ["/scotland/IMG_5367.jpg"],
      },
      {
        name: { zh: "乔治广场", en: "George Square" },
        description: {
          zh: "格拉斯哥市中心的心脏，维多利亚女王骑马雕像矗立在高大的花岗岩基座上，背景是红白相间的城市建筑与圣诞装饰。傍晚时分，金色的雪花灯串横跨广场，湿漉漉的地面映着灯火，行人与车辆穿梭其中，是这座城市最热闹的节日景象。",
          en: "The heart of central Glasgow, where an equestrian statue of Queen Victoria rises on a tall granite plinth against red-and-white city architecture and Christmas decorations. At dusk, golden snowflake lights span the square, the wet pavement mirrors the glow, and pedestrians and traffic weave through the city's liveliest festive scene.",
        },
        highlight: true,
        photos: ["/scotland/IMG_5224.jpg", "/scotland/IMG_5274.jpg"],
      },
      {
        name: { zh: "格拉斯哥大教堂", en: "Glasgow Cathedral" },
        description: {
          zh: "苏格兰唯一一座在中世纪宗教改革中幸存下来的大教堂，深灰色的石墙与绿色的铜屋顶在阴天的光线下显得庄严而古老。高耸的尖塔指向低垂的云层，门前行人走过，仿佛时光在这里放慢了脚步。",
          en: "The only cathedral on the Scottish mainland to survive the Reformation intact, its dark-grey stone and green copper roof look solemn and ancient under an overcast sky. Tall spires point to low-hanging clouds as passers-by drift by the doors, as if time itself slows here.",
        },
        photos: ["/scotland/IMG_5229.jpg"],
      },
      {
        name: { zh: "格拉斯哥现代艺术美术馆", en: "Gallery of Modern Art" },
        description: {
          zh: "新古典主义柱廊上的金色字母写着「GALLERY OF MODERN ART」，门廊前的威灵顿公爵骑马雕像戴着标志性的橙色交通锥，成为格拉斯哥人幽默精神的象征。圣诞节期间，美术馆旁还立着一棵金色的灯光圣诞树，让庄严的建筑多了一份节日的俏皮。",
          en: "Golden letters on its neoclassical portico spell 'GALLERY OF MODERN ART', and the equestrian statue of the Duke of Wellington in front wears its iconic orange traffic cone — a symbol of Glaswegian humour. At Christmas, a golden light tree stands beside the gallery, lending the solemn building a festive wink.",
        },
        photos: ["/scotland/IMG_5272.jpg"],
      },
    ],
    photos: [
      "/scotland/IMG_5224.jpg",
      "/scotland/IMG_5229.jpg",
      "/scotland/IMG_5272.jpg",
      "/scotland/IMG_5274.jpg",
      "/scotland/IMG_5282.jpg",
      "/scotland/IMG_5367.jpg",
      "/scotland/IMG_5415.jpg",
    ],
  },
  {
    city: { zh: "伊斯坦布尔", en: "Istanbul" },
    slug: "istanbul",
    country: { zh: "土耳其", en: "Türkiye" },
    emoji: "🕌",
    year: "2023",
    lat: 41.0082,
    lng: 28.9784,
    description: {
      zh: "横跨欧亚大陆的城市，博斯普鲁斯海峡将两片大陆分开，又将两种文明连接。蓝色清真寺的穹顶、圣索菲亚的马赛克——这里是东西方交汇的十字路口。",
      en: "A city straddling Europe and Asia, where the Bosphorus divides two continents yet binds two civilisations. The domes of the Blue Mosque, the mosaics of Hagia Sophia — this is the crossroads of East and West.",
    },
    attractions: [
      {
        name: { zh: "圣索菲亚大教堂", en: "Hagia Sophia" },
        description: {
          zh: "一千五百年间从教堂变为清真寺再变为博物馆，查士丁尼大帝的绝世之作。从苏丹艾哈迈德公园的喷泉前眺望，巨大的穹顶与四座宣礼塔勾勒出伊斯坦布尔最经典的天际线；走进内部，拜占庭黄金马赛克在幽暗中闪烁，基督、圣母与施洗者约翰的肖像跨越千年依然庄严。",
          en: "Over fifteen hundred years it has been a church, a mosque, and a museum — the crowning masterpiece of Emperor Justinian. Seen from the fountains of Sultanahmet Park, its great dome and four minarets trace Istanbul's most iconic skyline; inside, Byzantine golden mosaics shimmer in the dim light, the figures of Christ, the Virgin, and John the Baptist still solemn after a millennium.",
        },
        highlight: true,
        photos: ["/istanbul/IMG_0709.jpg", "/istanbul/IMG_0719.jpg"],
      },
      {
        name: { zh: "蓝色清真寺", en: "Blue Mosque" },
        description: {
          zh: "六座宣礼塔矗立天际，层叠的圆顶与高耸的尖塔构成奥斯曼建筑的巅峰。灰白色的石墙与金色塔尖在阴云下显得格外肃穆，庭院里的拱门与喷泉静静迎接着来自世界各地的访客。",
          en: "Six minarets rise against the sky, layered domes and soaring spires the pinnacle of Ottoman architecture. Its grey-white stone and gilded tips look especially solemn beneath the clouds, while the courtyard's arches and fountain quietly welcome visitors from around the world.",
        },
        photos: ["/istanbul/IMG_0703.jpg"],
      },
      {
        name: { zh: "狄奥多西方尖碑", en: "Obelisk of Theodosius" },
        description: {
          zh: "公元前15世纪的古埃及方尖碑，如今矗立在古罗马赛马场的遗址上。灰色的花岗岩上刻满了象形文字，底座浮雕记录着拜占庭帝国的荣耀——时间在这里折叠了三千多年。",
          en: "An ancient Egyptian obelisk from the 15th century BC, now standing on the ruins of a Roman hippodrome. Hieroglyphs cover its grey granite, and the base reliefs record the glory of the Byzantine Empire — more than three thousand years folded into one place.",
        },
        photos: ["/istanbul/IMG_0700.jpg"],
      },
      {
        name: { zh: "地下水宫殿", en: "Basilica Cistern" },
        description: {
          zh: "查士丁尼大帝建造的地下蓄水池，三百多根科林斯石柱撑起一片幽暗的水世界。暖黄色的灯光从水底泛起，石柱的倒影在平静水面上摇曳，仿佛走入了拜占庭的秘密梦境。",
          en: "An underground cistern built by Justinian, where over three hundred Corinthian columns hold up a dim water world. Warm-yellow light rises from beneath the surface, and the columns' reflections sway on the still water, as if stepping into a secret Byzantine dream.",
        },
        photos: ["/istanbul/IMG_0724.jpg"],
      },
      {
        name: { zh: "多尔玛巴赫切宫", en: "Dolmabahçe Palace" },
        description: {
          zh: "奥斯曼帝国晚期的海滨宫殿，巴洛克与新古典主义在博斯普鲁斯海峡畔相遇。华丽的钟楼、镀金的帝国之门与花园中优雅的天鹅喷泉，诉说着一个帝国最后的奢华与浪漫。",
          en: "A late-Ottoman waterfront palace where Baroque meets Neoclassical on the shores of the Bosphorus. Its ornate clock tower, gilded imperial gate, and elegant swan fountain in the garden tell of an empire's final opulence and romance.",
        },
        highlight: true,
        photos: [
          "/istanbul/IMG_0761.jpg",
          "/istanbul/IMG_E0762.jpg",
          "/istanbul/IMG_E0765.jpg",
        ],
      },
    ],
    photos: [
      "/istanbul/IMG_0700.jpg",
      "/istanbul/IMG_0703.jpg",
      "/istanbul/IMG_0709.jpg",
      "/istanbul/IMG_0719.jpg",
      "/istanbul/IMG_0724.jpg",
      "/istanbul/IMG_0761.jpg",
      "/istanbul/IMG_E0762.jpg",
      "/istanbul/IMG_E0765.jpg",
    ],
  },
  {
    city: { zh: "日本", en: "Japan" },
    slug: "japan",
    country: { zh: "日本", en: "Japan" },
    emoji: "🗾",
    year: "2018",
    lat: 35.6762,
    lng: 139.6503,
    description: {
      zh: "从东京的霓虹街头到京都的朱红古寺，从大阪的城下町到广岛的碧海鸟居——这次旅程穿越了日本最经典的城市与风景。每一张照片都是一段真实的足迹：明治神宫的森林、涩谷十字路口的人潮、清水寺的晨光、严岛神社的落日。",
      en: "From Tokyo's neon streets to Kyoto's vermilion temples, from Osaka's castle town to the blue sea and torii of Hiroshima — this journey crossed Japan's most classic cities and landscapes. Every photo is a real footprint: the forests of Meiji Shrine, the crowds of Shibuya Crossing, the morning light of Kiyomizu-dera, the sunset at Itsukushima Shrine.",
    },
    attractions: [
      {
        name: { zh: "明治神宮", en: "Meiji Shrine" },
        description: {
          zh: "走进代代木森林深处的巨大木制鸟居，深褐色的柱梁上饰有菊花纹章。参道两旁是捐赠的酒桶墙，写满日本各地酒造的名字——这是东京市中心一片让人静下来的绿。",
          en: "Walk beneath the great wooden torii deep in the Yoyogi forest, its dark-brown pillars adorned with the chrysanthemum crest. The approach is lined with walls of donated sake barrels inscribed with the names of brewers from across Japan — a pocket of stillness in the heart of Tokyo.",
        },
        highlight: true,
        photos: ["/japan/IMG_0962.jpg", "/japan/IMG_0964.jpg"],
      },
      {
        name: { zh: "涩谷十字路口", en: "Shibuya Crossing" },
        description: {
          zh: "站在人群中等待绿灯，四周高楼电子屏闪烁。TSUTAYA、Hisamitsu、DHC 的广告牌层层叠叠，绿灯一亮，四面八方的人潮同时涌动——这是东京最标志性的瞬间。",
          en: "Stand among the crowd waiting for the light to turn green, surrounded by flashing billboards — TSUTAYA, Hisamitsu, DHC stacked one upon another. The moment the signal changes, crowds surge from every direction at once: Tokyo's most iconic instant.",
        },
        highlight: true,
        photos: ["/japan/IMG_0969.jpg", "/japan/IMG_0970.jpg"],
      },
      {
        name: { zh: "新宿御苑", en: "Shinjuku Gyoen" },
        description: {
          zh: "东京市中心的一片和洋合璧的庭园。平静的湖面倒映着垂柳与修剪整齐的松树，夏日的天空被白云轻轻覆盖，是逃离都市喧嚣的片刻宁静。",
          en: "A garden in the centre of Tokyo blending Japanese and Western styles. A placid lake mirrors weeping willows and neatly trimmed pines beneath a summer sky brushed with white clouds — a moment of quiet escape from the city's clamour.",
        },
        photos: ["/japan/IMG_0972.jpg"],
      },
      {
        name: { zh: "秋叶原电器街", en: "Akihabara" },
        description: {
          zh: "Sofmap、Tsukumo 的招牌沿街林立，电线杆与电线交错成秋叶原特有的天际线。这里是电子产品、动漫文化与二手游戏卡带的圣地，每一步都充满御宅族的气息。",
          en: "Sofmap and Tsukumo signs line the streets, utility poles and wires weaving Akihabara's distinctive skyline. A mecca for electronics, anime culture and second-hand game cartridges, every step brims with otaku spirit.",
        },
        photos: ["/japan/IMG_0999.jpg"],
      },
      {
        name: { zh: "浅草寺雷门", en: "Kaminarimon Gate, Sensō-ji" },
        description: {
          zh: "夜晚点亮的大红灯笼悬挂在雷门正中央，「金龍山」匾额在灯光下泛着古意。穿过雷门就是仲见世通，传统小吃与纪念品的灯火延续着江户时代的热闹。",
          en: "At night a great red lantern hangs at the centre of Kaminarimon, and the 'Kinryū-zan' plaque glows with age in the lamplight. Beyond the gate, Nakamise-dōri carries on the bustle of the Edo period with its lit stalls of traditional snacks and souvenirs.",
        },
        highlight: true,
        photos: ["/japan/IMG_1005.jpg"],
      },
      {
        name: { zh: "东京夏日花火", en: "Tokyo Summer Fireworks" },
        description: {
          zh: "夜幕下的河滩挤满了人，远处的桥被灯光勾勒出金色的线条。手机闪光灯像繁星一样点缀在人群之中，这是东京夏天最浪漫的集体记忆。",
          en: "The riverbank is packed as night falls, and a distant bridge is traced in lines of golden light. Phone flashes dot the crowd like stars — Tokyo's most romantic collective summer memory.",
        },
        photos: ["/japan/IMG_0985.jpg"],
      },
      {
        name: { zh: "清水寺", en: "Kiyomizu-dera" },
        description: {
          zh: "朱红色的仁王门耸立在蓝天之下，石阶两侧是守护的石狮与石灯笼。沿着阶梯向上，京都的街道与远处的青山缓缓展开，这里是京都最具代表性的寺院风景。",
          en: "The vermilion Niō-mon gate rises against a blue sky, flanked by guardian stone lions and stone lanterns. Climbing the steps, Kyoto's streets and distant green hills unfold gradually — the city's most emblematic temple scene.",
        },
        highlight: true,
        photos: ["/japan/IMG_1023.jpg", "/japan/IMG_1026.jpg"],
      },
      {
        name: { zh: "伏见稻荷大社", en: "Fushimi Inari Taisha" },
        description: {
          zh: "千本鸟居从山脚一路延伸到山顶，橙红色的门柱与黑色的基座在林间交错成隧道。入口的鸟居上高悬「稻荷大神」匾额，两侧是神社的使者——口中叼着稻穗的狐狸石像。",
          en: "Thousands of torii climb from the foot of the mountain to its summit, their orange-red pillars and black bases weaving tunnels through the forest. Over the entrance torii hangs the 'Inari Ōkami' plaque, flanked by the shrine's messengers — stone foxes clutching sheaves of rice in their mouths.",
        },
        highlight: true,
        photos: ["/japan/IMG_1078.jpg", "/japan/IMG_1083.jpg"],
      },
      {
        name: { zh: "金阁寺", en: "Kinkaku-ji" },
        description: {
          zh: "鹿苑寺的金阁被金箔覆盖，倒映在镜湖池中。周围是精心修剪的松树与远处的青山，水面的涟漪让金色建筑微微晃动，如梦似幻。",
          en: "The Golden Pavilion of Rokuon-ji, covered in gold leaf, reflects in the Mirror Pond. Surrounded by manicured pines and distant green hills, ripples on the water set the golden building trembling as if in a dream.",
        },
        highlight: true,
        photos: ["/japan/IMG_1066.jpg"],
      },
      {
        name: { zh: "岚山·渡月桥", en: "Arashiyama · Togetsukyō Bridge" },
        description: {
          zh: "桂川从岚山脚下缓缓流过，河上的水堰形成一道白色的水帘。两岸是茂密的竹林与传统町屋，渡月桥连接着山与城，这里是京都西郊最诗意的风景。",
          en: "The Katsura River flows gently past the foot of Arashiyama, its weirs forming a white curtain of water. Dense bamboo groves and traditional machiya line both banks, and the Togetsukyō Bridge links mountain and town — the most poetic scenery on Kyoto's western edge.",
        },
        photos: ["/japan/IMG_1089.jpg", "/japan/IMG_1096.jpg"],
      },
      {
        name: { zh: "嵯峨野观光铁道", en: "Sagano Scenic Railway" },
        description: {
          zh: "红色的观光小火车停靠在群山环绕的车站，车头上写着「嵯峨野 Romantic Train」。沿着保津溪谷行驶，窗外的青山、溪流与田园像一卷徐徐展开的京都画卷。",
          en: "A red sightseeing train pulls into a mountain-ringed station, its front emblazoned with 'Sagano Romantic Train'. Along the Hozu Gorge, green hills, streams and fields unroll outside the window like a slowly opening scroll of Kyoto.",
        },
        photos: ["/japan/IMG_1100.jpg"],
      },
      {
        name: { zh: "祇园祭", en: "Gion Matsuri" },
        description: {
          zh: "夜晚的神轿巡游点亮了京都的街道，巨大的山鉾上挂满灯笼，人群穿着浴衣簇拥在神轿周围。锣鼓声与欢呼声交织，这是京都最盛大的夏日祭典。",
          en: "Nighttime processions of portable shrines light up Kyoto's streets, great yamaboko floats hung with lanterns and crowds in yukata pressing around them. Drums and cheers interweave in the city's grandest summer festival.",
        },
        highlight: true,
        photos: ["/japan/IMG_1044.jpg"],
      },
      {
        name: { zh: "大阪城", en: "Osaka Castle" },
        description: {
          zh: "白色的天守城矗立在深灰色的石垣之上，绿色的屋瓦与金色的鯱在阳光下闪闪发亮。丰臣秀吉时代的气魄依旧在这座城池的每一块石头里。",
          en: "The white tenshu rises over dark-grey stone walls, its green roof tiles and golden shachihoko gleaming in the sun. The spirit of Toyotomi Hideyoshi's era still lives in every stone of the castle.",
        },
        highlight: true,
        photos: ["/japan/IMG_1048.jpg"],
      },
      {
        name: { zh: "道顿堀·心斋桥", en: "Dōtonbori · Shinsaibashi" },
        description: {
          zh: "大阪最热闹的街道，巨型看板从建筑外墙上层层叠叠地伸出：螃蟹、寿司、烧肉、唐吉诃德。人群中有人撑着阳伞，有人低头看手机，这是关西最具烟火气的日常。",
          en: "Osaka's liveliest streets, where giant signboards jut from building façades in layers — crab, sushi, yakiniku, Don Quijote. Some in the crowd hold parasols, others gaze at phones: the most bustling everyday scene in the Kansai region.",
        },
        photos: ["/japan/IMG_1056.jpg"],
      },
      {
        name: { zh: "大阪黄昏", en: "Osaka Dusk" },
        description: {
          zh: "ANA Crowne Plaza 的红色标识在橙红色的晚霞中亮起，高架桥与办公楼的剪影横亘在城市上空。日落时分的云层被染成粉红与金黄，这是大阪送给旅人的一天谢幕。",
          en: "The red ANA Crowne Plaza sign lights up in the orange-red dusk, silhouettes of viaducts and office towers stretching across the city. Sunset clouds turn pink and gold — Osaka's evening curtain call for travellers.",
        },
        photos: ["/japan/IMG_1057.jpg"],
      },
      {
        name: { zh: "广岛和平纪念公园", en: "Hiroshima Peace Memorial Park" },
        description: {
          zh: "原爆圆顶屋残存的砖墙与扭曲的钢筋骨架，在阴云下沉默地伫立。这座曾经是广岛县产业奖励馆的建筑，如今成为和平与战争记忆的象征。",
          en: "The A-Bomb Dome's surviving brick walls and twisted steel skeleton stand silent beneath the clouds. Once the Hiroshima Prefectural Industrial Promotion Hall, it is now a symbol of peace and the memory of war.",
        },
        highlight: true,
        photos: ["/japan/IMG_1119.jpg"],
      },
      {
        name: { zh: "严岛神社大鸟居", en: "Great Torii of Itsukushima" },
        description: {
          zh: "朱红色的大鸟居矗立在海面上，退潮时它的基座暴露在滩涂上，涨潮时又像漂浮在水中。背后是宫岛的青山与濑户内海的岛屿，这是日本最具灵气的海上鸟居。",
          en: "A great vermilion torii stands in the sea, its base exposed on the flats at low tide and appearing to float at high tide. Behind it rise Miyajima's green hills and the islands of the Seto Inland Sea — Japan's most spiritual gate on the water.",
        },
        highlight: true,
        photos: ["/japan/IMG_1128.jpg", "/japan/IMG_1148.jpg"],
      },
      {
        name: { zh: "严岛神社", en: "Itsukushima Shrine" },
        description: {
          zh: "神社的本殿建在海上的木栈平台之上，朱红色的回廊与黑色的屋瓦随波轻轻摇曳。舞殿前的地板与栏杆都是鲜艳的红色，与周围的山海形成强烈的对比。",
          en: "The shrine's main hall sits on timber platforms over the sea, its vermilion corridors and black roof tiles swaying gently with the waves. The floors and railings before the stage are a vivid red, a striking contrast against the surrounding mountains and sea.",
        },
        photos: ["/japan/IMG_1132.jpg"],
      },
      {
        name: { zh: "弥山展望台", en: "Mount Misen Observatory" },
        description: {
          zh: "从宫岛弥山俯瞰濑户内海，蓝色的海面上散布着大小不一的岛屿。天空晴朗，白云低垂，登山客的伞点缀在山路之间，这是广岛最美的全景。",
          en: "Overlooking the Seto Inland Sea from Mount Misen, islands of every size scatter across blue water. The sky is clear, white clouds hang low, and hikers' umbrellas dot the trail — Hiroshima's finest panorama.",
        },
        photos: ["/japan/IMG_1140.jpg"],
      },
      {
        name: { zh: "平等院凤凰堂", en: "Byōdō-in Phoenix Hall" },
        description: {
          zh: "宇治平等院的凤凰堂倒映在布满睡莲的池中，深红色的木构与黑色的屋瓦在蓝天之下显得庄严而典雅。屋顶上的凤凰金像凝视着这片千年不变的庭园。",
          en: "The Phoenix Hall of Byōdō-in reflects in a pond strewn with water lilies, its deep-red timbers and black roof tiles solemn and elegant beneath a blue sky. The golden phoenix on its roof gazes over a garden unchanged for a thousand years.",
        },
        photos: ["/japan/IMG_1173.jpg"],
      },
    ],
    photos: [
      "/japan/IMG_0962.jpg",
      "/japan/IMG_0964.jpg",
      "/japan/IMG_0969.jpg",
      "/japan/IMG_0970.jpg",
      "/japan/IMG_0972.jpg",
      "/japan/IMG_0985.jpg",
      "/japan/IMG_0999.jpg",
      "/japan/IMG_1005.jpg",
      "/japan/IMG_1023.jpg",
      "/japan/IMG_1026.jpg",
      "/japan/IMG_1044.jpg",
      "/japan/IMG_1048.jpg",
      "/japan/IMG_1056.jpg",
      "/japan/IMG_1057.jpg",
      "/japan/IMG_1066.jpg",
      "/japan/IMG_1078.jpg",
      "/japan/IMG_1083.jpg",
      "/japan/IMG_1089.jpg",
      "/japan/IMG_1096.jpg",
      "/japan/IMG_1100.jpg",
      "/japan/IMG_1119.jpg",
      "/japan/IMG_1128.jpg",
      "/japan/IMG_1132.jpg",
      "/japan/IMG_1140.jpg",
      "/japan/IMG_1148.jpg",
      "/japan/IMG_1173.jpg",
    ],
  },
  {
    city: { zh: "纽约", en: "New York" },
    slug: "new-york",
    country: { zh: "美国", en: "United States" },
    emoji: "🗽",
    year: "2019",
    lat: 40.7128,
    lng: -74.006,
    description: {
      zh: "从帝国大厦的霓虹夜色到自由女神像的青铜轮廓，从洛克菲勒中心的金色雕像到峭石之巅俯瞰的钢铁森林——纽约用它标志性的天际线与街道，把每一次抬头都变成一张经典明信片。",
      en: "From the neon night of the Empire State Building to the bronze outline of the Statue of Liberty, from Rockefeller Center's gilded statue to the steel forest seen from Top of the Rock — New York turns every upward glance into a classic postcard.",
    },
    attractions: [
      {
        name: { zh: "帝国大厦", en: "Empire State Building" },
        description: {
          zh: "走进装饰艺术风格的大堂，整面大理石墙上镶嵌着光芒四射的帝国大厦金属浮雕。夜晚登上观景台，车流在曼哈顿的街道里汇成一条条光的河流，远处的世贸中心一号楼在夜空中闪烁着红色的航空警示灯。",
          en: "Step into an Art Deco lobby where a radiant metal relief of the Empire State Building is set into a marble wall. On the observation deck at night, traffic flows through Manhattan's streets in rivers of light, and the distant One World Trade Center blinks red aviation warning lights against the dark.",
        },
        highlight: true,
        photos: ["/new-york/IMG_1989.jpg", "/new-york/IMG_1977.jpg"],
      },
      {
        name: { zh: "洛克菲勒中心", en: "Rockefeller Center" },
        description: {
          zh: "下沉广场中央，金色的普罗米修斯雕像倒映在喷泉水池中。周围环绕着各国国旗，背后的通用电气大楼笔直向上。这里是曼哈顿中城的心脏，也是每年圣诞节巨型圣诞树所在的地方。",
          en: "In the sunken plaza, the gilded statue of Prometheus reflects in a fountain pool, ringed by flags of the world with the GE Building rising straight above. This is the heart of Midtown Manhattan — and home of the giant Christmas tree each year.",
        },
        photos: ["/new-york/IMG_1990.jpg"],
      },
      {
        name: { zh: "曼哈顿天际线", en: "Manhattan Skyline" },
        description: {
          zh: "从洛克菲勒中心的峭石之巅眺望，帝国大厦像一根银色的针插入蓝天，周围是密集的玻璃与钢骨森林。换乘渡轮从哈德逊河上回望，世贸中心一号楼在阴天的云层下显得格外孤傲，一艘白色渡轮正划开灰蓝色的水面。",
          en: "From Top of the Rock, the Empire State Building rises like a silver needle into the blue, ringed by a dense forest of glass and steel. Looking back from a Hudson River ferry, One World Trade Center stands proud under an overcast sky as a white ferry cuts through the grey-blue water.",
        },
        highlight: true,
        photos: [
          "/new-york/IMG_1997.jpg",
          "/new-york/IMG_2008.jpg",
          "/new-york/IMG_2072.jpg",
        ],
      },
      {
        name: { zh: "自由女神像", en: "Statue of Liberty" },
        description: {
          zh: "从自由岛仰望，绿色的铜质女神高举火炬，左手紧握《独立宣言》，皇冠的尖刺在灰蒙蒙的天空下划出清晰的轮廓。基座由粗糙的花岗岩砌成，下方隐约可见参观者的身影。",
          en: "Looking up from Liberty Island, the green copper goddess raises her torch and clasps the Declaration of Independence in her left hand, her crown's spikes sharp against the grey sky. The pedestal is rough granite, with visitors faintly visible below.",
        },
        highlight: true,
        photos: ["/new-york/IMG_2063.jpg"],
      },
    ],
    photos: [
      "/new-york/IMG_1977.jpg",
      "/new-york/IMG_1989.jpg",
      "/new-york/IMG_1990.jpg",
      "/new-york/IMG_1997.jpg",
      "/new-york/IMG_2008.jpg",
      "/new-york/IMG_2063.jpg",
      "/new-york/IMG_2072.jpg",
    ],
  },
  {
    city: { zh: "巴黎", en: "Paris" },
    slug: "paris",
    country: { zh: "法国", en: "France" },
    emoji: "🗼",
    year: "2024",
    lat: 48.8566,
    lng: 2.3522,
    description: {
      zh: "塞纳河畔的光之城。埃菲尔铁塔在整点闪烁，卢浮宫的玻璃金字塔倒映着夕阳，蒙马特高地上街头艺人唱着香颂——巴黎是一种生活方式，而不只是一座城市。",
      en: "The City of Light on the banks of the Seine. The Eiffel Tower sparkles on the hour, the Louvre's glass pyramid mirrors the sunset, and street performers sing chansons on the heights of Montmartre — Paris is a way of life, not merely a city.",
    },
    attractions: [
      {
        name: { zh: "埃菲尔铁塔", en: "Eiffel Tower" },
        description: {
          zh: "无论第几次来，铁塔在整点闪烁灯光的那一刻都会让人屏住呼吸。傍晚登塔——白天的巴黎和夜晚的巴黎一次看完。",
          en: "No matter how many times you visit, the moment the tower sparkles on the hour takes your breath away. Go up at dusk — you get daytime Paris and nighttime Paris in a single visit.",
        },
        highlight: true,
        photos: [
          "/paris/IMG_1636.jpg",
          "/paris/IMG_1637.jpg",
          "/paris/IMG_1669.jpg",
        ],
      },
      {
        name: { zh: "卢浮宫", en: "The Louvre" },
        description: {
          zh: "世界最大的博物馆，收藏了人类从古至今的艺术杰作。蒙娜丽莎前的自拍大军和维纳斯雕像前的安静凝视，都是卢浮宫的一部分。",
          en: "The world's largest museum, home to humanity's masterpieces from antiquity to today. The selfie crowds before the Mona Lisa and the quiet gazes at the Venus de Milo are all part of the Louvre.",
        },
        photos: ["/paris/IMG_1700.jpg", "/paris/IMG_1723.jpg"],
      },
      {
        name: { zh: "蒙马特高地", en: "Montmartre" },
        description: {
          zh: "圣心大教堂坐落在巴黎最高点，俯瞰整座城市。旁边的小丘广场聚集了画家和街头艺人——毕加索和梵高也曾在这里作画。",
          en: "The Sacré-Cœur sits at Paris's highest point, overlooking the whole city. Nearby, the Place du Tertre gathers painters and street artists — Picasso and Van Gogh once painted here too.",
        },
        photos: ["/paris/IMG_1665.jpg", "/paris/IMG_1693.jpg"],
      },
      {
        name: { zh: "塞纳河畔", en: "Seine Riverbank" },
        description: {
          zh: "傍晚沿河散步，从圣母院到亚历山大三世桥。游船驶过，桥上的人们挥手致意——巴黎人的浪漫不需要理由。",
          en: "An evening stroll along the river, from Notre-Dame to the Pont Alexandre III. Tour boats glide past and people on the bridges wave hello — Parisian romance needs no reason.",
        },
        highlight: true,
        photos: [
          "/paris/IMG_1642.jpg",
          "/paris/IMG_1706.jpg",
          "/paris/IMG_1737.jpg",
        ],
      },
      {
        name: { zh: "巴黎圣母院", en: "Notre-Dame" },
        description: {
          zh: "塞纳河上的哥特式杰作，八百年来见证了法国的荣耀与创伤。虽历经大火，玫瑰窗的光依然透过彩色玻璃照亮教堂内部。",
          en: "A Gothic masterpiece on the Seine, witness to eight centuries of France's glory and wounds. Though scarred by fire, the rose window's light still filters through stained glass to illuminate the interior.",
        },
        photos: ["/paris/IMG_1718.jpg"],
      },
    ],
    photos: [
      "/paris/IMG_1636.jpg",
      "/paris/IMG_1637.jpg",
      "/paris/IMG_1642.jpg",
      "/paris/IMG_1665.jpg",
      "/paris/IMG_1669.jpg",
      "/paris/IMG_1693.jpg",
      "/paris/IMG_1700.jpg",
      "/paris/IMG_1706.jpg",
      "/paris/IMG_1718.jpg",
      "/paris/IMG_1723.jpg",
      "/paris/IMG_1737.jpg",
    ],
  },
];

// -----------------------------------------------------------
//  玩过的游戏
// -----------------------------------------------------------
export interface Game {
  name: LocalizedString;
  genre: LocalizedString;
  description: LocalizedString;
  /** Steam App ID，用于获取海报 */
  steamAppId: string;
  /** 主题色 */
  accentColor: string;
  /** Steam 商店 HLS 预告片 URL，hover 时播放 */
  trailerUrl: string;
}

export const games: Game[] = [
  {
    name: { zh: "艾尔登法环", en: "Elden Ring" },
    genre: { zh: "开放世界 / 动作 RPG", en: "Open World / Action RPG" },
    description: {
      zh: "狭间之地的每一寸土地都充满危险与惊喜。在无数次「YOU DIED」之后，击败玛莲妮亚的那一刻，手掌出汗，心跳加速。",
      en: "Every inch of the Lands Between holds danger and wonder. After countless 'YOU DIED' screens, the moment Malenia finally falls, your palms sweat and your heart races.",
    },
    steamAppId: "1245620",
    accentColor: "#C9A44B",
    trailerUrl:
      "https://video.akamai.steamstatic.com/store_trailers/1245620/468149/7d588828f80907ca97efdcb1e6ef72b4ce2b1d0d/1750650511/hls_264_master.m3u8?t=1654109241",
  },
  {
    name: { zh: "GTA5", en: "Grand Theft Auto V" },
    genre: { zh: "开放世界 / 动作冒险", en: "Open World / Action-Adventure" },
    description: {
      zh: "洛圣都的阳光下，三个男人的命运交织在一起。抢劫、飙车、跳伞——在这座永不沉睡的城市里，你可以成为任何人，做任何事。",
      en: "Under the Los Santos sun, three men's fates intertwine. Heists, street races, skydives — in a city that never sleeps, you can be anyone and do anything.",
    },
    steamAppId: "271590",
    accentColor: "#4CAF50",
    trailerUrl:
      "https://video.akamai.steamstatic.com/store_trailers/271590/844302/de4ad49997171bd3f4d05299cc3e718cfe0307ee/1751269402/hls_264_master.m3u8?t=1741119978",
  },
  {
    name: { zh: "女神异闻录5 皇家版", en: "Persona 5 Royal" },
    genre: { zh: "JRPG / 角色扮演", en: "JRPG / Role-Playing" },
    description: {
      zh: "白天是东京的高中生，夜晚是偷心的怪盗团。回合制战斗与日常养成完美融合，配上目黑将司的酸爵士配乐——这是一场华丽的青春革命。",
      en: "A Tokyo high-school student by day, a heart-stealing Phantom Thief by night. Turn-based combat and daily-life simulation blend perfectly, set to Shoji Meguro's acid-jazz score — a dazzling adolescent revolution.",
    },
    steamAppId: "1687950",
    accentColor: "#E53935",
    trailerUrl:
      "https://video.akamai.steamstatic.com/store_trailers/1687950/506609/4ee1371464ce2149f69f89c36b9f906e369db2f1/1750725763/hls_264_master.m3u8?t=1722428147",
  },
  {
    name: { zh: "博德之门3", en: "Baldur's Gate 3" },
    genre: { zh: "CRPG / 角色扮演", en: "CRPG / Role-Playing" },
    description: {
      zh: "拉瑞安用 D&D 5E 规则书写了一封给 CRPG 的情书。每一个选择都在悄然改写故事的走向——骰子掷下的那一刻，费伦的命运在你手中。",
      en: "Larian wrote a love letter to the CRPG using the D&D 5E ruleset. Every choice quietly rewrites the story — the moment the die is cast, the fate of Faerûn lies in your hands.",
    },
    steamAppId: "1086940",
    accentColor: "#7E57C2",
    trailerUrl:
      "https://video.akamai.steamstatic.com/store_trailers/1086940/637951/59ca25b847b0e471638d1e2474acf71b068d57f0/1750615003/hls_264_master.m3u8?t=1702007645",
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
    url: "mailto:zzp@email.com",
    label: "Email",
  },
];

// -----------------------------------------------------------
//  分类技能（用于工作页标签展示）
// -----------------------------------------------------------
export interface SkillCategory {
  category: LocalizedString;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: { zh: "前端框架", en: "Frontend Frameworks" },
    items: ["Vue 2 / 3", "React", "SvelteKit", "TypeScript"],
  },
  {
    category: { zh: "UI & 编辑器", en: "UI & Editors" },
    items: ["Tailwind CSS", "Tiptap", "Element UI", "Vant UI"],
  },
  {
    category: { zh: "可视化 & 交互", en: "Visualization & Interaction" },
    items: ["ECharts", "GridStack", "LogicFlow", "Markdown"],
  },
  {
    category: { zh: "AI & 实时通信", en: "AI & Realtime" },
    items: ["SSE", "WebSocket", "Socket.IO", "Open WebUI", "Claude Code"],
  },
  {
    category: { zh: "工程化", en: "Engineering" },
    items: ["Vite", "Jenkins", "Docker", "Nginx", "CI/CD"],
  },
];

// -----------------------------------------------------------
//  项目亮点（用于工作页展示）
// -----------------------------------------------------------
export interface ProjectHighlight {
  name: LocalizedString;
  emoji: string;
  role: LocalizedString;
  description: LocalizedString;
  tech: string[];
}

export const projectHighlights: ProjectHighlight[] = [
  {
    name: { zh: "智能企业助手", en: "Intelligent Enterprise Assistant" },
    emoji: "🧠",
    role: { zh: "Web 前端负责人 · 2025.03 — 2026.06", en: "Frontend Lead · 2025.03 — 2026.06" },
    description: {
      zh: "面向全行员工的 AI 大模型体验平台。主导深度研究、会话附件上传、联网搜索、加密会话、AI 绘图等核心功能的交互设计与前端开发。围绕流式响应、长会话渲染等复杂场景进行前端封装与优化。",
      en: "An AI large-model experience platform for all bank employees. Led interaction design and frontend development for core features including deep research, session attachment upload, web search, encrypted sessions, and AI image generation, with frontend encapsulation and optimization for complex scenarios like streaming responses and long-session rendering.",
    },
    tech: ["SvelteKit", "Tiptap", "Socket.IO", "Tailwind"],
  },
  {
    name: { zh: "智控平台", en: "Smart Control Platform" },
    emoji: "📊",
    role: { zh: "Web 前端负责人 · 2023.06 — 2025.02", en: "Frontend Lead · 2023.06 — 2025.02" },
    description: {
      zh: "内部过程管理平台，覆盖过程管理、量化考核、知识库等核心模块。主导前端技术选型与架构演进，基于 LogicFlow 实现可视化工作流配置，负责前端工程化体系建设（Docker、Nginx、Jenkins）。",
      en: "An internal process-management platform covering process management, quantitative assessment, and knowledge bases. Led frontend technology selection and architecture evolution, implemented visual workflow configuration with LogicFlow, and built the frontend engineering system (Docker, Nginx, Jenkins).",
    },
    tech: ["Vue 2/3", "Element UI", "Tiptap", "LogicFlow", "ECharts"],
  },
];
