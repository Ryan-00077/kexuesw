import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('src/data');
fs.mkdirSync(dataDir, { recursive: true });

// Read payload.json
const homePayloadRaw = JSON.parse(fs.readFileSync('payload.json', 'utf-8'));
const homePayload = homePayloadRaw.payload;

// Read rankings.html full_ranking payload
const rankingsHtml = fs.readFileSync('rankings.html', 'utf-8');
const rankingsMatch = rankingsHtml.match(/<script id="__GATERANK_INITIAL_DATA__"[^>]*>(.*?)<\/script>/s);
let fullRankingItems = [];
if (rankingsMatch) {
  const rankingData = JSON.parse(rankingsMatch[1]);
  if (rankingData.payload && rankingData.payload.items) {
    fullRankingItems = rankingData.payload.items;
  }
}

// 1. siteConfig.json
const siteConfig = {
  title: "机场榜GateRank | 机场 VPN 推荐、科学上网机场测评与可靠性榜单",
  brandName: "GateRank",
  brandTitle: "机场榜",
  slogan: "行业首创，每日更新",
  heroEyebrow: "今日更新 · 透明机制",
  heroTitle: "机场榜：机场 VPN 推荐与可靠性榜单",
  heroSubtitle: "基于公开监测数据生成，首页优秀机场公平轮换，并提供长期稳定、性价比、新入榜与风险预警榜单。",
  metrics: {
    monitoredAirports: homePayload.hero.monitored_airports || 80,
    realtimeTests: homePayload.hero.realtime_tests || 108841,
    reportTimeText: homePayload.hero.report_time_text || "刚刚更新",
    reportTimeAt: homePayload.hero.report_time_at || new Date().toISOString()
  },
  contact: {
    telegram: "https://t.me/gaterank",
    email: "contact@gate-rank.com"
  }
};
fs.writeFileSync(path.join(dataDir, 'siteConfig.json'), JSON.stringify(siteConfig, null, 2), 'utf-8');

// 2. airports.json
// Combine ranking_preview items and fullRankingItems, ensuring unique by airport_id
const allAirportsMap = new Map();
if (fullRankingItems.length > 0) {
  fullRankingItems.forEach(item => allAirportsMap.set(item.airport_id, item));
}
if (homePayload.ranking_preview && homePayload.ranking_preview.items) {
  homePayload.ranking_preview.items.forEach(item => {
    if (!allAirportsMap.has(item.airport_id)) {
      allAirportsMap.set(item.airport_id, item);
    }
  });
}
const allAirports = Array.from(allAirportsMap.values());
fs.writeFileSync(path.join(dataDir, 'airports.json'), JSON.stringify(allAirports, null, 2), 'utf-8');

// 3. deals.json
const deals = homePayload.sponsored_deals?.items || [];
fs.writeFileSync(path.join(dataDir, 'deals.json'), JSON.stringify(deals, null, 2), 'utf-8');

// 4. news.json
const news = homePayload.news_updates || [];
fs.writeFileSync(path.join(dataDir, 'news.json'), JSON.stringify(news, null, 2), 'utf-8');

// 5. sections.json (Four dimensions: today_pick, most_stable, best_value, new_entries, risk_alerts)
const sections = homePayload.sections || {};
fs.writeFileSync(path.join(dataDir, 'sections.json'), JSON.stringify(sections, null, 2), 'utf-8');

// 6. tools.json (Clients and download tools)
const tools = [
  {
    id: "clash-verge-rev",
    name: "Clash Verge Rev",
    category: "桌面端",
    platforms: ["Windows", "macOS", "Linux"],
    description: "新一代 Clash 桌面客户端，支持 Clash Meta 核心，界面现代化且功能完备。",
    recommended: true,
    version: "v2.0.4",
    icon: "laptop",
    downloadUrl: "https://github.com/clash-verge-rev/clash-verge-rev/releases"
  },
  {
    id: "sing-box",
    name: "sing-box",
    category: "全平台通用",
    platforms: ["Windows", "macOS", "Linux", "Android", "iOS"],
    description: "通用代理平台，支持所有流行协议（VLESS、Shadowsocks、Hysteria2、TUIC 等），性能强悍极致省电。",
    recommended: true,
    version: "v1.11.0",
    icon: "box",
    downloadUrl: "https://github.com/SagerNet/sing-box/releases"
  },
  {
    id: "shadowrocket",
    name: "Shadowrocket (小火箭)",
    category: "iOS / iPadOS",
    platforms: ["iOS", "iPadOS"],
    description: "iOS 首选代理工具，规则分流完善，支持节点测速、URL Test 与自动化切换。",
    recommended: true,
    version: "最新版",
    icon: "smartphone",
    downloadUrl: "https://apps.apple.com/app/shadowrocket/id932747118"
  },
  {
    id: "nekobox",
    name: "NekoBox for Android",
    category: "Android 移动端",
    platforms: ["Android"],
    description: "基于 sing-box 核心的 Android 代理客户端，支持各类现代专线协议与便捷订阅。",
    recommended: true,
    version: "v1.3.3",
    icon: "smartphone",
    downloadUrl: "https://github.com/MatsuriDayo/NekoBoxForAndroid/releases"
  },
  {
    id: "v2rayn",
    name: "v2rayN",
    category: "Windows 客户端",
    platforms: ["Windows"],
    description: "经典 Windows GUI 客户端，支持 Xray 与 sing-box 双核心，测速与批量管理首选。",
    recommended: false,
    version: "v7.1.5",
    icon: "laptop",
    downloadUrl: "https://github.com/2dust/v2rayN/releases"
  },
  {
    id: "stash",
    name: "Stash",
    category: "Apple 生态",
    platforms: ["iOS", "macOS", "tvOS"],
    description: "基于 Clash 规则的苹果生态高级代理客户端，支持全协议与家庭网络接管。",
    recommended: false,
    version: "v2.6.0",
    icon: "apple",
    downloadUrl: "https://apps.apple.com/app/stash-rule-based-proxy/id1596063349"
  }
];
fs.writeFileSync(path.join(dataDir, 'tools.json'), JSON.stringify(tools, null, 2), 'utf-8');

// 7. faq.json (Frequently Asked Questions)
const faqs = [
  {
    question: "GateRank 榜单的评分与排名是如何计算的？",
    answer: "GateRank 依托自建自动化探针矩阵，24小时不间断对各大机场进行连通性探测、晚高峰（20:00-24:00）吞吐测速、丢包率与流媒体解锁持续监测。综合可用率、晚高峰延迟稳定性、价格与运营历史时长加权计算出每日评分，并在首页对优秀机场采取公平轮换机制。"
  },
  {
    question: "为什么有些机场被列入【风险预警】？",
    answer: "当自动化探针监测到某机场官方网站无法访问、节点大面积超时超过48小时、Telegram官方交流群禁言或管理人员失联时，系统会自动发出预警提示，帮助用户避开潜在跑路风险。历史快照仅供参考，请避免一次性大额年付。"
  },
  {
    question: "新手应该如何选择适合自己的机场？",
    answer: "首先看使用场景：如果是日常查资料或刷社交媒体，参考【性价比推荐】榜单，选择月付 10-20 元左右即可；如果重度使用 ChatGPT/Claude 等 AI 工具或看 Netflix 4K，请优先选择具备【原生IP】、【AI全解锁】与【IEPL/IPLC专线】标签的长期稳定机场。"
  },
  {
    question: "什么是 IEPL / IPLC 专线？与普通中转有什么区别？",
    answer: "IEPL（国际以太网私有专线）和 IPLC（国际私有租用线路）是端到端的企业级内网物理通道，流量不经过公网 GFW 防火墙审查，因此在敏感时期依然具有极高的抗封锁能力与极低的晚高峰丢包抖动，但成本相对较高。"
  },
  {
    question: "我如何向 GateRank 申请入驻测试？",
    answer: "机场运营方可在顶部导航点击【申请入驻测试】，提交机场基础资料与测试节点。由探针系统核实验证后，方可上线榜单并参与数据监测展示。"
  }
];
fs.writeFileSync(path.join(dataDir, 'faq.json'), JSON.stringify(faqs, null, 2), 'utf-8');

console.log('Successfully generated all data files in src/data!');

