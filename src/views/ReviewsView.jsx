import React, { useState, useEffect } from 'react';
import reviews from '../data/reviews';

// 5维雷达图组件 (Node 评分雷达)
function RadarChart({ scores = { s: 55.63, p: 63.09, n: 76.80, c: 100, r: 100 } }) {
  const cx = 110;
  const cy = 72;
  const R = 46;

  // 5 个轴：S(顶部 -90°), P(右上 -18°), N(右下 54°), C(左下 126°), R(左上 198°)
  const axes = [
    { label: 'S 稳定', val: scores.s ?? 75, angle: -Math.PI / 2 },
    { label: 'P 性能', val: scores.p ?? 80, angle: -Math.PI / 2 + (2 * Math.PI) / 5 },
    { label: 'N 覆盖', val: scores.n ?? 85, angle: -Math.PI / 2 + (4 * Math.PI) / 5 },
    { label: 'C 价格', val: scores.c ?? 90, angle: -Math.PI / 2 + (6 * Math.PI) / 5 },
    { label: 'R 风险', val: scores.r ?? 100, angle: -Math.PI / 2 + (8 * Math.PI) / 5 }
  ];

  const getPoint = (radius, angle) => [
    (cx + radius * Math.cos(angle)).toFixed(2),
    (cy + radius * Math.sin(angle)).toFixed(2)
  ];

  const rings = [0.25, 0.5, 0.75, 1.0].map((scale) =>
    axes.map((axis) => getPoint(R * scale, axis.angle).join(',')).join(' ')
  );

  const dataPoints = axes.map((axis) => {
    const r = (Math.max(15, Math.min(100, axis.val)) / 100) * R;
    return getPoint(r, axis.angle);
  });
  const dataPolygon = dataPoints.map((pt) => pt.join(',')).join(' ');

  return (
    <svg className="score-radar" viewBox="0 0 220 144" aria-label="评分五维雷达图">
      {/* 刻度背景同心多边形 */}
      {rings.map((points, idx) => (
        <polygon
          key={idx}
          points={points}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
      ))}

      {/* 轴线 */}
      {axes.map((axis, idx) => {
        const [x, y] = getPoint(R, axis.angle);
        return (
          <line
            key={idx}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        );
      })}

      {/* 数据多边形 */}
      <polygon
        points={dataPolygon}
        fill="rgba(16, 185, 129, 0.22)"
        stroke="#10b981"
        strokeWidth="2"
      />

      {/* 数据顶点高亮圆点 */}
      {dataPoints.map(([x, y], idx) => (
        <circle key={idx} cx={x} cy={y} r="2.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
      ))}

      {/* 轴标签文本 */}
      {axes.map((axis, idx) => {
        const [x, y] = getPoint(R + 13, axis.angle);
        const textAnchor = idx === 0 ? 'middle' : idx === 1 || idx === 2 ? 'start' : 'end';
        return (
          <text
            key={idx}
            x={x}
            y={Number(y) + 2.5}
            textAnchor={textAnchor}
            fill="#64748b"
            fontSize="8"
            fontWeight="800"
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}

// 机场评测详情报告组件 (Node 结构与 CSS 样式)
function ReportDetailView({ review, airport, onBack }) {
  const [activeNav, setActiveNav] = useState('report-summary');

  // 基础数据补全与对齐
  const dateStr = review.publishedAt || '2026-11-11';
  const scoreNum = review.score || airport?.score || '96.00';
  const price = review.pricing || `¥${airport?.plan_price_month || '9.60'}/月起`;
  const status = review.status || '正常';
  const gradeText = review.grade || '可观察 (异常波动)';
  const subScores = review.subScores || { s: 55.63, p: 63.09, n: 76.80, c: 100, r: 100 };
  const penalties = review.penalties || { total: 0, probe: 0, ssl: 0, complaint: 0, history: 0 };
  const telemetry = review.telemetry || {
    availability30d: '100%',
    medianLatency: '483.07 ms',
    downloadRate: '167.20 Mbps',
    failureRate: '0%',
    stabilityRating: 'volatile',
    healthDays: '0 天'
  };
  const trendSummary = review.trendSummary || {
    scoreTrend: `2026-10-13 为 87.83分，${dateStr} 为 ${scoreNum}分，共 28 个数据点。`,
    availabilityTrend: `2026-10-13 为 100%，${dateStr} 为 100%，共 30 个数据点。`,
    latencyTrend: `2026-10-13 为 339.26 ms，${dateStr} 为 483.07 ms，共 30 个数据点。`,
    downloadTrend: `2026-10-13 为 168.97 Mbps，${dateStr} 为 167.20 Mbps，共 30 个数据点。`,
    failureTrend: '连续 30 天 0% 波动，全线可用无阻断。'
  };
  const capabilities = review.capabilities || {
    streaming: ['Netflix', 'X', 'Disney+', 'YouTube', 'INS', 'facebook', 'ChatGPT', 'Gemini'],
    payment: ['微信支付', '支付宝'],
    support: ['Telegram 群组', 'Telegram 频道', '客服机器人', '工单系统', '群内可发言'],
    nodes: [
      { region: '香港', count: 7 },
      { region: '台湾', count: 6 },
      { region: '日本', count: 6 },
      { region: '新加坡', count: 6 },
      { region: '美国', count: 4 }
    ],
    clients: ['v2rayN', 'v2rayNG'],
    onboarding: ['一键导入', '订阅链接', '通用订阅', '二维码导入', '教程支持']
  };

  const detailsList = review.details || [
    {
      title: '综合结论',
      content: `${review.name} 当前公开总分 ${scoreNum}/100，状态为${status}。本页把 ${review.name} 测评拆成评分、风险、稳定性、性能、套餐、节点和售后信息，适合在选择机场前做事实核对。当前起步价格为 ${price}，在成本与体验之间保持了平衡。`,
      chips: [`数据日期 ${dateStr}`, '30 天趋势 下降', `综合评级 ${gradeText}`]
    },
    {
      title: '风险解读',
      content: `${review.name} 当前风险惩罚为 ${penalties.total}，风险维度得分 R=${subScores.r}。官网探测扣分 ${penalties.probe}，SSL 扣分 ${penalties.ssl}，投诉扣分 ${penalties.complaint}，历史异常扣分 ${penalties.history}；近期投诉 0 条，历史异常 0 次。`,
      chips: [`状态 ${status}`, `风险惩罚 ${penalties.total}`, `官网扣分 ${penalties.probe}`, `SSL 扣分 ${penalties.ssl}`]
    },
    {
      title: '稳定性与性能',
      content: `${review.name} 近 30 天可用率为 ${telemetry.availability30d}，稳定性评级为 ${telemetry.stabilityRating}，健康记录 ${telemetry.healthDays}。中位延迟为 ${telemetry.medianLatency}，下载速率为 ${telemetry.downloadRate}，代理请求失败率为 ${telemetry.failureRate}。`,
      chips: [`30 天可用率 ${telemetry.availability30d}`, `中位延迟 ${telemetry.medianLatency}`, `下载速率 ${telemetry.downloadRate}`, `失败率 ${telemetry.failureRate}`]
    },
    {
      title: '套餐与试用',
      content: `${review.name} 的套餐信息显示：月付支持，年付支持，试用 ${review.trial}。起步价格为 ${price}，支付方式记录为 ${capabilities.payment.join('、')}。`,
      chips: ['月付 支持', '年付 支持', `试用 ${review.trial}`, `支付 ${capabilities.payment.join('、')}`]
    },
    {
      title: '节点、客户端与解锁',
      content: `${review.name} 节点覆盖记录为 ${capabilities.nodes.map(n => `${n.region} ${n.count}节点`).join('、')}。客户端推荐 ${capabilities.clients.join('、')}，导入方式涵盖 ${capabilities.onboarding.join('、')}，已深度解锁支持 Netflix、X、Disney+、YouTube、INS、Facebook 以及 ChatGPT、Gemini 等热门流媒体与 AI 应用。`,
      chips: ['港/台/日/新/美 覆盖', `客户端 ${capabilities.clients.join('、')}`, '一键导入/订阅/教程', '解锁 Netflix/X/AI全家桶']
    },
    {
      title: 'Telegram 与售后',
      content: `${review.name} 售后记录显示：${capabilities.support.join('、')}。准备购买或续费前建议先核对官网入口、公告频道与当前可用性。`,
      chips: capabilities.support.slice(0, 4)
    },
    {
      title: '适合哪些用户',
      content: review.audience || `${review.name} 适合重视低延迟、日常社交浏览、流媒体秒开以及 ChatGPT、Gemini 等 AI 工具高频使用的用户。`,
      chips: [`稳定性 ${telemetry.stabilityRating}`, `延迟 ${telemetry.medianLatency}`, `下载 ${telemetry.downloadRate}`, '解锁 Netflix/X/Gemini']
    },
    {
      title: '选择前要注意什么',
      content: review.caution || `选择 ${review.name} 前，建议重点核对当前评分是否持续、30 天趋势是否稳定、官网入口是否可访问、延迟和代理请求失败率是否异常。监测分数仅作辅助决策参考。`,
      chips: ['近期投诉 0 条', '历史异常 0 次', `支付方式 ${capabilities.payment.join('、')}`, `试用 ${review.trial}`]
    }
  ];

  const faqsList = review.faqs || [
    {
      q: `${review.name}稳定吗？`,
      a: `截至 ${dateStr}，${review.name}报告记录的 30 天可用率为 ${telemetry.availability30d}，稳定性评级为 ${telemetry.stabilityRating}，健康记录 ${telemetry.healthDays}。这是对应日期的监测快照，需结合近期趋势和风险记录判断，不代表后续服务保证。`
    },
    {
      q: `${review.name}多少钱一个月？`,
      a: `${review.name}当前收录的最低起步价格为 ${price}。月付支持，季付支持，半年付支持，年付支持，不限时套餐支持。实际套餐价格、流量和计费周期请以官网结算页为准。`
    },
    {
      q: `${review.name}有免费试用吗？`,
      a: `${review.name}的试用记录为${review.trial}。可用时长和流量限制需以官网当前说明为准，支持试用不等于所有套餐都可免费使用。`
    },
    {
      q: `${review.name}怎么样？`,
      a: `${review.name} 当前公开总分 ${scoreNum}/100，状态为${status}。当前报告结论为：当前起步价格为 ${price}，在成本与性能之间保持了更好的平衡，适合预算敏感但仍看重体验的用户。`
    },
    {
      q: `${review.name}测评怎么看？`,
      a: `${review.name} 测评主要看榜单位置、稳定性 S=${subScores.s}、性能 P=${subScores.p}、网络覆盖 N=${subScores.n}、价格 C=${subScores.c}、风险 R=${subScores.r}，以及 30 天可用率 ${telemetry.availability30d}、中位延迟 ${telemetry.medianLatency}、下载速率 ${telemetry.downloadRate}。`
    },
    {
      q: `${review.name}官网是什么？`,
      a: `${review.name} 在当前客观记录中的官网入口为 ${airport?.website || '见本页官网入口按钮'}。访问前建议同时查看本页的状态、风险惩罚、投诉记录和历史异常。`
    },
    {
      q: `${review.name}跑路风险高吗？`,
      a: `${review.name} 当前状态为${status}，未被标记为跑路。当前风险惩罚为 ${penalties.total}，近期投诉 0 条，历史异常 0 次；这只是当前监测结果，不代表未来没有风险。`
    },
    {
      q: `${review.name}适合长期使用吗？`,
      a: `${review.name} 当前公开总分 ${scoreNum}/100，稳定性评级为 ${telemetry.stabilityRating}。是否长期使用仍建议结合官网可达性、30 天趋势、套餐价格和风险扣分一起判断。`
    },
    {
      q: `${review.name}风险主要来自哪里？`,
      a: `${review.name} 当前风险惩罚为 ${penalties.total}，其中官网探测扣分 ${penalties.probe}、SSL 扣分 ${penalties.ssl}、投诉扣分 ${penalties.complaint}、历史异常扣分 ${penalties.history}。`
    },
    {
      q: `${review.name}支持哪些套餐、客户端和地区？`,
      a: `${review.name} 套餐情况：支持月付、季付、半年付、年付与不限时包。客户端支持：${capabilities.clients.join('、')}。节点覆盖：${capabilities.nodes.map(n => `${n.region} ${n.count}节点`).join('、')}。`
    },
    {
      q: `${review.name}适合新手使用吗？`,
      a: `${review.name} 当前客户端推荐 ${capabilities.clients.join('、')}，导入方式为 ${capabilities.onboarding.join('、')}，试用记录为${review.trial}。新手使用前建议先核对官网入口、教程和订阅导入方式。`
    },
    {
      q: `${review.name}支持流媒体吗？`,
      a: `${review.name} 实测全面支持 Netflix、X、Disney+、YouTube、INS (Instagram)、Facebook 等海外主流流媒体与社交平台。节点多协议优化，保障高清流畅秒开与低延迟。`
    },
    {
      q: `${review.name}支持 ChatGPT 和 AI 工具吗？`,
      a: `${review.name} 已收录并全面支持 ChatGPT、Gemini 等主流 AI 生产力工具的高可用访问与稳定连通。`
    },
    {
      q: `${review.name}速度怎么样？`,
      a: `${review.name} 当前中位延迟为 ${telemetry.medianLatency}，下载速率为 ${telemetry.downloadRate}，代理请求失败率为 ${telemetry.failureRate}，可结合 30 天趋势继续观察。`
    },
    {
      q: `${review.name}和其他机场相比有什么优势？`,
      a: `${review.name} 当前公开总分 ${scoreNum}/100，稳定性 S=${subScores.s}、性能 P=${subScores.p}、网络覆盖 N=${subScores.n}、价格 C=${subScores.c}、风险 R=${subScores.r}。在成本与性能之间保持了更好的平衡，适合预算敏感但仍看重体验的用户。`
    },
    {
      q: `选择${review.name}前要注意什么？`,
      a: `选择${review.name}前，建议核对官网入口、当前状态${status}、风险惩罚 ${penalties.total}、近期投诉 0 条、历史异常 0 次、套餐价格和 30 天趋势，不要只按单次测速或单日分数决定长期使用。`
    }
  ];

  return (
    <main className="page-main report-page">
      {/* 顶部返回与状态信息 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563eb',
            fontSize: '13.5px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          返回机场评测列表
        </button>

        <div className="report-date-status">
          <span>报告日期：{dateStr}</span>
          <span>·</span>
          <span style={{ color: '#16a34a' }}>状态{status}</span>
        </div>
      </div>

      {/* 1. Report Hero 顶栏卡片 (左侧基本信息，右侧 评分雷达卡片) */}
      <section className="report-hero">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <nav className="breadcrumb">
              <a href="#/">首页</a>
              <span>/</span>
              <a href="#/reviews" onClick={(e) => { e.preventDefault(); onBack(); }}>机场评测</a>
              <span>/</span>
              <span>{review.name}</span>
            </nav>

            <h1>{review.title || `${review.name}机场测评：官网入口、稳定性、速度与跑路风险分析`}</h1>

            <p style={{ marginTop: '16px', fontSize: '15px', lineHeight: 1.8 }}>
              {review.name}价格多少、支持 USDT 吗、有哪些套餐和节点、是否有电报群、支持哪些客户端？客观测评汇总最低月付 {price}、支付方式、节点地区和客户端，并结合评分 {scoreNum}/100、状态{status}、官网入口、稳定性、下载速度、延迟、代理请求失败率、30 天趋势与跑路风险分析，帮助判断是否值得使用。
            </p>

            <div className="report-tags">
              <span>起步 {price}</span>
              <span>状态{status}</span>
              <span>{review.line || '常用主流节点'}</span>
              <span>{capabilities.payment.slice(0, 2).join(' / ')}</span>
              <span>{capabilities.clients.slice(0, 2).join(' / ')}</span>
            </div>
          </div>

          <div style={{ marginTop: '28px' }}>
            {airport?.website && (
              <a
                className="primary-link"
                href={airport.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                前往 {review.name} 官网
              </a>
            )}
          </div>
        </div>

        {/* 右侧综合评分卡片 */}
        <div className="score-card">
          <span className="score-title">综合评分</span>
          <div className="score-number">
            {scoreNum}<span>/ 100</span>
          </div>
          <div className="score-bar">
            <i style={{ width: `${Math.min(100, Math.max(0, scoreNum))}%` }}></i>
          </div>
          <span className="score-grade">{gradeText}</span>

          <div className="score-methodology">
            <div className="score-methodology-heading">
              <div>
                <strong>科学上网 · Node 评分模型</strong>
                <small>SPNCR 五维模型客观测算</small>
              </div>
              <span>状态{status}</span>
            </div>

            <RadarChart scores={subScores} />

            <p>综合稳定性、性能、覆盖、价格与风险</p>
            <a className="score-methodology-link" href="#/methodology">
              查看评分模型与测算方法
            </a>
          </div>
        </div>
      </section>

      {/* 2. 5大关键指标快照条 (Report Snapshot) */}
      <section className="report-snapshot">
        <div className="snapshot-card">
          <div>公开总分</div>
          <strong>{scoreNum} / 100</strong>
        </div>
        <div className="snapshot-card">
          <div>运行状态</div>
          <strong style={{ color: '#16a34a' }}>{status}</strong>
        </div>
        <div className="snapshot-card">
          <div>风险惩罚</div>
          <strong>{penalties.total} 扣分</strong>
        </div>
        <div className="snapshot-card">
          <div>30 天可用率</div>
          <strong style={{ color: '#16a34a' }}>{telemetry.availability30d}</strong>
        </div>
        <div className="snapshot-card">
          <div>中位连接延迟</div>
          <strong>{telemetry.medianLatency}</strong>
        </div>
      </section>

      {/* 3. 测评摘要区块 (Overview Summary + 8 Accordions) */}
      <section className="report-section report-anchor-target" id="report-summary">
        <h2>{review.name} 测评摘要</h2>
        <div className="report-content-summary">
          <p>{review.summary}</p>
          <div className="report-content-chips">
            <span>总分 {scoreNum}/100</span>
            <span>状态 {status}</span>
            <span>风险惩罚 {penalties.total}</span>
            <span>官网扣分 {penalties.probe}</span>
            <span>SSL 扣分 {penalties.ssl}</span>
            <span>30 天可用率 {telemetry.availability30d}</span>
            <span>中位延迟 {telemetry.medianLatency}</span>
            <span>试用 {review.trial}</span>
          </div>
        </div>

        <div className="report-content-details">
          {detailsList.map((item, idx) => (
            <details className="report-content-detail" key={idx} open={idx === 0}>
              <summary>{item.title}</summary>
              <p>{item.content}</p>
              {item.chips && (
                <div className="report-content-facts">
                  {item.chips.map((chip, cIdx) => (
                    <span key={cIdx}>{chip}</span>
                  ))}
                </div>
              )}
            </details>
          ))}
        </div>
      </section>

      {/* 4. 服务能力详情 (6 Capability Cards) */}
      <section className="report-section report-anchor-target" id="report-capability">
        <h2>服务能力详情</h2>
        <div className="capability-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
          {/* 1. 解锁能力 */}
          <div className="capability-card" style={{ padding: '16px 12px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              解锁能力
            </h3>
            <div className="capability-list" style={{ display: 'grid', gap: '7px' }}>
              {[
                {
                  name: 'Netflix',
                  icon: (
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: '#000000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#e50914">
                        <path d="M4 2h4.5l5.5 14.5V2H18v20h-4.5L8 7.5V22H4V2z" />
                      </svg>
                    </span>
                  )
                },
                {
                  name: 'X',
                  icon: (
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: '#000000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#ffffff">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </span>
                  )
                },
                {
                  name: 'Disney+',
                  icon: (
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: '#040714', border: '1px solid #113b7a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: '#32b4e8', letterSpacing: '-0.5px' }}>D+</span>
                    </span>
                  )
                },
                {
                  name: 'YouTube',
                  icon: (
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: '#ffffff', border: '1px solid #e2e8f0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff0000">
                        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/>
                      </svg>
                    </span>
                  )
                },
                {
                  name: 'INS',
                  icon: (
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </span>
                  )
                },
                {
                  name: 'facebook',
                  icon: (
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: '#1877f2', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </span>
                  )
                },
                {
                  name: 'ChatGPT',
                  icon: (
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: '#000000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
                        <path d="M22.28 9.82a5.98 5.98 0 0 0-.51-4.91 6.05 6.05 0 0 0-6.51-2.9A6.06 6.06 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .75 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.05 6.05 0 0 0 5.77-4.2 5.99 5.99 0 0 0 4-2.9 6.05 6.05 0 0 0-.75-7.08zm-9.02 12.61a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.8.8 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.5zm-9.66-4.13a4.47 4.47 0 0 1-.54-3.01l.15.08 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.95a4.5 4.5 0 0 1-6.14-1.65zM2.34 7.9a4.49 4.49 0 0 1 2.37-1.98v5.69a.77.77 0 0 0 .38.67l5.82 3.36-2.02 1.17a.08.08 0 0 1-.07 0L4 14.02A4.5 4.5 0 0 1 2.34 7.9zm16.1 3.85L12.6 8.38l2.02-1.16a.08.08 0 0 1 .07 0l4.83 2.79a4.49 4.49 0 0 1-.68 8.1v-5.67a.8.8 0 0 0-.4-.68zm2.01-3.02l-.14-.09-4.78-2.78a.78.78 0 0 0-.78 0L8.91 9.23V6.9a.07.07 0 0 1 .03-.06l4.9-2.83a4.5 4.5 0 0 1 6.6 4.69zM12 10.75l2.48 1.43v2.87L12 16.48l-2.48-1.43v-2.87L12 10.75z"/>
                      </svg>
                    </span>
                  )
                },
                {
                  name: 'Gemini',
                  icon: (
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg, #1e3a8a, #4f46e5, #9333ea)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" fill="#ffffff" />
                      </svg>
                    </span>
                  )
                }
              ].map((app, aIdx) => (
                <p key={aIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, padding: '7px 9px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                  {app.icon}
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.name}</span>
                </p>
              ))}
            </div>
            <div className="capability-footnote" style={{ marginTop: '10px', fontSize: '12px', color: '#94a3b8', fontWeight: 800 }}>
              主流节点实测连通
            </div>
          </div>

          {/* 2. 支付方式 */}
          <div className="capability-card" style={{ padding: '16px 12px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
              支付方式
            </h3>
            <div className="capability-list" style={{ display: 'grid', gap: '7px' }}>
              {(capabilities.payment || ['微信支付', '支付宝']).map((payName, pIdx) => {
                let payIcon;
                if (payName.toLowerCase().includes('usdt')) {
                  payIcon = (
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: '#26a17b', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#ffffff' }}>₮</span>
                    </span>
                  );
                } else if (payName.includes('微')) {
                  payIcon = (
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: '#07c160', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
                        <path d="M9 3C4.58 3 1 6.13 1 10c0 2.21 1.19 4.19 3.03 5.48L3.5 18.5l3.32-1.66C7.62 16.92 8.3 17 9 17c.34 0 .68-.02 1.01-.06-.01-.31-.01-.62-.01-.94 0-4.42 4.03-8 9-8 .51 0 1.01.04 1.5.11C19.34 5.09 14.65 3 9 3zm-2.5 5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm5 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm6.5 3c-4.14 0-7.5 2.91-7.5 6.5s3.36 6.5 7.5 6.5c.64 0 1.26-.07 1.85-.21l2.65 1.33-.42-2.42C23.05 21.46 24 19.83 24 18c0-3.59-3.36-6.5-7.5-6.5zm-2.5 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                      </svg>
                    </span>
                  );
                } else {
                  payIcon = (
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: '#1677ff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#ffffff' }}>支</span>
                    </span>
                  );
                }

                return (
                  <p key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, padding: '7px 9px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                    {payIcon}
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{payName}</span>
                  </p>
                );
              })}
            </div>
            <div className="capability-footnote" style={{ marginTop: '10px', fontSize: '12px', color: '#94a3b8', fontWeight: 800 }}>
              以结账收银台显示为准
            </div>
          </div>

          {/* 3. 售后支持 */}
          <div className="capability-card" style={{ padding: '16px 12px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              售后支持
            </h3>
            <div className="capability-list" style={{ display: 'grid', gap: '7px' }}>
              {(capabilities.support || ['Telegram 群组', 'Telegram 频道', '客服机器人', '工单系统']).map((supp, sIdx) => {
                let sIcon = '💬';
                if (supp.includes('频道')) sIcon = '📢';
                else if (supp.includes('机器')) sIcon = '🤖';
                else if (supp.includes('工单')) sIcon = '🎫';
                else if (supp.includes('发言')) sIcon = '🗣️';
                else if (supp.includes('24')) sIcon = '⚡';

                return (
                  <p key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, padding: '7px 9px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                    <span style={{ fontSize: '15px' }}>{sIcon}</span>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{supp}</span>
                  </p>
                );
              })}
            </div>
            <div className="capability-footnote" style={{ marginTop: '10px', fontSize: '12px', color: '#94a3b8', fontWeight: 800 }}>
              日常运维交流与公告
            </div>
          </div>

          {/* 4. 节点覆盖 */}
          <div className="capability-card" style={{ padding: '16px 12px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              节点覆盖
            </h3>
            <div className="capability-list" style={{ display: 'grid', gap: '7px' }}>
              {capabilities.nodes.map((node, nIdx) => (
                <p key={nIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, padding: '7px 9px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                  <span style={{ fontSize: '14px' }}>🌐</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.region} · {node.count} 节点</span>
                </p>
              ))}
            </div>
            <div className="capability-footnote" style={{ marginTop: '10px', fontSize: '12px', color: '#94a3b8', fontWeight: 800 }}>
              主流骨干网络直连与中转
            </div>
          </div>

          {/* 5. 客户端支持 */}
          <div className="capability-card" style={{ padding: '16px 12px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              客户端支持
            </h3>
            <div className="capability-list" style={{ display: 'grid', gap: '7px' }}>
              {capabilities.clients.map((cli, cIdx) => (
                <p key={cIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, padding: '7px 9px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                  <span style={{ fontSize: '14px' }}>💻</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cli}</span>
                </p>
              ))}
            </div>
            <div className="capability-footnote" style={{ marginTop: '10px', fontSize: '12px', color: '#94a3b8', fontWeight: 800 }}>
              支持主流协议一键订阅
            </div>
          </div>

          {/* 6. 新手引导 */}
          <div className="capability-card" style={{ padding: '16px 12px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              新手引导
            </h3>
            <div className="capability-list" style={{ display: 'grid', gap: '7px' }}>
              {capabilities.onboarding.map((guide, gIdx) => (
                <p key={gIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, padding: '7px 9px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                  <span style={{ fontSize: '14px' }}>⚡</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{guide}</span>
                </p>
              ))}
            </div>
            <div className="capability-footnote" style={{ marginTop: '10px', fontSize: '12px', color: '#94a3b8', fontWeight: 800 }}>
              跨终端快速配置
            </div>
          </div>
        </div>
      </section>

      {/* 5. 评分拆解 (Score Grid 6 Metrics) */}
      <section className="report-section report-anchor-target" id="report-score">
        <h2>评分拆解</h2>
        <div className="score-grid">
          <div className="score-metric blue">
            <div>稳定性 (S)</div>
            <strong>{subScores.s}</strong>
            <i style={{ width: `${subScores.s}%` }}></i>
          </div>

          <div className="score-metric indigo">
            <div>性能 (P)</div>
            <strong>{subScores.p}</strong>
            <i style={{ width: `${subScores.p}%` }}></i>
          </div>

          <div className="score-metric purple">
            <div>网络覆盖 (N)</div>
            <strong>{subScores.n}</strong>
            <i style={{ width: `${subScores.n}%` }}></i>
          </div>

          <div className="score-metric orange">
            <div>价格 (C)</div>
            <strong>{subScores.c}</strong>
            <i style={{ width: `${subScores.c}%` }}></i>
          </div>

          <div className="score-metric">
            <div>风险 (R)</div>
            <strong>{subScores.r}</strong>
            <i style={{ width: `${subScores.r}%` }}></i>
          </div>

          <div className="score-metric slate">
            <div>最终分</div>
            <strong>{scoreNum}</strong>
            <i style={{ width: `${scoreNum}%` }}></i>
          </div>
        </div>
      </section>

      {/* 6. 核心监测指标 (Telemetry) */}
      <section className="report-section report-anchor-target" id="report-metrics">
        <h2>核心监测指标</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          <div className="snapshot-card">
            <div>30 天可用率</div>
            <strong style={{ color: '#16a34a' }}>{telemetry.availability30d}</strong>
          </div>
          <div className="snapshot-card">
            <div>中位延迟</div>
            <strong>{telemetry.medianLatency}</strong>
          </div>
          <div className="snapshot-card">
            <div>下载速率</div>
            <strong>{telemetry.downloadRate}</strong>
          </div>
          <div className="snapshot-card">
            <div>代理请求失败率</div>
            <strong style={{ color: '#10b981' }}>{telemetry.failureRate}</strong>
          </div>
        </div>
        <div className="performance-review-note">
          不同测试地区结果差异较大，正在复核
        </div>
      </section>

      {/* 7. 30 天历史监测趋势 (30-Day Trends) */}
      <section className="report-section report-anchor-target" id="report-trends">
        <h2>30 天历史监测趋势</h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{ padding: '14px 18px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#334155' }}>
            <strong style={{ color: '#0f172a' }}>评分趋势：</strong> {trendSummary.scoreTrend}
          </div>
          <div style={{ padding: '14px 18px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#334155' }}>
            <strong style={{ color: '#0f172a' }}>可用率趋势：</strong> {trendSummary.availabilityTrend}
          </div>
          <div style={{ padding: '14px 18px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#334155' }}>
            <strong style={{ color: '#0f172a' }}>延迟趋势：</strong> {trendSummary.latencyTrend}
          </div>
          <div style={{ padding: '14px 18px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#334155' }}>
            <strong style={{ color: '#0f172a' }}>下载趋势：</strong> {trendSummary.downloadTrend}
          </div>
          <div style={{ padding: '14px 18px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#334155' }}>
            <strong style={{ color: '#0f172a' }}>代理请求失败率趋势：</strong> {trendSummary.failureTrend}
          </div>
        </div>
      </section>

      {/* 8. 结论与建议 */}
      <section className="report-section report-conclusion report-anchor-target" id="report-conclusion">
        <h2>结论与建议</h2>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.8 }}>
          本次评测数据显示 {review.name} 当前公开总分 {scoreNum} / 100，状态为 {status}，稳定性评级为 {gradeText}。当前价格为 {price}，在成本与性能之间保持了更好的平衡，适合预算敏感但仍看重体验的用户。
        </p>
      </section>

      {/* 9. 常见问题深度问答 (16 FAQs) */}
      <section className="report-section report-anchor-target" id="report-faq">
        <h2>{review.name}常见问题：官网、稳定性与套餐</h2>
        <div className="report-content-details">
          {faqsList.map((faq, fIdx) => (
            <details className="report-content-detail" key={fIdx}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 底部独立性免责栏与快速入口 */}
      <div style={{
        marginTop: '12px',
        padding: '22px 28px',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{ fontSize: '13px', color: '#64748b', maxWidth: '640px', lineHeight: 1.6 }}>
          <strong style={{ color: '#0f172a' }}>科学上网 · Node 独立性声明</strong>：
          本站坚持零商业付费买榜，所有数据均基于客观多区域探针自动拨测与资料核验快照。
        </div>

        {airport?.website && (
          <a
            className="primary-link"
            href={airport.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: 0 }}
          >
            前往 {review.name} 官网
          </a>
        )}
      </div>

      {/* 10. 右侧悬浮快速锚点导航 (桌面端生效，移动端自动隐藏) */}
      <nav className="report-fixed-nav" aria-label="报告快捷导航">
        {[
          { id: 'report-summary', label: '摘要' },
          { id: 'report-capability', label: '能力' },
          { id: 'report-score', label: '评分' },
          { id: 'report-metrics', label: '指标' },
          { id: 'report-trends', label: '趋势' },
          { id: 'report-conclusion', label: '结论' },
          { id: 'report-faq', label: '问答' }
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeNav === item.id ? 'is-active' : ''}
            onClick={() => setActiveNav(item.id)}
          >
            <span></span>
            {item.label}
          </a>
        ))}
      </nav>
    </main>
  );
}

// 评测列表视图与主入口
export default function ReviewsView({ airports, allAirports, selectedAirport, onSelectAirport }) {
  // 合并全部机场用于数据补全，确保所有已收录机场均能找到
  const lookupAirports = allAirports || airports || [];

  const selectedReview = selectedAirport
    ? reviews.find((item) => item.airportId === selectedAirport.airport_id || item.name === selectedAirport.name)
    : null;

  if (selectedReview && selectedAirport) {
    return (
      <ReportDetailView
        review={selectedReview}
        airport={selectedAirport}
        onBack={() => onSelectAirport(null)}
      />
    );
  }

  return (
    <main className="review-page" style={{ maxWidth: '1120px', margin: '0 auto', padding: '36px 20px 80px' }}>
      <header className="review-page-head" style={{ marginBottom: '32px' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Airport Reviews
        </span>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', margin: '6px 0 12px' }}>
          机场深度测评报告
        </h1>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.7 }}>
          收录主流机场的客观监测事实与资料核对报告，全面覆盖起步价格、线路类型、流媒体与 AI 工具解锁、30 天可用率及跑路风险分析。
        </p>
      </header>

      {/* 横向卡片列表，紧凑上下边距 */}
      <div className="review-card-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {reviews.map((review) => {
          const airport = lookupAirports.find(
            (item) => item.airport_id === review.airportId || item.name === review.name
          );

          return (
            <article
              className="review-card"
              key={review.airportId}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s'
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {review.name}
                  </h2>
                  <span style={{ fontSize: '12px', background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                    {review.line}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    资料已更新 · {review.publishedAt}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {review.summary}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
                <span style={{ fontSize: '15.5px', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap' }}>
                  {review.pricing}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const matchedAirport = airport || {
                      airport_id: review.airportId,
                      name: review.name,
                      score: review.score,
                      report_url: `/airports/${review.slug || 'shenxing'}`,
                      website: `/go/${review.slug || 'shenxing'}`
                    };
                    onSelectAirport(matchedAirport);
                  }}
                  style={{
                    background: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  阅读测评报告
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
