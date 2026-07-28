const fs = require('fs');
let content = fs.readFileSync('src/data/profile.ts', 'utf8');

const newCities = [
  { city: '杜布罗夫尼克', slug: 'dubrovnik', country: '克罗地亚', emoji: '🏰', year: '2024', lat: 42.6507, lng: 18.0944, description: '亚得里亚海的明珠，君临城的故事在这里上演。古城墙环绕的老城，橙红色屋顶在阳光下熠熠生辉，每一块石板路都诉说着千年的故事。', attractions: [{ name: '杜布罗夫尼克古城墙', description: '环绕老城的千年石墙，全程约2公里。登上城墙俯瞰橙红色屋顶和湛蓝亚得里亚海，是君临城最经典的视角。', highlight: true }, { name: 'Lovrijenac 堡垒', description: '矗立在37米高海崖上的古老堡垒，是《权力的游戏》红堡的取景地。', highlight: true }, { name: '老城主街 Stradun', description: '贯穿老城的大理石主街，三百米长的光滑石板反射着阳光。' }, { name: '缆车山顶', description: '从老城北侧坐缆车登上Srd山，整个杜布罗夫尼克和亚得里亚海群岛尽收眼底。' }], photos: ['/dubrovnik/IMG_2373.jpg','/dubrovnik/IMG_2398.jpg','/dubrovnik/IMG_2414.jpg','/dubrovnik/IMG_2424.jpg','/dubrovnik/IMG_2426.jpg','/dubrovnik/IMG_2446.jpg'] },
  { city: '爱丁堡', slug: 'edinburgh', country: '英国', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', year: '2019', lat: 55.9533, lng: -3.1883, description: '卡尔顿山上的希腊风格国家纪念碑，皇家英里大道两旁的中世纪建筑。八月的军乐节和艺穗节让整座城市变成一场狂欢。', attractions: [{ name: '爱丁堡城堡', description: '坐落在死火山 Castle Rock 之上，是苏格兰最著名的地标。每天下午的「一点钟炮」是延续百年的传统。', highlight: true }, { name: '卡尔顿山', description: '山顶的希腊风格国家纪念碑让人恍惚间以为来到了雅典。' }, { name: '皇家英里大道', description: '连接爱丁堡城堡和荷里路德宫的石板路，两旁是沧桑的中世纪建筑。' }, { name: '亚瑟王座', description: '这座3.5亿年前的火山遗迹是爱丁堡最好的徒步路线。', highlight: true }], photos: ['/edinburgh/IMG_5224.jpg','/edinburgh/IMG_5229.jpg','/edinburgh/IMG_5272.jpg','/edinburgh/IMG_5274.jpg','/edinburgh/IMG_5282.jpg','/edinburgh/IMG_5367.jpg','/edinburgh/IMG_5415.jpg'] },
  { city: '伊斯坦布尔', slug: 'istanbul', country: '土耳其', emoji: '🕌', year: '2023', lat: 41.0082, lng: 28.9784, description: '横跨欧亚大陆的城市，博斯普鲁斯海峡将两片大陆分开，又将两种文明连接。蓝色清真寺的穹顶、圣索菲亚的马赛克——这里是东西方交汇的十字路口。', attractions: [{ name: '圣索菲亚大教堂', description: '一千五百年间从教堂变为清真寺再变为博物馆，查士丁尼大帝的绝世之作。抬头仰望巨大的穹顶，仿佛悬浮在天堂与人间的交界。', highlight: true }, { name: '蓝色清真寺', description: '六座宣礼塔矗立天际，内部两万片伊兹尼克蓝色瓷砖笼罩在神秘光晕中。' }, { name: '博斯普鲁斯海峡', description: '乘渡轮从欧洲到亚洲只需二十分钟。两岸的奥斯曼宫殿、拜占庭城墙交替出现。' }, { name: '加拉塔塔', description: '热那亚人留下的石塔是俯瞰金角湾的最佳位置。欧亚两岸尽收眼底。', highlight: true }], photos: ['/istanbul/IMG_0700.jpg','/istanbul/IMG_0703.jpg','/istanbul/IMG_0709.jpg','/istanbul/IMG_0719.jpg','/istanbul/IMG_0724.jpg','/istanbul/IMG_0761.jpg','/istanbul/IMG_E0762.jpg','/istanbul/IMG_E0765.jpg'] },
  { city: '日本', slug: 'japan', country: '日本', emoji: '🗾', year: '2024', lat: 35.6762, lng: 139.6503, description: '从东京的霓虹都市到京都的千年古寺，日本是一个让人愿意一去再去的国家。涩谷十字路口的人潮、伏见稻荷的千本鸟居——每次探索都有新的惊喜。', attractions: [{ name: '涩谷十字路口', description: '世界最繁忙的十字路口，每分钟上千人穿行而过。站在高处俯瞰人潮，感受东京最强劲的脉搏。', highlight: true }, { name: '伏见稻荷大社', description: '千本鸟居从山脚延伸到山顶，橙红色的鸟居隧道是日本最震撼的风景。', highlight: true }, { name: '秋叶原', description: '电器街与二次元文化的圣地。从最新的电子产品到复古游戏卡带，这里是御宅族的天堂。' }, { name: '岚山竹林', description: '嵯峨野的竹林小径两侧是高耸入云的黑竹，风穿过竹林的沙沙声是「日本百音」之一。', highlight: true }, { name: '花见小路', description: '祇园最著名的石板路，两旁是保存完好的木质町屋。傍晚偶遇真正的艺伎——她们步履匆匆赶往茶屋。' }, { name: '筑地·丰洲市场', description: '清晨的寿司大排队是东京最值得的等待之一。最新鲜的食材和最地道的江户前寿司。' }], photos: ['/japan/IMG_0962.jpg','/japan/IMG_0964.jpg','/japan/IMG_0969.jpg','/japan/IMG_0970.jpg','/japan/IMG_0972.jpg','/japan/IMG_0985.jpg','/japan/IMG_0999.jpg','/japan/IMG_1005.jpg','/japan/IMG_1023.jpg','/japan/IMG_1026.jpg','/japan/IMG_1044.jpg','/japan/IMG_1048.jpg','/japan/IMG_1056.jpg','/japan/IMG_1057.jpg','/japan/IMG_1066.jpg','/japan/IMG_1078.jpg','/japan/IMG_1083.jpg','/japan/IMG_1089.jpg','/japan/IMG_1096.jpg','/japan/IMG_1100.jpg','/japan/IMG_1119.jpg','/japan/IMG_1128.jpg','/japan/IMG_1132.jpg','/japan/IMG_1140.jpg','/japan/IMG_1148.jpg','/japan/IMG_1173.jpg'] },
  { city: '纽约', slug: 'new-york', country: '美国', emoji: '🗽', year: '2025', lat: 40.7128, lng: -74.006, description: '这座不夜城用它的天际线、多元文化和无限活力征服了每一个来访者。从曼哈顿的摩天大楼到布鲁克林的街头艺术——纽约永远让你感到渺小，又让你相信一切皆有可能。', attractions: [{ name: '自由女神像', description: '美国的象征，从Battery Park乘渡轮前往自由岛。仰望这座高举火炬的铜像时，能感受到它承载的百年移民梦想。', highlight: true }, { name: '中央公园', description: '曼哈顿中心的绿色奇迹。在钢筋水泥丛林中突然出现的843英亩绿地——跑步、划船、野餐，纽约客的真实生活在这里展开。' }, { name: '时代广场', description: '夜幕降临后，数以百万计的霓虹灯把这里变成一座光的瀑布。每个人都在仰头张望——那是第一次来纽约的标准姿势。', highlight: true }, { name: '布鲁克林大桥', description: '从曼哈顿步行过桥到布鲁克林是纽约最经典的体验。钢索在头顶交织成几何图案，背后天际线逐渐拉开。' }], photos: ['/new-york/IMG_1977.jpg','/new-york/IMG_1989.jpg','/new-york/IMG_1990.jpg','/new-york/IMG_1997.jpg','/new-york/IMG_2008.jpg','/new-york/IMG_2063.jpg','/new-york/IMG_2072.jpg'] },
  { city: '巴黎', slug: 'paris', country: '法国', emoji: '🗼', year: '2024', lat: 48.8566, lng: 2.3522, description: '塞纳河畔的光之城。埃菲尔铁塔在整点闪烁，卢浮宫的玻璃金字塔倒映着夕阳，蒙马特高地上街头艺人唱着香颂——巴黎是一种生活方式，而不只是一座城市。', attractions: [{ name: '埃菲尔铁塔', description: '无论第几次来，铁塔在整点闪烁灯光的那一刻都会让人屏住呼吸。傍晚登塔——白天的巴黎和夜晚的巴黎一次看完。', highlight: true }, { name: '卢浮宫', description: '世界最大的博物馆，收藏了人类从古至今的艺术杰作。蒙娜丽莎前的自拍大军和维纳斯雕像前的安静凝视，都是卢浮宫的一部分。' }, { name: '蒙马特高地', description: '圣心大教堂坐落在巴黎最高点，俯瞰整座城市。旁边的小丘广场聚集了画家和街头艺人——毕加索和梵高也曾在这里作画。' }, { name: '塞纳河畔', description: '傍晚沿河散步，从圣母院到亚历山大三世桥。游船驶过，桥上的人们挥手致意——巴黎人的浪漫不需要理由。', highlight: true }], photos: ['/paris/IMG_1636.jpg','/paris/IMG_1637.jpg','/paris/IMG_1642.jpg','/paris/IMG_1665.jpg','/paris/IMG_1669.jpg','/paris/IMG_1693.jpg','/paris/IMG_1700.jpg','/paris/IMG_1706.jpg','/paris/IMG_1718.jpg','/paris/IMG_1723.jpg','/paris/IMG_1737.jpg'] }
];

function escape(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function cityToTs(c) {
  let s = '  {\n';
  s += '    city: "' + c.city + '",\n';
  s += '    slug: "' + c.slug + '",\n';
  s += '    country: "' + c.country + '",\n';
  s += '    emoji: "' + c.emoji + '",\n';
  s += '    year: "' + c.year + '",\n';
  s += '    lat: ' + c.lat + ',\n';
  s += '    lng: ' + c.lng + ',\n';
  s += '    description:\n      "' + escape(c.description) + '",\n';
  s += '    attractions: [\n';
  for (const a of c.attractions) {
    s += '      { name: "' + a.name + '", description: "' + escape(a.description) + '"' + (a.highlight ? ', highlight: true' : '') + ' },\n';
  }
  s += '    ],\n';
  s += '    photos: [\n';
  for (let i = 0; i < c.photos.length; i++) {
    s += '      "' + c.photos[i] + '"' + (i < c.photos.length - 1 ? ',' : '') + '\n';
  }
  s += '    ],\n';
  s += '  },\n';
  return s;
}

const marker = 'export const travelCities: TravelCity[] = [';
const start = content.indexOf(marker);
let depth = 0, inArr = false, end = -1;
for (let i = start; i < content.length; i++) {
  if (content[i] === '[') { depth++; inArr = true; }
  else if (content[i] === ']') { depth--; }
  if (inArr && depth === 0) { end = i + 1; break; }
}

const newArr = marker + '\n' + newCities.map(cityToTs).join('') + ']';
content = content.slice(0, start) + newArr + content.slice(end);
fs.writeFileSync('src/data/profile.ts', content);
console.log('OK - profile.ts updated with ' + newCities.length + ' cities');
