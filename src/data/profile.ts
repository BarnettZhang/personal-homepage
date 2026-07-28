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
  /** 经纬度，用于 3D 地球定位 */
  lat: number;
  lng: number;
  /** 景点列表 */
  attractions: Attraction[];
  /** 照片列表（URL 或路径） */
  photos: string[];
}

export interface Attraction {
  name: string;
  description: string;
  highlight?: boolean;
}

export const travelCities: TravelCity[] = [
  {
    city: "伦敦",
    country: "英国",
    emoji: "🇬🇧",
    year: "2017 — 2022",
    lat: 51.5074,
    lng: -0.1278,
    description:
      "在这里度过了五年求学时光。从 UCL 的 Bloomsbury 校区到帝国理工的 South Kensington，\
泰晤士河畔的日落、大英博物馆的午后、东区的街头艺术——伦敦教会我的，远不止书本上的知识。",
    attractions: [
      { name: "大英博物馆", description: "世界四大博物馆之一，收藏了人类文明的精华。埃及馆的木乃伊、希腊馆的帕特农神庙浮雕、中国馆的瓷器——每次来都有新发现。", highlight: true },
      { name: "泰晤士河畔", description: "从威斯敏斯特桥到塔桥，沿着南岸散步是了解伦敦最好的方式。日落时分，大本钟和伦敦眼在金色光线中格外动人。" },
      { name: "UCL Bloomsbury 校区", description: "在 Gordon Square 旁的图书馆度过了无数个赶 due 的夜晚。春天的樱花和秋天的银杏，是校园最美的季节。" },
      { name: "帝国理工 South Kensington", description: "毗邻海德公园和三大博物馆。从实验室出来，在 Exhibition Road 上走一走，科学与人文在这里交汇。" },
      { name: "Brick Lane 东区", description: "周末的复古集市、满墙的涂鸦艺术、最好吃的贝果店——这里是伦敦最酷的街区，每一次探索都有惊喜。" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&h=600&fit=crop",
    ],
  },
  {
    city: "爱丁堡",
    country: "英国",
    emoji: "🏰",
    year: "2019",
    lat: 55.9533,
    lng: -3.1883,
    description:
      "卡尔顿山上的希腊风格国家纪念碑，皇家英里大道两旁的中世纪建筑。\
八月的军乐节和艺穗节让整座城市变成一场狂欢——来英国一定不要错过。",
    attractions: [
      { name: "爱丁堡城堡", description: "坐落在死火山 Castle Rock 之上，是苏格兰最著名的地标。每天下午一点的「一点钟炮」是延续百年的传统。", highlight: true },
      { name: "卡尔顿山", description: "山顶的希腊风格国家纪念碑让人恍惚间以为来到了雅典。日落时分，整座城市被染成金色，亚瑟王座在远处静静矗立。" },
      { name: "皇家英里大道", description: "连接爱丁堡城堡和荷里路德宫的石板路，两旁是沧桑的中世纪建筑。沿途的街头艺人、威士忌酒馆和羊绒围巾店值得慢慢探索。" },
      { name: "亚瑟王座", description: "这座 3.5 亿年前的火山遗迹是爱丁堡最好的徒步路线。登顶后的全景可以一直望到福斯湾——风吹得人睁不开眼，但值得。", highlight: true },
      { name: "军乐节（Tattoo）", description: "每年八月在城堡广场举行，苏格兰风笛、来自全世界的军乐队在夜幕下奉上史诗级演出。烟花在城堡上空绽放的那一刻，全场沸腾。" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1506377585622-bedcbb027af4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559554181-6d5fa97e2ee1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1597424216809-1bba7fad8c9b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1463740839922-2d3b7e426a56?w=800&h=600&fit=crop",
    ],
  },
  {
    city: "伊斯坦布尔",
    country: "土耳其",
    emoji: "🕌",
    year: "2023",
    lat: 41.0082,
    lng: 28.9784,
    description:
      "横跨欧亚大陆的城市，博斯普鲁斯海峡将两片大陆分开，又将两种文明连接。\
蓝色清真寺的穹顶、圣索菲亚的马赛克、大巴扎的香料——这里是东西方交汇的十字路口。",
    attractions: [
      { name: "圣索菲亚大教堂", description: "一千五百年间从教堂变为清真寺再变为博物馆，查士丁尼大帝的绝世之作。抬头仰望巨大的穹顶，仿佛悬浮在天堂与人间的交界。", highlight: true },
      { name: "蓝色清真寺", description: "六座宣礼塔矗立天际，内部两万片伊兹尼克蓝色瓷砖让整座清真寺笼罩在神秘的蓝色光晕中。傍晚时分，夕阳和灯光同时亮起——美得窒息。" },
      { name: "博斯普鲁斯海峡", description: "乘渡轮从欧洲到亚洲只需二十分钟。两岸的奥斯曼宫殿、拜占庭城墙、现代别墅交替出现——穿越海峡就是穿越历史。" },
      { name: "大巴扎", description: "四千多家店铺组成的迷宫，从手工地毯到黄金珠宝，从香料到土耳其软糖。和摊主讨价还价、喝一杯苹果茶——这是最地道的伊斯坦布尔体验。" },
      { name: "加拉塔塔", description: "热那亚人留下的石塔是俯瞰金角湾的最佳位置。顶层的观景台上，欧亚两岸尽收眼底，博斯普鲁斯海峡如一条蓝色丝带穿城而过。", highlight: true },
    ],
    photos: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570029089333-42a467e29a1f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&h=600&fit=crop",
    ],
  },
  {
    city: "东京",
    country: "日本",
    emoji: "🗼",
    year: "2024",
    lat: 35.6762,
    lng: 139.6503,
    description:
      "在涩谷的十字路口感受都市脉搏，在浅草寺的雷门下仰望千年风韵。\
秋叶原的霓虹与代代木公园的静谧，是这座城市的两种心跳。",
    attractions: [
      { name: "涩谷十字路口", description: "世界最繁忙的十字路口，每分钟上千人穿行而过。站在星巴克二楼俯瞰人潮，感受这座城市的节奏与活力。", highlight: true },
      { name: "浅草寺", description: "东京最古老的寺院。穿过雷门，在仲见世通品尝人形烧和团子，感受江户时代的市井风情。" },
      { name: "秋叶原", description: "电器街与二次元文化的圣地。从最新的电子产品到复古的游戏卡带，从女仆咖啡厅到同人志店——这里是御宅族的天堂。" },
      { name: "代代木公园", description: "明治神宫旁的都市绿洲。周末的下午，有人在练习乐器，有人在跳街舞，也有人只是躺在草地上晒太阳。" },
      { name: "筑地市场", description: "虽然场内市场已经搬到了丰洲，但场外市场依然热闹非凡。清晨的寿司大排队是东京最值得的等待之一。" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549693578-d683be217e58?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop",
    ],
  },
  {
    city: "京都",
    country: "日本",
    emoji: "⛩️",
    year: "2019",
    lat: 35.0116,
    lng: 135.7681,
    description:
      "伏见稻荷的千本鸟居延绵到山顶，岚山的竹林小径幽深如画。\
在花见小路偶遇真正的艺伎——那一抹朱红是整个旅途的点睛之笔。",
    attractions: [
      { name: "伏见稻荷大社", description: "千本鸟居从山脚一直延伸到稻荷山顶，橙红色的鸟居隧道是京都最震撼的风景。清晨人少时来访，阳光透过鸟居洒下斑驳光影。", highlight: true },
      { name: "岚山竹林", description: "嵯峨野的竹林小径两侧是高耸入云的黑竹，风穿过竹林发出沙沙声响——这是「日本百音」之一的岚山竹韵。", highlight: true },
      { name: "花见小路", description: "祇园最著名的石板路，两旁是保存完好的木质町屋。傍晚时分有可能偶遇真正的艺伎——她们身着华丽和服，步履匆匆地赶往茶屋。" },
      { name: "金阁寺", description: "三岛由纪夫笔下的鹿苑寺金阁，三层楼阁被金箔覆盖，倒映在镜湖池中。雪中的金阁寺是最美的画面——需要一点运气才能遇到。" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&h=600&fit=crop",
    ],
  },
  {
    city: "巴黎",
    country: "法国",
    emoji: "🗼",
    year: "2022",
    lat: 48.8566,
    lng: 2.3522,
    description:
      "塞纳河左岸的咖啡馆、蒙马特高地的街头画家、铁塔每到整点的闪烁灯光——\
巴黎的美藏在每一个不经意的转角。海明威说得对：巴黎是一场流动的盛宴。",
    attractions: [
      { name: "埃菲尔铁塔", description: "巴黎的象征。白天在战神广场的草坪上野餐，夜晚铁塔的灯光秀每整点闪烁五分钟——从 Trocadéro 平台看过去，是最经典的明信片角度。", highlight: true },
      { name: "卢浮宫", description: "世界最大的博物馆，从贝聿铭的玻璃金字塔入口开始就是一场视觉盛宴。蒙娜丽莎前人山人海，但胜利女神像和汉谟拉比法典同样震撼人心。" },
      { name: "蒙马特高地", description: "圣心大教堂的白色穹顶俯瞰整个巴黎。在 Place du Tertre 找街头画家画一张肖像，在小巷里寻找《天使爱美丽》的取景地。" },
      { name: "塞纳河畔", description: "从左岸的莎士比亚书店到右岸的巴黎圣母院，沿河散步会遇到旧书摊、街头舞者、拥吻的情侣。找一把绿色的铁椅坐下，看游船缓缓驶过。" },
      { name: "凡尔赛宫", description: "路易十四的奢华宫殿，镜厅的水晶吊灯和金箔装饰令人叹为观止。后花园的几何对称之美是法式园林的巅峰之作。", highlight: true },
    ],
    photos: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=800&h=600&fit=crop",
    ],
  },
  {
    city: "杜布罗夫尼克",
    country: "克罗地亚",
    emoji: "🏛️",
    year: "2022",
    lat: 42.6507,
    lng: 18.0944,
    description:
      "亚得里亚海上的明珠，橙色屋顶与蔚蓝海水构成的地中海画卷。\
走在《权力的游戏》君临城的城墙上，每一个转角都是电影画面。",
    attractions: [
      { name: "古城墙", description: "全长两公里的中世纪城墙环绕整个老城。漫步其上，一侧是红色陶土屋顶的海洋，另一侧是碧蓝的亚得里亚海——君临城的画面扑面而来。", highlight: true },
      { name: "老城主街 Stradun", description: "光滑的大理石街道反射着阳光，两旁是巴洛克风格的建筑。找一家临街的咖啡馆坐下，看游客和当地人从面前走过——这就是杜城的生活节奏。" },
      { name: "Lovrijenac 要塞", description: "矗立在海边悬崖上的十一世纪堡垒，《权游》中的红堡。从要塞的炮眼望去，古城和海洋构成了一幅完美的画面。", highlight: true },
      { name: "缆车山顶", description: "从 Srd 山顶俯瞰，整座古城像一颗镶嵌在蓝色海面上的橙红色宝石。日落时分，阳光把城墙染成金色，海面上波光粼粼——是此生难忘的景色。" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1555992336-03a23e7e20bb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555109307-14b13cad169f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1538570766324-3e09f7ce2667?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    ],
  },
  {
    city: "纽约",
    country: "美国",
    emoji: "🗽",
    year: "2018",
    lat: 40.7128,
    lng: -74.006,
    description:
      "曼哈顿的天际线、中央公园的晨跑、百老汇的霓虹灯——\
纽约是一座让人感到渺小又让人充满力量的城市。这里没有不可能。",
    attractions: [
      { name: "时代广场", description: "世界的十字路口。无论白天还是深夜，这里的霓虹灯永远亮着，人潮永远涌动。第一次站在这里的震撼，是任何照片都无法传达的。", highlight: true },
      { name: "中央公园", description: "曼哈顿钢筋水泥森林中的绿色奇迹。从南边的马车到北边的水库，从夏天的露天演出到冬天的滑冰——中央公园是纽约的后花园。" },
      { name: "大都会艺术博物馆", description: "与大英博物馆、卢浮宫齐名的世界级博物馆。埃及丹铎神庙被完整地搬进展厅，在室内看一座两千年前的神庙是一种奇妙的体验。", highlight: true },
      { name: "布鲁克林大桥", description: "从曼哈顿步行到布鲁克林，脚下是东河的流水，前方是曼哈顿的天际线。傍晚时分，夕阳把摩天楼染成金色——这是纽约最浪漫的散步路线。" },
      { name: "百老汇", description: "在时代广场的 TKTS 排一张折扣票，走进一家百年剧院看一场音乐剧。当幕布升起的那一刻，你会明白为什么这里是世界戏剧之都。" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1470219556762-1771e7f9427d?w=800&h=600&fit=crop",
    ],
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
