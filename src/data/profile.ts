// ============================================================
//  个人资料集中管理 — 修改这个文件即可更新全站内容
// ============================================================

export const profile = {
  name: "ZZP",
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
  /** URL 友好的英文标识 */
  slug: string;
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
  /** 该景点对应的照片（相对于 public 的路径） */
  photos: string[];
}

export const travelCities: TravelCity[] = [
  {
    city: "杜布罗夫尼克",
    slug: "dubrovnik",
    country: "克罗地亚",
    emoji: "🏰",
    year: "2024",
    lat: 42.6507,
    lng: 18.0944,
    description:
      "亚得里亚海的明珠，君临城的故事在这里上演。古城墙环绕的老城，橙红色屋顶在阳光下熠熠生辉，每一块石板路都诉说着千年的故事。",
    attractions: [
      {
        name: "Lovrijenac 堡垒",
        description:
          "矗立在 37 米高海崖上的古老堡垒，是《权力的游戏》红堡的取景地。穿过拱形石门，内部的石砌庭院与垛口框住一片蔚蓝的亚得里亚海；从外侧回望，整座堡垒像一头灰色的狮子蹲伏在浪花拍打的悬崖之上。",
        highlight: true,
        photos: ["/dubrovnik/IMG_2398.jpg", "/dubrovnik/IMG_2414.jpg"],
      },
      {
        name: "杜布罗夫尼克老港",
        description:
          "黄昏的蓝调时刻，渔船与游艇静静地泊在港湾里，水面像一面深蓝色的镜子。对岸的山坡上，老城房屋的灯火一盏盏亮起，把海岸线缝成一条温暖的金线。",
        photos: ["/dubrovnik/IMG_2373.jpg"],
      },
      {
        name: "耶稣会阶梯",
        description:
          "巴洛克式的宽阔石阶从山顶的耶稣会教堂一直延伸到老城腹地。站在阶梯顶端向下望，两侧是暖黄色的石墙和零星的市集摊位，行人像电影里的剪影一样在石阶上起落。",
        photos: ["/dubrovnik/IMG_2446.jpg"],
      },
      {
        name: "亚得里亚海日落",
        description:
          "太阳沉向海的尽头，天空被染成橙红与紫罗兰的渐变色。远处的海岸线隐没在深绿的松林里，度假屋的轮廓在余晖中变得柔和；有时云层在低空翻涌，像一出无声的戏剧在天幕上谢幕。",
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
    city: "苏格兰",
    slug: "scotland",
    country: "英国",
    emoji: "🏴",
    year: "2019",
    lat: 56.0,
    lng: -3.7,
    description:
      "从爱丁堡城堡踞守的死火山岩，到格拉斯哥维多利亚时代的红砖街巷——苏格兰用一种苍凉而粗犷的美，把中世纪的记忆、高地的风、和工业时代的幽默一起装进了这块土地。",
    attractions: [
      {
        name: "爱丁堡城堡",
        description:
          "死火山 Castle Rock 的顶端，这座城堡已经守卫了爱丁堡近千年。雾气中的城门上方，金色的狮子纹章与「NEMO ME IMPUNE LACESSIT」的格言熠熠生辉；从王子街远眺，整座城堡像一座灰色的王冠戴在峭壁之上，皇家苏格兰灰龙骑兵团纪念碑的骑马雕像守望着它。",
        highlight: true,
        photos: ["/scotland/IMG_5282.jpg", "/scotland/IMG_5415.jpg"],
      },
      {
        name: "荷里路德修道院",
        description:
          "十二世纪奥古斯丁修道院的遗迹，高耸的哥特式花窗如今只剩下石框，像一幅镂空的画框把天空裁成几何图案。残破的立柱与拱门在潮湿的地面上投下长长的影子，雨滴积成小水洼，倒映着几个世纪的兴衰。",
        photos: ["/scotland/IMG_5367.jpg"],
      },
      {
        name: "乔治广场",
        description:
          "格拉斯哥市中心的心脏，维多利亚女王骑马雕像矗立在高大的花岗岩基座上，背景是红白相间的城市建筑与圣诞装饰。傍晚时分，金色的雪花灯串横跨广场，湿漉漉的地面映着灯火，行人与车辆穿梭其中，是这座城市最热闹的节日景象。",
        highlight: true,
        photos: ["/scotland/IMG_5224.jpg", "/scotland/IMG_5274.jpg"],
      },
      {
        name: "格拉斯哥大教堂",
        description:
          "苏格兰唯一一座在中世纪宗教改革中幸存下来的大教堂，深灰色的石墙与绿色的铜屋顶在阴天的光线下显得庄严而古老。高耸的尖塔指向低垂的云层，门前行人走过，仿佛时光在这里放慢了脚步。",
        photos: ["/scotland/IMG_5229.jpg"],
      },
      {
        name: "格拉斯哥现代艺术美术馆",
        description:
          "新古典主义柱廊上的金色字母写着「GALLERY OF MODERN ART」，门廊前的威灵顿公爵骑马雕像戴着标志性的橙色交通锥，成为格拉斯哥人幽默精神的象征。圣诞节期间，美术馆旁还立着一棵金色的灯光圣诞树，让庄严的建筑多了一份节日的俏皮。",
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
    city: "伊斯坦布尔",
    slug: "istanbul",
    country: "土耳其",
    emoji: "🕌",
    year: "2023",
    lat: 41.0082,
    lng: 28.9784,
    description:
      "横跨欧亚大陆的城市，博斯普鲁斯海峡将两片大陆分开，又将两种文明连接。蓝色清真寺的穹顶、圣索菲亚的马赛克——这里是东西方交汇的十字路口。",
    attractions: [
      {
        name: "圣索菲亚大教堂",
        description:
          "一千五百年间从教堂变为清真寺再变为博物馆，查士丁尼大帝的绝世之作。从苏丹艾哈迈德公园的喷泉前眺望，巨大的穹顶与四座宣礼塔勾勒出伊斯坦布尔最经典的天际线；走进内部，拜占庭黄金马赛克在幽暗中闪烁，基督、圣母与施洗者约翰的肖像跨越千年依然庄严。",
        highlight: true,
        photos: ["/istanbul/IMG_0709.jpg", "/istanbul/IMG_0719.jpg"],
      },
      {
        name: "蓝色清真寺",
        description:
          "六座宣礼塔矗立天际，层叠的圆顶与高耸的尖塔构成奥斯曼建筑的巅峰。灰白色的石墙与金色塔尖在阴云下显得格外肃穆，庭院里的拱门与喷泉静静迎接着来自世界各地的访客。",
        photos: ["/istanbul/IMG_0703.jpg"],
      },
      {
        name: "狄奥多西方尖碑",
        description:
          "公元前15世纪的古埃及方尖碑，如今矗立在古罗马赛马场的遗址上。灰色的花岗岩上刻满了象形文字，底座浮雕记录着拜占庭帝国的荣耀——时间在这里折叠了三千多年。",
        photos: ["/istanbul/IMG_0700.jpg"],
      },
      {
        name: "地下水宫殿",
        description:
          "查士丁尼大帝建造的地下蓄水池，三百多根科林斯石柱撑起一片幽暗的水世界。暖黄色的灯光从水底泛起，石柱的倒影在平静水面上摇曳，仿佛走入了拜占庭的秘密梦境。",
        photos: ["/istanbul/IMG_0724.jpg"],
      },
      {
        name: "多尔玛巴赫切宫",
        description:
          "奥斯曼帝国晚期的海滨宫殿，巴洛克与新古典主义在博斯普鲁斯海峡畔相遇。华丽的钟楼、镀金的帝国之门与花园中优雅的天鹅喷泉，诉说着一个帝国最后的奢华与浪漫。",
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
    city: "日本",
    slug: "japan",
    country: "日本",
    emoji: "🗾",
    year: "2018",
    lat: 35.6762,
    lng: 139.6503,
    description:
      "从东京的霓虹街头到京都的朱红古寺，从大阪的城下町到广岛的碧海鸟居——这次旅程穿越了日本最经典的城市与风景。每一张照片都是一段真实的足迹：明治神宫的森林、涩谷十字路口的人潮、清水寺的晨光、严岛神社的落日。",
    attractions: [
      {
        name: "明治神宮",
        description:
          "走进代代木森林深处的巨大木制鸟居，深褐色的柱梁上饰有菊花纹章。参道两旁是捐赠的酒桶墙，写满日本各地酒造的名字——这是东京市中心一片让人静下来的绿。",
        highlight: true,
        photos: ["/japan/IMG_0962.jpg", "/japan/IMG_0964.jpg"],
      },
      {
        name: "涩谷十字路口",
        description:
          "站在人群中等待绿灯，四周高楼电子屏闪烁。TSUTAYA、Hisamitsu、DHC 的广告牌层层叠叠，绿灯一亮，四面八方的人潮同时涌动——这是东京最标志性的瞬间。",
        highlight: true,
        photos: ["/japan/IMG_0969.jpg", "/japan/IMG_0970.jpg"],
      },
      {
        name: "新宿御苑",
        description:
          "东京市中心的一片和洋合璧的庭园。平静的湖面倒映着垂柳与修剪整齐的松树，夏日的天空被白云轻轻覆盖，是逃离都市喧嚣的片刻宁静。",
        photos: ["/japan/IMG_0972.jpg"],
      },
      {
        name: "秋叶原电器街",
        description:
          "Sofmap、Tsukumo 的招牌沿街林立，电线杆与电线交错成秋叶原特有的天际线。这里是电子产品、动漫文化与二手游戏卡带的圣地，每一步都充满御宅族的气息。",
        photos: ["/japan/IMG_0999.jpg"],
      },
      {
        name: "浅草寺雷门",
        description:
          "夜晚点亮的大红灯笼悬挂在雷门正中央，「金龍山」匾额在灯光下泛着古意。穿过雷门就是仲见世通，传统小吃与纪念品的灯火延续着江户时代的热闹。",
        highlight: true,
        photos: ["/japan/IMG_1005.jpg"],
      },
      {
        name: "东京夏日花火",
        description:
          "夜幕下的河滩挤满了人，远处的桥被灯光勾勒出金色的线条。手机闪光灯像繁星一样点缀在人群之中，这是东京夏天最浪漫的集体记忆。",
        photos: ["/japan/IMG_0985.jpg"],
      },
      {
        name: "清水寺",
        description:
          "朱红色的仁王门耸立在蓝天之下，石阶两侧是守护的石狮与石灯笼。沿着阶梯向上，京都的街道与远处的青山缓缓展开，这里是京都最具代表性的寺院风景。",
        highlight: true,
        photos: ["/japan/IMG_1023.jpg", "/japan/IMG_1026.jpg"],
      },
      {
        name: "伏见稻荷大社",
        description:
          "千本鸟居从山脚一路延伸到山顶，橙红色的门柱与黑色的基座在林间交错成隧道。入口的鸟居上高悬「稻荷大神」匾额，两侧是神社的使者——口中叼着稻穗的狐狸石像。",
        highlight: true,
        photos: ["/japan/IMG_1078.jpg", "/japan/IMG_1083.jpg"],
      },
      {
        name: "金阁寺",
        description:
          "鹿苑寺的金阁被金箔覆盖，倒映在镜湖池中。周围是精心修剪的松树与远处的青山，水面的涟漪让金色建筑微微晃动，如梦似幻。",
        highlight: true,
        photos: ["/japan/IMG_1066.jpg"],
      },
      {
        name: "岚山·渡月桥",
        description:
          "桂川从岚山脚下缓缓流过，河上的水堰形成一道白色的水帘。两岸是茂密的竹林与传统町屋，渡月桥连接着山与城，这里是京都西郊最诗意的风景。",
        photos: ["/japan/IMG_1089.jpg", "/japan/IMG_1096.jpg"],
      },
      {
        name: "嵯峨野观光铁道",
        description:
          "红色的观光小火车停靠在群山环绕的车站，车头上写着「嵯峨野 Romantic Train」。沿着保津溪谷行驶，窗外的青山、溪流与田园像一卷徐徐展开的京都画卷。",
        photos: ["/japan/IMG_1100.jpg"],
      },
      {
        name: "祇园祭",
        description:
          "夜晚的神轿巡游点亮了京都的街道，巨大的山鉾上挂满灯笼，人群穿着浴衣簇拥在神轿周围。锣鼓声与欢呼声交织，这是京都最盛大的夏日祭典。",
        highlight: true,
        photos: ["/japan/IMG_1044.jpg"],
      },
      {
        name: "大阪城",
        description:
          "白色的天守城矗立在深灰色的石垣之上，绿色的屋瓦与金色的鯱在阳光下闪闪发亮。丰臣秀吉时代的气魄依旧在这座城池的每一块石头里。",
        highlight: true,
        photos: ["/japan/IMG_1048.jpg"],
      },
      {
        name: "道顿堀·心斋桥",
        description:
          "大阪最热闹的街道，巨型看板从建筑外墙上层层叠叠地伸出：螃蟹、寿司、烧肉、唐吉诃德。人群中有人撑着阳伞，有人低头看手机，这是关西最具烟火气的日常。",
        photos: ["/japan/IMG_1056.jpg"],
      },
      {
        name: "大阪黄昏",
        description:
          "ANA Crowne Plaza 的红色标识在橙红色的晚霞中亮起，高架桥与办公楼的剪影横亘在城市上空。日落时分的云层被染成粉红与金黄，这是大阪送给旅人的一天谢幕。",
        photos: ["/japan/IMG_1057.jpg"],
      },
      {
        name: "广岛和平纪念公园",
        description:
          "原爆圆顶屋残存的砖墙与扭曲的钢筋骨架，在阴云下沉默地伫立。这座曾经是广岛县产业奖励馆的建筑，如今成为和平与战争记忆的象征。",
        highlight: true,
        photos: ["/japan/IMG_1119.jpg"],
      },
      {
        name: "严岛神社大鸟居",
        description:
          "朱红色的大鸟居矗立在海面上，退潮时它的基座暴露在滩涂上，涨潮时又像漂浮在水中。背后是宫岛的青山与濑户内海的岛屿，这是日本最具灵气的海上鸟居。",
        highlight: true,
        photos: ["/japan/IMG_1128.jpg", "/japan/IMG_1148.jpg"],
      },
      {
        name: "严岛神社",
        description:
          "神社的本殿建在海上的木栈平台之上，朱红色的回廊与黑色的屋瓦随波轻轻摇曳。舞殿前的地板与栏杆都是鲜艳的红色，与周围的山海形成强烈的对比。",
        photos: ["/japan/IMG_1132.jpg"],
      },
      {
        name: "弥山展望台",
        description:
          "从宫岛弥山俯瞰濑户内海，蓝色的海面上散布着大小不一的岛屿。天空晴朗，白云低垂，登山客的伞点缀在山路之间，这是广岛最美的全景。",
        photos: ["/japan/IMG_1140.jpg"],
      },
      {
        name: "平等院凤凰堂",
        description:
          "宇治平等院的凤凰堂倒映在布满睡莲的池中，深红色的木构与黑色的屋瓦在蓝天之下显得庄严而典雅。屋顶上的凤凰金像凝视着这片千年不变的庭园。",
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
    city: "纽约",
    slug: "new-york",
    country: "美国",
    emoji: "🗽",
    year: "2019",
    lat: 40.7128,
    lng: -74.006,
    description:
      "从帝国大厦的霓虹夜色到自由女神像的青铜轮廓，从洛克菲勒中心的金色雕像到峭石之巅俯瞰的钢铁森林——纽约用它标志性的天际线与街道，把每一次抬头都变成一张经典明信片。",
    attractions: [
      {
        name: "帝国大厦",
        description:
          "走进装饰艺术风格的大堂，整面大理石墙上镶嵌着光芒四射的帝国大厦金属浮雕。夜晚登上观景台，车流在曼哈顿的街道里汇成一条条光的河流，远处的世贸中心一号楼在夜空中闪烁着红色的航空警示灯。",
        highlight: true,
        photos: ["/new-york/IMG_1989.jpg", "/new-york/IMG_1977.jpg"],
      },
      {
        name: "洛克菲勒中心",
        description:
          "下沉广场中央，金色的普罗米修斯雕像倒映在喷泉水池中。周围环绕着各国国旗，背后的通用电气大楼笔直向上。这里是曼哈顿中城的心脏，也是每年圣诞节巨型圣诞树所在的地方。",
        photos: ["/new-york/IMG_1990.jpg"],
      },
      {
        name: "曼哈顿天际线",
        description:
          "从洛克菲勒中心的峭石之巅眺望，帝国大厦像一根银色的针插入蓝天，周围是密集的玻璃与钢骨森林。换乘渡轮从哈德逊河上回望，世贸中心一号楼在阴天的云层下显得格外孤傲，一艘白色渡轮正划开灰蓝色的水面。",
        highlight: true,
        photos: [
          "/new-york/IMG_1997.jpg",
          "/new-york/IMG_2008.jpg",
          "/new-york/IMG_2072.jpg",
        ],
      },
      {
        name: "自由女神像",
        description:
          "从自由岛仰望，绿色的铜质女神高举火炬，左手紧握《独立宣言》，皇冠的尖刺在灰蒙蒙的天空下划出清晰的轮廓。基座由粗糙的花岗岩砌成，下方隐约可见参观者的身影。",
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
    city: "巴黎",
    slug: "paris",
    country: "法国",
    emoji: "🗼",
    year: "2024",
    lat: 48.8566,
    lng: 2.3522,
    description:
      "塞纳河畔的光之城。埃菲尔铁塔在整点闪烁，卢浮宫的玻璃金字塔倒映着夕阳，蒙马特高地上街头艺人唱着香颂——巴黎是一种生活方式，而不只是一座城市。",
    attractions: [
      {
        name: "埃菲尔铁塔",
        description:
          "无论第几次来，铁塔在整点闪烁灯光的那一刻都会让人屏住呼吸。傍晚登塔——白天的巴黎和夜晚的巴黎一次看完。",
        highlight: true,
        photos: [
          "/paris/IMG_1636.jpg",
          "/paris/IMG_1637.jpg",
          "/paris/IMG_1669.jpg",
        ],
      },
      {
        name: "卢浮宫",
        description:
          "世界最大的博物馆，收藏了人类从古至今的艺术杰作。蒙娜丽莎前的自拍大军和维纳斯雕像前的安静凝视，都是卢浮宫的一部分。",
        photos: ["/paris/IMG_1700.jpg", "/paris/IMG_1723.jpg"],
      },
      {
        name: "蒙马特高地",
        description:
          "圣心大教堂坐落在巴黎最高点，俯瞰整座城市。旁边的小丘广场聚集了画家和街头艺人——毕加索和梵高也曾在这里作画。",
        photos: ["/paris/IMG_1665.jpg", "/paris/IMG_1693.jpg"],
      },
      {
        name: "塞纳河畔",
        description:
          "傍晚沿河散步，从圣母院到亚历山大三世桥。游船驶过，桥上的人们挥手致意——巴黎人的浪漫不需要理由。",
        highlight: true,
        photos: [
          "/paris/IMG_1642.jpg",
          "/paris/IMG_1706.jpg",
          "/paris/IMG_1737.jpg",
        ],
      },
      {
        name: "巴黎圣母院",
        description:
          "塞纳河上的哥特式杰作，八百年来见证了法国的荣耀与创伤。虽历经大火，玫瑰窗的光依然透过彩色玻璃照亮教堂内部。",
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
    url: "mailto:zzp@email.com",
    label: "Email",
  },
];
