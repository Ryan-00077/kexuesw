import React, { useState } from 'react';

export default function ApplyView({ setCurrentRoute }) {
  const [formData, setFormData] = useState({
    airportName: '',
    websiteUrl: '',
    backupUrl: '',
    monthlyPrice: '',
    nodeCount: '',
    protocols: 'IEPL专线 / VLESS / Shadowsocks',
    testSubscription: '',
    contactTelegram: '',
    contactEmail: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [activationPending, setActivationPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.airportName || !formData.websiteUrl) {
      alert('请至少填写机场名称与官网地址！');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/shenx8017@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          _subject: `新的机场入驻申请：${formData.airportName}`,
          _template: 'table',
          _replyto: formData.contactEmail || 'shenx8017@gmail.com',
          机场名称: formData.airportName,
          主官网: formData.websiteUrl,
          备用地址: formData.backupUrl || '无',
          起步月付: `¥${formData.monthlyPrice || '15'}/月`,
          节点规模: formData.nodeCount || '30+',
          线路协议: formData.protocols || 'IEPL专线 / VLESS',
          测试订阅或账号: formData.testSubscription || '未填写',
          联系Telegram: formData.contactTelegram || '未填写',
          联系邮箱: formData.contactEmail || '未填写',
          服务特色说明: formData.notes || '未填写',
          申请时间: new Date().toLocaleString('zh-CN')
        })
      });

      const result = await response.json().catch(() => ({}));
      const responseMessage = String(result.message || '');

      if (/activat/i.test(responseMessage)) {
        setActivationPending(true);
        setSubmitted(true);
        return;
      }

      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error(responseMessage || '邮件接口暂时不可用');
      }

      setActivationPending(false);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(`${error.message || '提交失败'}，请稍后重试或复制申请资料发送给站长。`);
    } finally {
      setSubmitting(false);
    }
  };

  const getSummaryText = () => {
    return `【科学上网 · Node 机场入驻申请资料】
机场名称: ${formData.airportName}
主官网: ${formData.websiteUrl}
备用地址: ${formData.backupUrl || '无'}
起步月付: ¥${formData.monthlyPrice || '15'}/月
节点规模: ${formData.nodeCount || '30+'}
线路协议: ${formData.protocols || 'IEPL专线 / VLESS'}
测试订阅/账号: ${formData.testSubscription || '已准备好专用测试节点'}
联系 Telegram: ${formData.contactTelegram || '未填写'}
联系邮箱: ${formData.contactEmail || '未填写'}
服务特色说明: ${formData.notes || '高可用专线，晚高峰稳定'}
申请时间: ${new Date().toLocaleString()}`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(getSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="application-page">
      {/* 1. Apply Hero */}
      <header className="apply-hero">
        <div className="apply-container">
          <div className="apply-hero-body">
            <div className="apply-hero-copy">
              <p className="apply-eyebrow">为认真经营的机场，增加一个被了解的入口</p>
              <h1>
                让正在选机场的用户，<br />走进你的官网。
              </h1>
              <p className="apply-lead">
                通过服务资料与测试结果展示，<br className="apply-mobile-break" />
                让用户多一个了解你的入口。
              </p>
              <div className="apply-actions">
                <a 
                  id="apply-primary-cta" 
                  className="apply-button apply-button-mint" 
                  href="#apply-form"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  立即申请入驻
                </a>
                <a 
                  className="apply-example-link" 
                  href="/rankings/all"
                  onClick={(e) => {
                    e.preventDefault();
                    if (setCurrentRoute) setCurrentRoute('rankings');
                  }} 
                  title="查看推荐榜展示页面"
                >
                  查看展示样例
                </a>
              </div>
            </div>

            <div className="apply-journey" aria-label="用户从了解服务到访问官网的路径">
              <svg className="apply-orbit" viewBox="0 0 360 220" fill="none" aria-hidden="true">
                <ellipse cx="180" cy="110" rx="170" ry="94" stroke="currentColor" />
                <ellipse cx="180" cy="110" rx="125" ry="94" stroke="currentColor" />
                <path d="M10 110h340M180 16v188" stroke="currentColor" />
                <circle cx="298" cy="43" r="5" fill="currentColor" />
              </svg>
              <div className="apply-journey-title">从了解，到访问</div>
              <ol>
                <li>
                  <span className="apply-step-symbol" aria-hidden="true">01</span>
                  <div>
                    <strong>发现你的服务</strong>
                    <span>机场资料与服务特色</span>
                  </div>
                </li>
                <li>
                  <span className="apply-step-symbol" aria-hidden="true">02</span>
                  <div>
                    <strong>参考测试结果</strong>
                    <span>结合监测表现与风险记录</span>
                  </div>
                </li>
                <li>
                  <span className="apply-step-symbol" aria-hidden="true">03</span>
                  <div>
                    <strong>进入你的官网</strong>
                    <span>由用户自主了解与选择</span>
                  </div>
                </li>
              </ol>
              <p>路径示意 · 展示以实际资料和测试数据为准</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Three Pillars / Values */}
      <div className="apply-container">
        <section className="apply-values" aria-label="入驻后可以展示什么">
          <article>
            <span className="apply-value-index">01 / 资料</span>
            <h2>把服务讲清楚</h2>
            <p>展示官网、套餐价格、试用支持与服务介绍，方便用户了解你的机场。</p>
          </article>
          <article>
            <span className="apply-value-index">02 / 测试</span>
            <h2>让表现有据可查</h2>
            <p>通过测试结果、评分趋势与风险记录，帮助用户形成自己的判断。</p>
          </article>
          <article>
            <span className="apply-value-index">03 / 连接</span>
            <h2>从展示走向官网</h2>
            <p>提供官网官方直达入口；自主提交与维护运营资料，零商业化费用，真实触达用户。</p>
          </article>
        </section>


        {/* 4. Process Section */}
        <section className="apply-section apply-process" aria-labelledby="apply-process-title">
          <div className="apply-section-heading">
            <div>
              <p className="apply-eyebrow">入驻流程</p>
              <h2 id="apply-process-title">从提交资料开始。</h2>
            </div>
            <p>提交资料并通过探针连通性测试后，即可快速发布上线。</p>
          </div>
          <ol className="apply-process-list">
            <li>
              <span>01</span>
              <h3>提交申请</h3>
              <p>填写机场基本信息与专用测试节点，生成申请工单报文。</p>
            </li>
            <li>
              <span>02</span>
              <h3>自动化探针测试</h3>
              <p>系统探针自动探测节点连通率、延迟与丢包指标。</p>
            </li>
            <li>
              <span>03</span>
              <h3>联调与确认</h3>
              <p>管理员与您核实测试节点状态与探针配置，保障数据真实性。</p>
            </li>
            <li>
              <span>04</span>
              <h3>审核合格上线</h3>
              <p>节点健康合格后自动生成评测卡片并全站展示上线。</p>
            </li>
          </ol>
        </section>

        {/* 5. Preparation Note */}
        <section className="apply-preparation" aria-labelledby="apply-preparation-title">
          <h2 id="apply-preparation-title">填写前，准备好这些资料</h2>
          <p>机场名称、主官网与备用网址、月付价格、成立日期和服务简介；可联系的邮箱与 Telegram；专用测试账号与密码，可选填订阅链接。</p>
          <p className="apply-preparation-note">建议单独创建可用于自动化监测的专用测试账号，避免使用个人主账号。</p>
        </section>
      </div>

      {/* 6. Form Container */}
      <div className="apply-container">
        <section id="apply-form" className="apply-section" aria-labelledby="apply-form-title">
          <div className="apply-section-heading">
            <div>
              <p className="apply-eyebrow">入驻申请</p>
              <h2 id="apply-form-title">填写你的机场资料。</h2>
            </div>
            <p>提交后开通工单对接，客服人员将在 24 小时内与您核实测试节点并部署探针。</p>
          </div>

          {submitted ? (
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '16px',
              padding: '28px',
              margin: '24px 0 40px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '28px',
                  height: '28px',
                  borderRadius: '999px',
                  background: '#16a34a',
                  color: '#fff',
                  fontWeight: 900
                }}>✓</span>
                <h3 style={{ margin: 0, color: '#166534', fontSize: '18px', fontWeight: 800 }}>
                  {activationPending ? '邮件接口等待激活' : '申请已提交到站长邮箱！'}
                </h3>
              </div>
              <p style={{ margin: '0 0 16px', color: '#14532d', fontSize: '14px', lineHeight: 1.6 }}>
                {activationPending
                  ? '激活邮件已发送至 shenx8017@gmail.com。请打开邮件并点击“Activate Form”；激活完成后，再返回提交一次申请。'
                  : '申请资料已发送至 shenx8017@gmail.com，你可以在收件箱中查看完整内容。'}
              </p>

              <pre style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '13px',
                color: '#334155',
                whiteSpace: 'pre-wrap',
                fontFamily: 'ui-monospace, monospace',
                lineHeight: 1.7,
                margin: '0 0 20px'
              }}>
                {getSummaryText()}
              </pre>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="apply-button apply-button-dark"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  {copied ? '✓ 已成功复制' : '复制申请资料工单'}
                </button>
                <a
                  href="mailto:shenx8017@gmail.com"
                  className="apply-button apply-button-mint"
                >
                  发送备用邮件
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    padding: '0 18px',
                    color: '#64748b',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  返回重新修改
                </button>
              </div>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8ed',
                borderRadius: '18px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(18,35,61,0.06)',
                margin: '20px 0 40px'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 800, color: '#12233d' }}>
                    机场名称 <span style={{ color: '#e11d48' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="如：极速云 / 秒秒加速"
                    value={formData.airportName}
                    onChange={(e) => setFormData({ ...formData, airportName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      background: '#f8fafc',
                      color: '#0f172a',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 800, color: '#12233d' }}>
                    官网主地址 <span style={{ color: '#e11d48' }}>*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      background: '#f8fafc',
                      color: '#0f172a',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 800, color: '#12233d' }}>
                    备用域名 / 免翻墙入口
                  </label>
                  <input
                    type="text"
                    placeholder="如：https://sub.example.com"
                    value={formData.backupUrl}
                    onChange={(e) => setFormData({ ...formData, backupUrl: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      background: '#f8fafc',
                      color: '#0f172a',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 800, color: '#12233d' }}>
                    起步月付套餐价格 (元/月)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="如：15"
                    value={formData.monthlyPrice}
                    onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      background: '#f8fafc',
                      color: '#0f172a',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 800, color: '#12233d' }}>
                    节点数量规模
                  </label>
                  <input
                    type="text"
                    placeholder="如：45 个节点"
                    value={formData.nodeCount}
                    onChange={(e) => setFormData({ ...formData, nodeCount: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      background: '#f8fafc',
                      color: '#0f172a',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 800, color: '#12233d' }}>
                    线路类型与支持协议
                  </label>
                  <input
                    type="text"
                    placeholder="如：IEPL专线 / VLESS / Shadowsocks"
                    value={formData.protocols}
                    onChange={(e) => setFormData({ ...formData, protocols: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      background: '#f8fafc',
                      color: '#0f172a',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 800, color: '#12233d' }}>
                  专用测试节点订阅链接或测试账号
                </label>
                <textarea
                  rows={2}
                  placeholder="提供仅供自动化监测探针测试的订阅链接或账号密码（避免提供个人主力账户）"
                  value={formData.testSubscription}
                  onChange={(e) => setFormData({ ...formData, testSubscription: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    background: '#f8fafc',
                    color: '#0f172a',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 800, color: '#12233d' }}>
                    联系 Telegram
                  </label>
                  <input
                    type="text"
                    placeholder="@your_telegram_username"
                    value={formData.contactTelegram}
                    onChange={(e) => setFormData({ ...formData, contactTelegram: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      background: '#f8fafc',
                      color: '#0f172a',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 800, color: '#12233d' }}>
                    联系邮箱
                  </label>
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      background: '#f8fafc',
                      color: '#0f172a',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 800, color: '#12233d' }}>
                  服务特色与补充说明
                </label>
                <textarea
                  rows={3}
                  placeholder="简述您的机场亮点，如：原生IP流媒体解锁、晚高峰自建骨干冗余带宽、自研客户端支持等"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    background: '#f8fafc',
                    color: '#0f172a',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#637084' }}>
                    点击提交即表示您已阅读并知晓入驻规范与评分独立性声明。
                  </p>
                  <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#94a3b8' }}>
                    资料将通过 FormSubmit 邮件接口发送，请勿填写个人主账号密码。
                  </p>
                  {submitError && (
                    <p role="alert" style={{ margin: '8px 0 0', fontSize: '13px', color: '#dc2626', fontWeight: 700 }}>
                      {submitError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="apply-button apply-button-dark"
                  style={{
                    border: 'none',
                    cursor: submitting ? 'wait' : 'pointer',
                    padding: '12px 32px',
                    opacity: submitting ? 0.7 : 1
                  }}
                >
                  {submitting ? '正在发送…' : '提交申请到站长邮箱'} <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          )}

          {/* 7. Apply FAQ */}
          <section className="apply-faq apply-section" aria-labelledby="apply-faq-title">
            <div className="apply-section-heading">
              <div>
                <p className="apply-eyebrow">常见问题</p>
                <h2 id="apply-faq-title">申请前，再确认一下。</h2>
              </div>
            </div>
            <details>
              <summary>申请收录需要满足什么条件？</summary>
              <p>官网需可正常访问，提供可供自动化监测探针测试的专用节点或订阅链接，且线路具备基本稳定性与可用性。</p>
            </details>
            <details>
              <summary>提交申请后多久能完成测试上线？</summary>
              <p>提交申请资料后，系统将在 24 小时内完成探针联调与节点健康探测，测试合格后将自动生成测评卡片并更新至全站榜单。</p>
            </details>
            <details>
              <summary>评分与排名的依据是什么？</summary>
              <p>
                所有评分与排名均基于系统探针持续监测的真实网络数据（稳定性、延迟、晚高峰丢包与解锁能力），算法独立运算，不设任何商业竞价。
                <a 
                  href="/methodology"
                  onClick={(e) => {
                    e.preventDefault();
                    if (setCurrentRoute) setCurrentRoute('methodology');
                  }}
                >
                  查看评分独立性声明
                </a>。
              </p>
            </details>
            <details>
              <summary>官网直达链接如何展示？</summary>
              <p>收录后，平台将在卡片和测评详情页为用户提供清晰的官方直达入口，方便用户自主了解与选择。</p>
            </details>
          </section>
        </section>
      </div>
    </main>
  );
}
