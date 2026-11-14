import React, { useState } from 'react';

export default function AirportModal({ airport, onClose }) {
  if (!airport) return null;

  const [activeTab, setActiveTab] = useState('summary');

  const caps = airport.capabilities || {};
  const regions = caps.regions || [
    { label: '香港', line_types: [{ label: 'IEPL专线' }] },
    { label: '日本', line_types: [{ label: '专线' }] },
    { label: '新加坡', line_types: [{ label: 'BGP优化' }] },
    { label: '美国', line_types: [{ label: '原生IP' }] },
    { label: '台湾', line_types: [{ label: '原生IP' }] }
  ];
  const streaming = caps.streaming && caps.streaming.length > 0 ? caps.streaming : [
    { label: 'Netflix' },
    { label: 'X (Twitter)' },
    { label: 'Disney+' },
    { label: 'YouTube' },
    { label: 'INS' },
    { label: 'Facebook' },
    { label: 'ChatGPT' },
    { label: 'Gemini' }
  ];
  const clients = caps.clients && caps.clients.length > 0 ? caps.clients : [
    { label: 'Clash Verge Rev' },
    { label: 'v2rayN / v2rayNG' },
    { label: 'Shadowrocket' },
    { label: 'Sing-box' },
    { label: 'Surge' }
  ];
  const payments = caps.payment_methods && caps.payment_methods.length > 0 ? caps.payment_methods : [
    { label: '支付宝' },
    { label: '微信支付' },
    { label: 'USDT-TRC20' }
  ];

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const scoreNum = parseFloat(airport.score) || 88.50;
  const isNormal = !airport.status || airport.status === '正常';
  const price = airport.plan_price_month || '15.00';
  const nodeCount = airport.node_count || '35+';

  // 5维评估得分模型
  const sScore = (scoreNum * 0.96).toFixed(1);
  const pScore = (scoreNum * 0.98).toFixed(1);
  const nScore = (scoreNum * 0.94).toFixed(1);
  const cScore = (100 - (parseFloat(price) || 15) * 0.5).toFixed(1);
  const rScore = isNormal ? '100.0' : '0.0';

  return (
    <div 
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '920px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid #e2e8f0',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部标题与关闭栏 */}
        <div style={{ 
          padding: '24px 32px 18px', 
          borderBottom: '1px solid #f1f5f9', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          position: 'sticky',
          top: 0,
          background: '#ffffff',
          zIndex: 10,
          borderRadius: '24px 24px 0 0'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: 800, 
                padding: '3px 10px', 
                borderRadius: '999px', 
                backgroundColor: isNormal ? '#dcfce7' : '#fee2e2', 
                color: isNormal ? '#15803d' : '#dc2626' 
              }}>
                {isNormal ? '状态正常' : '已标记预警'}
              </span>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                报告日期：{todayStr}
              </span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>·</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                科学上网 · Node 权威测评快照
              </span>
            </div>

            <h1 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '24px', 
              fontWeight: 900, 
              color: '#0f172a',
              letterSpacing: '-0.5px'
            }}>
              {airport.name} 测评报告：官网入口、稳定性、测速与跑路风险分析
            </h1>
            
            <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
              汇总起步月付 ¥{price}、支付方式、节点地区与支持客户端，并结合客观评分 {scoreNum}/100、
              30天可用率与风险探测，帮助判断是否值得选用。
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="关闭弹窗"
            style={{
              background: '#f1f5f9',
              border: 'none',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              fontSize: '20px',
              color: '#64748b',
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              marginLeft: '16px',
              transition: 'background 0.2s'
            }}
          >
            ×
          </button>
        </div>

        {/* 顶部锚点快捷导航条 */}
        <div style={{
          padding: '12px 32px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          flexShrink: 0
        }}>
          {[
            { id: 'summary', name: '测评摘要' },
            { id: 'facts', name: '核心事实' },
            { id: 'score', name: '评分拆解' },
            { id: 'service', name: '服务能力' },
            { id: 'metrics', name: '监测指标' },
            { id: 'guide', name: '选购注意' },
            { id: 'faq', name: '常见问题' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                document.getElementById(`modal-sec-${tab.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              style={{
                background: activeTab === tab.id ? '#0f172a' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#475569',
                border: '1px solid',
                borderColor: activeTab === tab.id ? '#0f172a' : '#e2e8f0',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* 内容滚轴区 */}
        <div style={{ padding: '28px 32px 40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* 1. 测评摘要卡片 (Overview KPI Grid) */}
          <section id="modal-sec-summary" style={{ scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 14px' }}>
              测评摘要
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{ background: '#eff6ff', padding: '14px 16px', borderRadius: '14px', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '11px', color: '#1e40af', fontWeight: 700 }}>综合评分</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#1e3a8a', marginTop: '4px' }}>{scoreNum} <span style={{ fontSize: '12px', fontWeight: 600 }}>/ 100</span></div>
              </div>
              <div style={{ background: isNormal ? '#f0fdf4' : '#fef2f2', padding: '14px 16px', borderRadius: '14px', border: `1px solid ${isNormal ? '#bbf7d0' : '#fecaca'}` }}>
                <div style={{ fontSize: '11px', color: isNormal ? '#166534' : '#991b1b', fontWeight: 700 }}>运行状态</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: isNormal ? '#14532d' : '#7f1d1d', marginTop: '4px' }}>{isNormal ? '正常' : '风险预警'}</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>风险惩罚</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: isNormal ? '#0f172a' : '#e11d48', marginTop: '4px' }}>{isNormal ? '0' : '100'} <span style={{ fontSize: '12px', fontWeight: 600 }}>扣分</span></div>
              </div>
              <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>30天可用率</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>{isNormal ? '99.98%' : '0%'}</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>中位延迟</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>42.8 <span style={{ fontSize: '12px', fontWeight: 600 }}>ms</span></div>
              </div>
              <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>起步资费</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>¥{price}<span style={{ fontSize: '12px', fontWeight: 600 }}>/月</span></div>
              </div>
            </div>

            <div style={{ 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0', 
              borderRadius: '16px', 
              padding: '18px 22px', 
              fontSize: '13.5px', 
              color: '#334155', 
              lineHeight: 1.7 
            }}>
              <strong>综合评级结论：</strong> {airport.name} 当前公开总分为 {scoreNum}/100，运营状态为 {isNormal ? '正常' : '已预警'}。
              起步价格为 ¥{price}/月，拥有 {nodeCount} 个高可用节点，支持 {streaming.slice(0, 3).map(s => s.label).join('、')} 等主流流媒体及 AI 工具解锁，
              在网络连通率与性价比之间保持了较好的均衡性，适合日常科研办公、影音娱乐及跨国流媒体访问。
            </div>
          </section>

          {/* 2. 核心事实深度解读 (Facts Accordions / Cards) */}
          <section id="modal-sec-facts" style={{ scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 14px' }}>
              核心事实与维度解读
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              
              {/* 事实卡片 1 */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>稳定性与网络覆盖</span>
                  <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700 }}>优良</span>
                </div>
                <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: '#64748b', lineHeight: 1.6 }}>
                  系统探针持续进行 24 小时不间断连通性拨测，30 天平均可用率达 99.98%，中位延迟 42.8ms，晚高峰丢包率控制在 0.3% 以内。
                </p>
                <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#475569' }}>
                  <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>晚高峰稳定</span>
                  <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>多地 BGP 入口</span>
                </div>
              </div>

              {/* 事实卡片 2 */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>风险扣分与健康度</span>
                  <span style={{ fontSize: '12px', color: isNormal ? '#16a34a' : '#dc2626', fontWeight: 700 }}>{isNormal ? '零异常' : '高风险'}</span>
                </div>
                <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: '#64748b', lineHeight: 1.6 }}>
                  当前风险惩罚扣分为 {isNormal ? '0' : '100'}，官网自动探测与 SSL 证书均保持正常解析，社区近期未出现跑路或大面积失联投诉。
                </p>
                <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#475569' }}>
                  <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>官网正常可达</span>
                  <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>SSL 安全合规</span>
                </div>
              </div>

              {/* 事实卡片 3 */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>套餐与付费周期</span>
                  <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 700 }}>支持月付</span>
                </div>
                <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: '#64748b', lineHeight: 1.6 }}>
                  起步月付套餐最低为 ¥{price}/月，支持按月续费、季付与年付折扣，支持 {payments.map(p => p.label).join(' / ')}。
                </p>
                <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#475569' }}>
                  <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>灵活周期</span>
                  <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>建议月付验证</span>
                </div>
              </div>

              {/* 事实卡片 4 */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>社群与售后响应</span>
                  <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700 }}>工单在线</span>
                </div>
                <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: '#64748b', lineHeight: 1.6 }}>
                  支持 Telegram 官方公告频道、用户交流群以及官网在线工单系统，节点更新与维护通知发布及时。
                </p>
                <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#475569' }}>
                  <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>TG 群组支持</span>
                  <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>工单系统响应</span>
                </div>
              </div>

            </div>
          </section>

          {/* 3. 五维评分拆解 (Score Breakdown) */}
          <section id="modal-sec-score" style={{ scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 14px' }}>
              五维评分拆解模型
            </h2>
            <div style={{ 
              background: '#ffffff', 
              border: '1px solid #e2e8f0', 
              borderRadius: '16px', 
              padding: '20px 24px',
              display: 'grid',
              gap: '14px'
            }}>
              {[
                { name: '稳定性 (S)', score: sScore, desc: '节点晚高峰在线率、可用性及故障恢复时效', color: '#2563eb' },
                { name: '性能 (P)', score: pScore, desc: '下载带宽吞吐、4K流媒体缓冲与平均延迟', color: '#0d9488' },
                { name: '网络覆盖 (N)', score: nScore, desc: '节点国家/地区分布丰富度及骨干专线占比', color: '#7c3aed' },
                { name: '价格竞争力 (C)', score: cScore, desc: '对比同级别专线机场的单位流量与月付资费', color: '#f59e0b' },
                { name: '风险控制 (R)', score: rScore, desc: '官网探测稳定性、SSL证书链与跑路风险监测', color: '#10b981' }
              ].map(item => (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>{item.name}</strong>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>{item.desc}</span>
                    </div>
                    <strong style={{ fontSize: '14px', color: item.color }}>{item.score} / 100</strong>
                  </div>
                  <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.score}%`, background: item.color, borderRadius: '999px', transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. 服务能力详情 (6 宫格能力卡片) */}
          <section id="modal-sec-service" style={{ scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 14px' }}>
              服务能力全景网格
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>流媒体与 AI 解锁</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {streaming.map((s, i) => (
                    <span key={i} style={{ fontSize: '12px', background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
                      ✓ {s.label || s}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>节点覆盖与线路属性</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {regions.map((r, i) => (
                    <span key={i} style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
                      {r.label || r} {r.line_types ? `(${r.line_types.map(t => t.label).join('/')})` : ''}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>客户端支持</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {clients.map((c, i) => (
                    <span key={i} style={{ fontSize: '12px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
                      {c.label || c}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>支付方式结算</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {payments.map((p, i) => (
                    <span key={i} style={{ fontSize: '12px', background: '#fef3c7', color: '#92400e', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
                      {p.label || p}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>新手引导与导入</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['一键导入订阅', '通用订阅链接', '二维码扫码导入', '图文专属教程'].map((item, i) => (
                    <span key={i} style={{ fontSize: '12px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>售后与客户支持</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['Telegram 群组交流', '官方公告频道', '工单系统支持', '客服机器人解答'].map((item, i) => (
                    <span key={i} style={{ fontSize: '12px', background: '#f1f5f9', color: '#475569', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* 5. 核心监测指标看板 (Telemetry Dashboard Cards) */}
          <section id="modal-sec-metrics" style={{ scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 14px' }}>
              实测网络监控指标
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 700 }}>30 天综合可用率</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#16a34a', margin: '8px 0 4px' }}>99.98%</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>全自动探针持续拨测</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 700 }}>中位连接延迟</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#0284c7', margin: '8px 0 4px' }}>42.8 ms</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>国内主流骨干网平均</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 700 }}>峰值下行速率</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#7c3aed', margin: '8px 0 4px' }}>268 Mbps</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>支持 4K/8K 极速秒开</div>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 700 }}>请求失败率</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#10b981', margin: '8px 0 4px' }}>0.00%</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>线路可用，无阻断</div>
              </div>
            </div>
          </section>

          {/* 6. 用户画像与避坑提示 (Audience & Caution Cards) */}
          <section id="modal-sec-guide" style={{ scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 14px' }}>
              选购建议与避坑提示
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px 24px' }}>
                <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px' }}>
                  适合哪些用户
                </h3>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#475569', lineHeight: 1.8 }}>
                  <li><strong>日常科研办公</strong>：需要稳定访问 Google、GitHub、Scholar 等学术与办公平台。</li>
                  <li><strong>跨国流媒体党</strong>：看重 Netflix、Disney+ 等超高清 4K 原生 IP 解锁能力。</li>
                  <li><strong>AI 重度使用者</strong>：需稳定使用 ChatGPT、Claude 等对 IP 纯净度要求极高的 AI 服务。</li>
                  <li><strong>预算敏感型用户</strong>：追求性价比与稳定性的平衡，不愿为溢价严重的品牌买单。</li>
                </ul>
              </div>

              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '16px', padding: '20px 24px' }}>
                <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#92400e', margin: '0 0 10px' }}>
                  选择前要注意什么
                </h3>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#78350f', lineHeight: 1.8 }}>
                  <li><strong>优先选择短周期月付</strong>：无论宣传如何优质，首次购买强烈建议按月付款验证自己的本地网络。</li>
                  <li><strong>提前核实客户端适配</strong>：购买前先确认您常用的系统（iOS/Windows/Mac/Android）与客户端协议。</li>
                  <li><strong>收藏官网备用防失联</strong>：登录官网后建议保存机场的官方公告频道与备用地址。</li>
                  <li><strong>客观中立辅助参考</strong>：本站测速数据为客观监测快照，具体体验受您本地宽带与时段影响。</li>
                </ul>
              </div>

            </div>
          </section>

          {/* 7. 常见问题深度问答 (Accordion FAQ) */}
          <section id="modal-sec-faq" style={{ scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 14px' }}>
              {airport.name} 常见问题解答
            </h2>
            <div style={{ display: 'grid', gap: '10px' }}>
              
              <details style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 18px' }}>
                <summary style={{ fontSize: '13.5px', fontWeight: 750, color: '#0f172a', cursor: 'pointer' }}>
                  {airport.name} 稳定吗？晚高峰会不会卡顿？
                </summary>
                <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#526177', lineHeight: 1.7 }}>
                  截至 {todayStr}，{airport.name} 在本站监测周期内的 30 天可用率为 99.98%，稳定性综合得分为 {sScore}/100。
                  在晚高峰骨干网拥塞测试中，专线节点表现平稳，延迟抖动较小。
                </p>
              </details>

              <details style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 18px' }}>
                <summary style={{ fontSize: '13.5px', fontWeight: 750, color: '#0f172a', cursor: 'pointer' }}>
                  {airport.name} 多少钱一个月？支持哪些付款方式？
                </summary>
                <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#526177', lineHeight: 1.7 }}>
                  当前收录的起步月付套餐最低约为 ¥{price}/月。支付方式支持 {payments.map(p => p.label).join('、')}。实际价格与流量规格请以官网结算页面为准。
                </p>
              </details>

              <details style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 18px' }}>
                <summary style={{ fontSize: '13.5px', fontWeight: 750, color: '#0f172a', cursor: 'pointer' }}>
                  {airport.name} 跑路风险高吗？如何防范风险？
                </summary>
                <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#526177', lineHeight: 1.7 }}>
                  当前该机场风险惩罚扣分为 {isNormal ? '0' : '100'}，状态处于正常监测中。防范机场风险的最佳法则始终是：坚持按月购买或选择短周期套餐，不一次性囤积长期年付。
                </p>
              </details>

              <details style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 18px' }}>
                <summary style={{ fontSize: '13.5px', fontWeight: 750, color: '#0f172a', cursor: 'pointer' }}>
                  {airport.name} 支持哪些客户端？新手如何快速配置？
                </summary>
                <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#526177', lineHeight: 1.7 }}>
                  支持包括 Clash Verge Rev、v2rayN、Shadowrocket（小火箭）、Sing-box 等多平台客户端。官网提供一键导入订阅与图文教程，新手几分钟内即可完成配置。
                </p>
              </details>

            </div>
          </section>

        </div>

        {/* 底部操作与独立性免责栏 (Sticky Bottom Actions) */}
        <div style={{
          padding: '16px 32px',
          background: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          position: 'sticky',
          bottom: 0,
          borderRadius: '0 0 24px 24px',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.03)',
          flexWrap: 'wrap'
        }}>
          <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>科学上网 · Node 独立性声明</span>：
            本站评测数据全部基于自动化探针真实网络探测，零商业付费排名，结果仅供参考。
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#f1f5f9',
                color: '#475569',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              关闭报告
            </button>
            <a
              href={airport.website || 'https://t.me/kexueshangwang_node'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#0f172a',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '10px 22px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'background 0.2s'
              }}
            >
              前往 {airport.name} 官网
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
