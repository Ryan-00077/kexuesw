import React from 'react';

export default function TrustSection({ setCurrentRoute, onSelectTag }) {
  const deepLinks = [
    { label: '测评方法', route: 'methodology' },
    { label: '跑路监测', route: 'risk-monitor' },
    { label: '机场优惠码', route: 'deals' },
    { label: '支付宝机场', route: 'rankings', tag: 'alipay' },
    { label: 'USDT 机场', route: 'rankings', tag: 'usdt_trc20' },
    { label: 'ChatGPT 机场', route: 'rankings', tag: 'chatgpt' },
    { label: 'Netflix 机场', route: 'rankings', tag: 'netflix' }
  ];

  const handleDeepLink = (link, e) => {
    e.preventDefault();
    if (link.tag && onSelectTag) {
      onSelectTag(link.tag);
    }
    setCurrentRoute(link.route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="home-v3-trust" aria-labelledby="home-v3-trust-title">
      <div className="home-v3-center-head">
        <span>Core philosophy</span>
        <h2 id="home-v3-trust-title">为什么选择 科学上网 · Node？</h2>
        <p>公开监测与透明方法，帮助你把推荐、价格和风险放在同一个判断框架里。</p>
      </div>

      <div>
        <article>
          <i aria-hidden="true">✓</i>
          <h3>公正客观</h3>
          <p>广告活动不参与评分，也不会改变综合榜排序。</p>
        </article>
        <article>
          <i aria-hidden="true">✓</i>
          <h3>真实数据</h3>
          <p>公开监测、测速指标和风险记录共同构成判断依据。</p>
        </article>
        <article>
          <i aria-hidden="true">✓</i>
          <h3>持续更新</h3>
          <p>每日重算榜单，同时保留历史趋势供交叉判断。</p>
        </article>
        <article>
          <i aria-hidden="true">✓</i>
          <h3>风险并列</h3>
          <p>推荐与风险提示同时展示，不只呈现单一高分。</p>
        </article>
        <article>
          <i aria-hidden="true">✓</i>
          <h3>方法透明</h3>
          <p>评分口径、榜单规则与报告入口均可公开查阅。</p>
        </article>
      </div>

      <nav aria-label="首页深度内容入口">
        {deepLinks.map((link, idx) => (
          <a
            key={idx}
            href={`#${link.route}`}
            onClick={(e) => handleDeepLink(link, e)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </section>
  );
}
