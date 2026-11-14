# 科学上网  专注客户体验的专家



项目为**纯前端无服务器架构（Zero-Backend / Jamstack）**，所有数据均抽离至标准的 JSON 配置文件中，您可以极简地填充和更新机场资料、推广链接、优惠码与测速指标。

---

## 🌟 包含的核心页面与功能

1. **首页 (`Home`)**：
   - **公共顶部导航栏**：支持全部子菜单、工具下拉菜单、移动端自适应抽屉菜单、入驻快捷入口。
   - **Hero 数据看板**：带“今日更新·透明机制”胶囊、主副标题、实时监测三联数据牌（80+监测机场、10万+次实时测速、报告生成时间）。
   - **🏆 GateRank 优秀机场排行榜**：展示排名顺序徽章、机场名称、核心标签、节点数、起步价格、详情报告弹窗与直达官网入口。
   - **右侧边栏**：
     - *探索更多优质机场*：快捷筛选标签（长期稳定、性价比、新入榜、原生IP等）。
     - *商业合作专区*：高转化赞助卡片、独家优惠码一键复制与提示。
   - **网络工具箱**：Clash Verge Rev、sing-box、Shadowrocket 等主流客户端下载导航。
   - **行业快讯与动态**：代理技术更新与月度表现简报。
   - **四维交叉判断榜单**：长期稳定机场、性价比推荐、新入榜、风险预警。
   - **平台公信力**：5 大核心理念说明与深度内容外链。
   - **FAQ 折叠问答**：机场与 VPN 区别、选购避坑指南。
   - **全局页脚**：免责声明、友链、独立性原则。
2. **全部机场排行 (`/rankings/all`)**：
   - 包含实时搜索过滤、价格区间选择、流媒体/AI 解锁筛选、支付方式筛选与多模式排序。
3. **活动优惠专区 (`/deals`)**：
   - 专属折扣码一键复制与官网直达。
4. **跑路监测快照 (`/risk-monitor`)**：
   - 异常状态标记、风险排查原因说明与防坑四大原则。
5. **翻墙工具下载 (`/tools`)**：
   - 按 Windows / macOS / iOS / Android / Linux 多平台分类的官方下载直通车。
6. **测评方法与独立性声明 (`/methodology`)**：
   - 40% 可用率、30% 晚高峰吞吐、15% 解锁、15% 历史时长的测评权重分解。
7. **申请入驻测试 (`/apply`)**：
   - 完整申请步骤、费用说明、在线资料填写表单、一键格式化生成工单并支持对接 Telegram 审核。
8. **机场详情弹窗 (`AirportModal`)**：
   - 点击任何机场卡片按钮，即可弹出该机场的详细地区节点分布、流媒体/AI支持矩阵、客户端支持列表与套餐说明。

---

## 🛠️ 数据填充与修改指南（之后填充）

所有数据均保存在 `src/data/` 目录下，直接修改对应的 JSON 文件即可全站生效：

### 1. 填充/修改机场数据：`src/data/airports.json`
每一家机场的字段结构如下：
```json
{
  "airport_id": 1,
  "name": "你的机场名称",
  "website": "https://your-aff-link.com/#/?code=YOUR_CODE",  // 你的推广链接
  "tags": ["IEPL专线", "晚高峰稳定", "AI全解锁", "原生IP"],
  "node_count": 35,                                          // 节点数量
  "plan_price_month": 15,                                    // 起步月付价格
  "has_trial": false,                                        // 是否有试用
  "score": 93.29,                                            // 综合评分
  "score_delta_vs_yesterday": {
    "label": "对比昨天",
    "value": 0.32
  },
  "airport_intro": "机场核心特色简介...",
  "capabilities": {
    "payment_methods": [
      { "key": "alipay", "label": "支付宝" },
      { "key": "usdt_trc20", "label": "USDT-TRC20" }
    ],
    "streaming": [
      { "key": "chatgpt", "label": "ChatGPT" },
      { "key": "netflix", "label": "Netflix" }
    ],
    "clients": [
      { "key": "clash", "label": "Clash" },
      { "key": "sing_box", "label": "sing-box" }
    ],
    "regions": [
      { "key": "hong_kong", "label": "香港", "line_types": [{ "label": "中转" }] },
      { "key": "japan", "label": "日本", "line_types": [{ "label": "CN2" }] }
    ]
  }
}
```

### 2. 修改商业赞助与优惠码：`src/data/deals.json`
用于配置右侧边栏和优惠活动页的赞助商、折扣标题与专属优惠码。

### 3. 修改网站基础信息与指标：`src/data/siteConfig.json`
用于配置站名、Slogan、实时监测机场数量、测速总次数、Telegram 官方账号与邮箱。

### 4. 修改网络工具箱下载链接：`src/data/tools.json`
配置 Clash Verge Rev、sing-box、Shadowrocket 等客户端的官方版本与下载直链。

---

## 🚀 本地开发与构建部署

### 本地启动预览
```bash
npm run dev
```
打开浏览器访问：`http://localhost:3000`

### 打包生产静态页面
```bash
npm run build
```
执行后会在根目录生成 `dist/` 文件夹。

### 静态部署（0 服务器费用）
- **Cloudflare Pages**：直接连接 GitHub 仓库，构建命令填写 `npm run build`，输出目录填写 `dist`。
- **Vercel / Netlify**：直接导入项目一键部署。
- **纯 Nginx / 虚拟主机**：将 `dist` 目录下的所有文件上传至网站根目录即可。

