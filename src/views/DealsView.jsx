import React, { useState } from 'react';
import initialDeals from '../data/deals.json';

export default function DealsView() {
  const [copiedCode, setCopiedCode] = useState(null);
  const [dealCards] = useState(initialDeals);

  const handleCopy = (code) => {
    if (navigator.clipboard && code) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  return (
    <main className="page-main">
      <section className="hero hero-deals">
        <div className="hero-surface"></div>
        <div className="hero-content">
          <div>
            <div className="eyebrow">DEALS &amp; COUPONS</div>
            <h1>机场优惠码大全：活动折扣、免费试用与 USDT 支付优惠</h1>
            <p>科学上网 · Node 机场优惠码大全当前展示 {dealCards.length} 个机场活动位，聚合机场折扣、免费试用、新用户优惠与 USDT 支付优惠。优惠信息不影响 Node Score。</p>
          </div>
          <div className="metric-grid">
            <div className="metric">
              <div>当前活动</div>
              <strong>{dealCards.length}</strong>
            </div>
            <div className="metric">
              <div>免费试用</div>
              <strong>0+</strong>
            </div>
            <div className="metric">
              <div>支持 USDT</div>
              <strong>2+</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="content-card">
        <div className="eyebrow">重要说明</div>
        <h2>优惠信息不影响 Node Score</h2>
        <p className="muted">本页用于展示机场服务商投放的优惠活动与优惠码，不代表 科学上网 · Node 测评推荐。请结合测评报告、风险记录与自身需求独立判断。</p>
      </section>

      <section className="content-card">
        <h2>机场优惠卡片</h2>
        <div className="card-grid">
          {dealCards.map((deal, idx) => {
            const isCopied = copiedCode === deal.code;

            return (
              <article key={deal.campaign_id || idx} className="mini-card">
                <div className="eyebrow">限时优惠</div>
                <h3>
                  <a href={deal.website || '#'} target="_blank" rel="sponsored nofollow noreferrer noopener">
                    {deal.name}
                  </a>
                </h3>
                <p>
                  <strong>优惠码：</strong>
                  <span 
                    onClick={() => handleCopy(deal.code)}
                    style={{ 
                      cursor: 'pointer', 
                      backgroundColor: '#f1f5f9', 
                      padding: '2px 8px', 
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: isCopied ? '#16a34a' : '#2563eb'
                    }}
                    title="点击复制"
                  >
                    {deal.code || '---'} {isCopied ? '✓ 已复制' : '(复制)'}
                  </span>
                </p>
                <p><strong>折扣说明：</strong>{deal.discount}</p>
                <p><strong>适用套餐：</strong>{deal.plan}</p>
                <p><strong>活动时间：</strong>{deal.period}</p>
                <p className="muted">{deal.meta}</p>
                <p>
                  <a href={deal.website || '/apply'} target="_blank" rel="sponsored nofollow noreferrer noopener">
                    访问官网
                  </a>
                </p>
                <p className="muted">本活动不影响 Node Score。</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="content-card">
        <div className="eyebrow">机场优惠码指南</div>
        <h2>机场优惠码和活动折扣怎么判断</h2>
        <div className="card-grid">
          <article className="mini-card">
            <h3>什么是机场优惠码</h3>
            <p>机场优惠码通常是服务商在新用户购买、续费、节日活动或指定套餐中提供的折扣凭证。它只能说明当前有商业活动，不能替代对稳定性、速度、风险记录和售后能力的判断。</p>
            <p className="muted">先确认适用套餐和时间范围 · 再查看测评报告和风险记录 · 优惠信息不影响 Node Score</p>
          </article>
          <article className="mini-card">
            <h3>机场优惠码和机场推荐有什么区别</h3>
            <p>优惠码页面展示的是广告活动和公开折扣；机场推荐页面关注测评数据、排名、风险和长期表现。科学上网 · Node 不把广告投放、优惠码或活动折扣计入榜单排序。</p>
            <p className="muted">优惠码用于省钱 · 推荐用于判断服务质量 · 广告标识保持可见</p>
          </article>
          <article className="mini-card">
            <h3>打折力度很大，可以直接买年付吗</h3>
            <p>不建议。特别便宜的年付通常伴随更高的跑路、失联和断流风险。更推荐按月付或季付周期尝试，优先看可用率、丢包率和晚高峰表现，避免因为一次性大额折扣被套牢。</p>
            <p className="muted">低价年付风险高 · 优先验证晚高峰表现 · 避免冲动消费</p>
          </article>
          <article className="mini-card">
            <h3>为什么有的优惠码无法生效</h3>
            <p>常见原因包括优惠码过期、适用套餐限制（例如仅限年付或不含轻量套餐）、大小写输入错误，或活动名额已达上限。遇到失效建议直接在机场官网核对最新公告或工单咨询客服。</p>
            <p className="muted">核对优惠时间 · 检查适用套餐 · 以官网公告为准</p>
          </article>
        </div>
      </section>

      <section className="content-card">
        <div className="eyebrow">常见问题</div>
        <h2>优惠码常见问题解答</h2>
        <div className="faq-grid">
          <article className="mini-card">
            <h3>科学上网 · Node 的机场优惠码会影响排名吗？</h3>
            <p>不会。优惠信息、广告投放和优惠码不影响 Node Score，也不影响榜单排序。</p>
          </article>
          <article className="mini-card">
            <h3>优惠码失效了怎么办？</h3>
            <p>我们会定期复核有效状态，如遇失效可访问官网确认或通过底部邮箱反馈。</p>
          </article>
          <article className="mini-card">
            <h3>支持 USDT 支付的优惠有额外折扣吗？</h3>
            <p>部分机场为鼓励链上支付会提供专属减免，但链上转账不可逆，需自行核对链类型与充值地址。</p>
          </article>
          <article className="mini-card">
            <h3>如何提交机场优惠活动？</h3>
            <p>符合收录标准的运营方可点击顶部【申请入驻测试】提交审核材料与活动方案。</p>
          </article>
        </div>
      </section>
    </main>
  );
}
