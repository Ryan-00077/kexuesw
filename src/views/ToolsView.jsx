import React, { useState } from 'react';

export default function ToolsView({ activePlatform: externalPlatform, setActivePlatform: setExternalPlatform }) {
  const [internalPlatform, setInternalPlatform] = useState('all');
  const activePlatform = externalPlatform !== undefined ? externalPlatform : internalPlatform;
  const setActivePlatform = setExternalPlatform || setInternalPlatform;

  const groups = [
    {
      id: 'windows',
      name: 'Windows 下载',
      title: 'Windows 翻墙工具下载',
      desc: '适合 Windows 10/11 设备使用的翻墙工具下载，本地安装包优先展示，官方页面作为备用入口。',
      tools: [
        {
          name: 'Karing',
          version: '1.2.26.2923',
          date: '2026-11-09',
          os: 'Windows 10/11',
          size: '49.6 MB',
          desc: '本地文件来自官方发布页同步，支持全协议分流，界面优雅。',
          download: 'https://github.com/KaringX/karing/releases',
          official: 'https://github.com/KaringX/karing',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: true
        },
        {
          name: 'Hiddify',
          version: '5.5.5',
          date: '2026-11-05',
          os: 'Windows 10/11',
          size: '46.7 MB',
          desc: '新手友好，全协议支持（Sing-box 核心），配置简单一键导入。',
          download: 'https://github.com/hiddify/hiddify-app/releases',
          official: 'https://github.com/hiddify/hiddify-app',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: true
        },
        {
          name: 'FlClash',
          version: '0.9.3',
          date: '2026-11-04',
          os: 'Windows 10/11',
          size: '41.3 MB',
          desc: '基于 Flutter 开发的多平台 Clash 客户端，轻巧美观。',
          download: 'https://github.com/chen08209/FlClash/releases',
          official: 'https://github.com/chen08209/FlClash',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: true
        },
        {
          name: 'Clash Verge Rev',
          version: '2.0.4',
          date: '2026-11-01',
          os: 'Windows 10/11',
          size: '52.1 MB',
          desc: '基于 Clash Meta (Mihomo) 核心的 Windows 主力客户端首选。',
          download: 'https://github.com/clash-verge-rev/clash-verge-rev/releases',
          official: 'https://github.com/clash-verge-rev/clash-verge-rev',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: true
        },
        {
          name: 'sing-box',
          version: '1.11.0',
          date: '2026-10-28',
          os: 'Windows 7/10/11',
          size: '18.4 MB',
          desc: '现代化通用代理平台，极致性能，支持最新 VLESS、TUIC、Hysteria2。',
          download: 'https://github.com/SagerNet/sing-box/releases',
          official: 'https://github.com/SagerNet/sing-box',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: false
        },
        {
          name: 'v2rayN',
          version: '7.1.5',
          date: '2026-10-20',
          os: 'Windows 10/11',
          size: '22.8 MB',
          desc: '经典 Windows GUI 客户端，支持 Xray 与 sing-box 双核心。',
          download: 'https://github.com/2dust/v2rayN/releases',
          official: 'https://github.com/2dust/v2rayN',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: false
        }
      ]
    },
    {
      id: 'macos',
      name: 'macOS 下载',
      title: 'macOS 翻墙工具下载',
      desc: '适合苹果 Mac 设备使用的翻墙代理客户端，支持 Apple Silicon M系列与 Intel 芯片。',
      tools: [
        {
          name: 'Clash Verge Rev (Mac)',
          version: '2.0.4',
          date: '2026-11-01',
          os: 'macOS 12+ (Universal)',
          size: '64.2 MB',
          desc: 'Mac 端目前维护最积极的 Clash Meta 桌面客户端，原生支持 TUN 网卡接管。',
          download: 'https://github.com/clash-verge-rev/clash-verge-rev/releases',
          official: 'https://github.com/clash-verge-rev/clash-verge-rev',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: true
        },
        {
          name: 'sing-box (macOS)',
          version: '1.11.0',
          date: '2026-10-28',
          os: 'macOS 12+',
          size: '21.5 MB',
          desc: '原生支持 macOS 系统级网络接管与独立守护进程，极低内存消耗。',
          download: 'https://github.com/SagerNet/sing-box/releases',
          official: 'https://github.com/SagerNet/sing-box',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: true
        },
        {
          name: 'Karing (Mac)',
          version: '1.2.26.2923',
          date: '2026-11-09',
          os: 'macOS 12+ (Universal)',
          size: '56.3 MB',
          desc: '全新跨平台代理工具，体验平滑，规则分流完善，支持丰富出站协议。',
          download: 'https://github.com/KaringX/karing/releases',
          official: 'https://github.com/KaringX/karing',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: true
        },
        {
          name: 'Stash for Mac',
          version: '2.6.0',
          date: '2026-10-15',
          os: 'macOS 11+',
          size: '38.0 MB',
          desc: '基于 Clash 规则的高颜值苹果生态客户端，支持多协议订阅与按需连接。',
          download: 'https://apps.apple.com/app/stash-rule-based-proxy/id1596063349',
          official: 'https://stash.ws/',
          actionText: 'App Store',
          officialText: '官方网站',
          isHot: false
        }
      ]
    },
    {
      id: 'ios',
      name: 'iOS / iPadOS 下载',
      title: 'iOS 翻墙工具下载',
      desc: 'iPhone 与 iPad 平台主流网络代理工具（需要非国区 Apple ID 安装）。',
      tools: [
        {
          name: 'Shadowrocket (小火箭)',
          version: '2.2.65',
          date: '2026-11-02',
          os: 'iOS 12.0+',
          size: '34.5 MB',
          desc: 'iOS 端最普及的翻墙工具，支持一键扫码导入、规则分流与场景自动化。',
          download: 'https://apps.apple.com/app/shadowrocket/id932747118',
          official: 'https://apps.apple.com/app/shadowrocket/id932747118',
          actionText: 'App Store',
          officialText: '官方详情',
          isHot: true
        },
        {
          name: 'Stash',
          version: '2.6.2',
          date: '2026-10-25',
          os: 'iOS 15.0+',
          size: '42.1 MB',
          desc: '苹果生态深度优化的代理软件，支持按需连接与智能切流，支持多协议。',
          download: 'https://apps.apple.com/app/stash-rule-based-proxy/id1596063349',
          official: 'https://stash.ws/',
          actionText: 'App Store',
          officialText: '官方网站',
          isHot: true
        },
        {
          name: 'Quantumult X (圈X)',
          version: '1.5.0',
          date: '2026-09-30',
          os: 'iOS 14.0+',
          size: '38.6 MB',
          desc: '老牌高性能分流工具，适合进阶用户配置重写、MITM 与 JavaScript 脚本。',
          download: 'https://apps.apple.com/app/quantumult-x/id1453926890',
          official: 'https://apps.apple.com/app/quantumult-x/id1453926890',
          actionText: 'App Store',
          officialText: '官方详情',
          isHot: false
        },
        {
          name: 'sing-box for iOS',
          version: '1.11.0',
          date: '2026-10-28',
          os: 'iOS 15.0+',
          size: '19.8 MB',
          desc: 'App Store 免费上架的通用代理平台，现代内核、省电且无内置内购。',
          download: 'https://apps.apple.com/app/sing-box/id6451272673',
          official: 'https://github.com/SagerNet/sing-box',
          actionText: 'App Store',
          officialText: 'GitHub 仓库',
          isHot: false
        }
      ]
    },
    {
      id: 'android',
      name: 'Android 下载',
      title: 'Android 翻墙工具下载',
      desc: '安卓手机与平板代理客户端 APK，全部来自 GitHub 开源仓库官方同步。',
      tools: [
        {
          name: 'NekoBox for Android',
          version: '1.3.3',
          date: '2026-11-08',
          os: 'Android 7.0+',
          size: '28.4 MB',
          desc: '基于 sing-box 核心的安卓首选代理客户端，全协议适配良好，支持分应用代理。',
          download: 'https://github.com/MatsuriDayo/NekoBoxForAndroid/releases',
          official: 'https://github.com/MatsuriDayo/NekoBoxForAndroid',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: true
        },
        {
          name: 'Clash Meta for Android (CMFA)',
          version: '2.10.1',
          date: '2026-10-25',
          os: 'Android 7.0+',
          size: '32.1 MB',
          desc: '经典 Clash Android 客户端 Meta 衍生版本，支持分应用代理与图形化测速。',
          download: 'https://github.com/MetaCubeX/ClashMetaForAndroid/releases',
          official: 'https://github.com/MetaCubeX/ClashMetaForAndroid',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: true
        },
        {
          name: 'sing-box for Android',
          version: '1.11.0',
          date: '2026-10-28',
          os: 'Android 8.0+',
          size: '16.8 MB',
          desc: '官方图形客户端，极低耗电，兼容 Hysteria2 / TUIC / VLESS。',
          download: 'https://github.com/SagerNet/sing-box/releases',
          official: 'https://github.com/SagerNet/sing-box',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: true
        },
        {
          name: 'v2rayNG',
          version: '1.9.15',
          date: '2026-10-18',
          os: 'Android 6.0+',
          size: '24.2 MB',
          desc: '经典安卓代理客户端，配置简单，扫码即用，内存占用低。',
          download: 'https://github.com/2dust/v2rayNG/releases',
          official: 'https://github.com/2dust/v2rayNG',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: false
        }
      ]
    },
    {
      id: 'linux',
      name: 'Linux 下载',
      title: 'Linux 翻墙工具下载',
      desc: '适用于 Ubuntu、Debian、Arch Linux 与各类 Linux 发行版的客户端与二进制核心。',
      tools: [
        {
          name: 'Clash Verge Rev (Linux)',
          version: '2.0.4',
          date: '2026-11-01',
          os: 'Debian / Ubuntu / AppImage',
          size: '72.5 MB',
          desc: '支持 TUN 虚拟网卡模式接管全局流量的 Linux 桌面首选，基于 Tauri 打造。',
          download: 'https://github.com/clash-verge-rev/clash-verge-rev/releases',
          official: 'https://github.com/clash-verge-rev/clash-verge-rev',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: true
        },
        {
          name: 'sing-box (Linux Binary)',
          version: '1.11.0',
          date: '2026-10-28',
          os: 'Linux AMD64 / ARM64',
          size: '15.2 MB',
          desc: '单可执行二进制文件，支持 systemd 服务托管，极致轻盈与极高并发吞吐。',
          download: 'https://github.com/SagerNet/sing-box/releases',
          official: 'https://github.com/SagerNet/sing-box',
          actionText: '立即下载',
          officialText: '官方页面',
          isHot: true
        }
      ]
    },
    {
      id: 'streaming-check',
      name: '流媒体解锁检测',
      title: '流媒体与 AI 服务解锁检测工具',
      desc: '在线检测当前节点出口对 Netflix、Disney+、ChatGPT、Claude、TikTok 及 YouTube Premium 等受限流媒体与 AI 服务的解锁支持。',
      tools: [
        {
          name: 'StreamCheck 流媒体检测',
          version: '云端在线',
          date: '实时在线',
          os: '全平台浏览器',
          size: '免安装 · 极速响应',
          desc: '分布式边缘探针，快速识别当前出口 IP 是原生解锁还是仅支持自制剧，排查 DNS 代理与流媒体区域阻断。',
          download: 'https://streamcheck.run/',
          official: 'https://check.unlock.media/',
          actionText: '前往检测',
          officialText: '备用入口',
          isHot: true
        },
        {
          name: 'ChatGPT / OpenAI 连通检测',
          version: '官方端点',
          date: '实时探测',
          os: '浏览器 / API',
          size: '在线即测',
          desc: '直连测试当前 IP 是否触发 Cloudflare 严格人机验证、国家/地区不可用（Unsupported Country）或 403 阻断。',
          download: 'https://chatgpt.com/',
          official: 'https://platform.openai.com/',
          actionText: '打开测试',
          officialText: '官方平台',
          isHot: true
        },
        {
          name: 'Claude (Anthropic) 区域检测',
          version: '官方入口',
          date: '实时探测',
          os: '全平台浏览器',
          size: '在线即测',
          desc: 'Anthropic 对数据中心机房 IP 审查极其严格，通过该入口验证当前节点是否会弹出“App unavailable”地区封锁提示。',
          download: 'https://claude.ai/',
          official: 'https://www.anthropic.com/',
          actionText: '打开测试',
          officialText: '官方网站',
          isHot: true
        },
        {
          name: 'Check.place 流媒体与住宅检测',
          version: '开源脚本 & Web',
          date: '2026 最新版',
          os: 'Web / Linux VPS',
          size: '多维度评测',
          desc: '全方位开源流媒体检测方案，支持 Spotify、TikTok、Bilibili 港澳台、YouTube Premium 及动画疯区域权限探测。',
          download: 'https://check.place/',
          official: 'https://github.com/oneclickvirt/check',
          actionText: '前往检测',
          officialText: '开源仓库',
          isHot: false
        }
      ]
    },
    {
      id: 'ip-check',
      name: 'IP 检测',
      title: '公网出口 IP 与地理信息查询',
      desc: '快速获取当前网络经由代理后的真实 IPv4 / IPv6 地址、机房运营商、自治系统号 (ASN)、地理经纬度与时区。',
      tools: [
        {
          name: 'IPinfo.io 权威地理定位',
          version: '全球权威库',
          date: '实时同步',
          os: '全平台浏览器',
          size: '含完整 ASN 拓扑',
          desc: '全球开发者最信赖的 IP 数据源，精确到出口数据中心机房名称、BGP 路由广播源、所属企业及物理城市坐标。',
          download: 'https://ipinfo.io/',
          official: 'https://ipinfo.io/products/ip-geolocation-api',
          actionText: '立即查询',
          officialText: 'API 文档',
          isHot: true
        },
        {
          name: 'IP.SB 极速双栈查询',
          version: '毫秒级响应',
          date: '实时在线',
          os: '全平台支持',
          size: '无广告 · 纯净轻量',
          desc: '极简界面与极速加载，一秒展示当前终端对外通信的 IPv4 与 IPv6 地址，快速识别电信、联通、移动出国出口。',
          download: 'https://ip.sb/',
          official: 'https://ip.sb/api/',
          actionText: '立即查询',
          officialText: '开发接口',
          isHot: true
        },
        {
          name: 'IPIP.net 高精自治系统查询',
          version: '专业骨干网库',
          date: '高频校准',
          os: 'Web / 客户端',
          size: '国内高精标杆',
          desc: '国内最专业的老牌 IP 库，深度解析 AS 自治域号码、所属运营商组织以及中转网络链路骨干网跳数。',
          download: 'https://www.ipip.net/ip.html',
          official: 'https://www.ipip.net/',
          actionText: '立即查询',
          officialText: '官方网站',
          isHot: false
        },
        {
          name: 'WhatIsMyIPAddress 全球查询',
          version: '经典测试站',
          date: '国际知名',
          os: '全平台浏览器',
          size: '支持黑名单初筛',
          desc: '成立超 20 年的全球网络基础测试平台，可查看节点主机域名反向解析记录与基础欺诈风险初筛。',
          download: 'https://whatismyipaddress.com/',
          official: 'https://whatismyipaddress.com/ip-lookup',
          actionText: '立即查询',
          officialText: '反查工具',
          isHot: false
        }
      ]
    },
    {
      id: 'ip-purity',
      name: 'IP 纯净度检测',
      title: 'IP 纯净度、欺诈分与风控等级检测',
      desc: '评估节点 IP 是否属于机房数据中心（Datacenter）或原生住宅 IP（Residential），检测欺诈分值与风控黑名单。',
      tools: [
        {
          name: 'Scamalytics 欺诈分值查询',
          version: '风控信誉库',
          date: '0-100 评分',
          os: '全平台浏览器',
          size: '低分越纯净',
          desc: '各大跨境风控系统普遍参考的信誉库，欺诈评分低于 20 分为优质住宅节点，高于 50 分极易触发网站封锁与验证码。',
          download: 'https://scamalytics.com/ip',
          official: 'https://scamalytics.com/',
          actionText: '立即检测',
          officialText: '风控指南',
          isHot: true
        },
        {
          name: 'IPQualityScore (IPQS) 风险雷达',
          version: '深度风控模型',
          date: '实时风险评估',
          os: '全平台浏览器',
          size: '含 Bot / 代理识别',
          desc: '深入扫描节点是否被标记为公开 VPN、商业代理或恶意爬虫，广泛应用于银行、Stripe 支付网关的 IP 初审。',
          download: 'https://www.ipqualityscore.com/free-ip-lookup-proxy-vpn-test',
          official: 'https://www.ipqualityscore.com/',
          actionText: '立即检测',
          officialText: '平台详情',
          isHot: true
        },
        {
          name: 'Ping0.cc 节点纯净度看板',
          version: '科学上网专项',
          date: '实时探测',
          os: '全平台浏览器',
          size: '原生住宅判定',
          desc: '专为翻墙与跨境网络打造，直观展示 IP 广播地与注册地是否一致、Google 搜索是否弹验证码以及双栈纯净度。',
          download: 'https://ping0.cc/',
          official: 'https://ping0.cc/',
          actionText: '立即检测',
          officialText: '备用入口',
          isHot: true
        },
        {
          name: 'AbuseIPDB 恶意行为举报库',
          version: '全球网络反查',
          date: '30 天攻击追踪',
          os: 'Web 在线反查',
          size: '安全信誉库',
          desc: '反查节点 IP 在过去 30 天内是否有黑客扫描、SSH 撞库攻击或被网警、主机商封锁的历史举报记录。',
          download: 'https://www.abuseipdb.com/',
          official: 'https://www.abuseipdb.com/check',
          actionText: '立即检测',
          officialText: '举报历史',
          isHot: false
        }
      ]
    },
    {
      id: 'dns-leak',
      name: 'DNS 泄漏检测',
      title: 'DNS 隐私泄漏与劫持探测',
      desc: '测试系统在经过代理隧道时，域名解析请求是否被泄漏给国内本地运营商，排查 WebRTC 穿透与真实地理位置暴露。',
      tools: [
        {
          name: 'DNSLeakTest.com 经典测试',
          version: '全球行业基准',
          date: '多节点探测',
          os: '全平台浏览器',
          size: '标准 / 扩展测试',
          desc: '全球公认的 DNS 泄漏测试标杆。若测试结果中出现中国电信、联通或移动的 DNS，说明已发生严重隐私泄漏。',
          download: 'https://www.dnsleaktest.com/',
          official: 'https://www.dnsleaktest.com/',
          actionText: '立即检测',
          officialText: '官方页面',
          isHot: true
        },
        {
          name: 'BrowserLeaks 浏览器综合隐私',
          version: '全栈指纹测试',
          date: '隐私安全矩阵',
          os: '现代浏览器',
          size: '含 WebRTC 探测',
          desc: '全方位检测浏览器环境隐私漏洞，特别是排查代理模式下 WebRTC 接口是否无意中泄漏了用户的真实公网 IP。',
          download: 'https://browserleaks.com/ip',
          official: 'https://browserleaks.com/webrtc',
          actionText: '立即检测',
          officialText: 'WebRTC 检测',
          isHot: true
        },
        {
          name: 'IPLeak.net 多维隐私探测',
          version: '综合隐私平台',
          date: 'AirVPN 赞助',
          os: '全平台浏览器',
          size: '并发探针测试',
          desc: '并发发送数十个随机 DNS 探针，快速捕捉偶发性 DNS 绕过现象，同时检测 IPv6 回落与地理位置泄漏。',
          download: 'https://ipleak.net/',
          official: 'https://ipleak.net/',
          actionText: '立即检测',
          officialText: '种子检测',
          isHot: false
        },
        {
          name: 'Cloudflare 1.1.1.1 诊断中心',
          version: '安全协议检测',
          date: '实时连通诊断',
          os: '全平台支持',
          size: 'DoH / DoT 诊断',
          desc: '检验客户端与本地网络是否成功开启了基于 HTTPS (DoH) 或 TLS (DoT) 的加密 DNS 解析，确保免遭中间人劫持。',
          download: 'https://one.one.one.one/help/',
          official: 'https://cloudflare-dns.com/',
          actionText: '立即检测',
          officialText: 'DNS 说明',
          isHot: false
        }
      ]
    }
  ];

  const displayedGroups = activePlatform === 'all' 
    ? groups 
    : groups.filter(g => g.id === activePlatform);

  return (
    <main className="page-main tools-download-page">
      <section className="tools-download-intro">
        <div className="eyebrow">科学上网 · 网络工具箱</div>
        <h1>翻墙工具下载与网络验证：客户端、流媒体、IP 与 DNS 泄漏检测</h1>
        <p>按系统筛选常用代理客户端与在线验证矩阵，从 Windows、macOS、iOS、Android 下载，到流媒体解锁、IP 归属、欺诈度及 DNS 泄漏全面排查。</p>
      </section>

      {/* Filter Tabs */}
      <div className="filter-chip-row" style={{ marginBottom: '24px' }}>
        <button
          type="button"
          className={`filter-chip ${activePlatform === 'all' ? 'active' : ''}`}
          onClick={() => setActivePlatform('all')}
        >
          全部工具
        </button>
        {groups.map(g => (
          <button
            key={g.id}
            type="button"
            className={`filter-chip ${activePlatform === g.id ? 'active' : ''}`}
            onClick={() => setActivePlatform(g.id)}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div id="tools-download-list" className="tools-download-groups">
        {displayedGroups.map(group => (
          <section key={group.id} className="tools-download-group">
            <div className="tools-group-head">
              <div>
                <div className="eyebrow">{group.name}</div>
                <div className="tools-group-title-row">
                  <h2>{group.title}</h2>
                </div>
              </div>
              <p>{group.desc}</p>
            </div>

            <div className="tools-download-card-grid">
              {group.tools.map((tool, idx) => (
                <article key={idx} className={`tool-card ${tool.isHot ? 'is-hot' : ''}`}>
                  {tool.isHot && <span className="tool-hot-badge">热门</span>}
                  <div className="tool-card-head">
                    <div>
                      <h3>{tool.name}</h3>
                      <p className="muted tool-trust-meta">
                        {tool.version.includes('在线') || tool.version.includes('权威') || tool.version.includes('库') || tool.version.includes('模型') || tool.version.includes('端点') || tool.version.includes('入口') || tool.version.includes('基准') || tool.version.includes('测试')
                          ? `类型：${tool.version} · 状态：${tool.date}`
                          : `版本：${tool.version} · 发布：${tool.date}`}
                      </p>
                    </div>
                  </div>
                  <p>{tool.desc}</p>
                  <p className="muted tool-version-line">
                    {tool.os.startsWith('支持：') || tool.os.startsWith('包含数据：') || tool.os.startsWith('核心指标：') || tool.os.startsWith('核心功能：')
                      ? `${tool.os} · ${tool.size}`
                      : `适用环境：${tool.os} · ${tool.size}`}
                  </p>
                  <div className="tool-action-row">
                    <a 
                      className="tool-download-primary" 
                      href={tool.download} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {tool.actionText || '立即前往'}
                    </a>
                    <a 
                      className="tool-official-link" 
                      href={tool.official} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {tool.officialText || '备用入口'}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
