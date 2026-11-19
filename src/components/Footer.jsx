import React from 'react';

export default function Footer({ setCurrentRoute, onSelectArticle, onSelectReview }) {
  const handleNav = (route, e) => {
    e.preventDefault();
    if (onSelectArticle) onSelectArticle(null);
    if (route === 'reviews' && onSelectReview) onSelectReview(null);
    window.location.hash = route === 'home' ? '#/' : `#/${route}`;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <span className="footer-mark">
        <img 
          src="/logo-white-transparent.png" 
          alt="科学上网 · Node Logo" 
          style={{ width: '26px', height: '26px', objectFit: 'contain', display: 'block' }} 
        />
      </span>
      <strong>科学上网 · Node</strong>
      <p>以公开监测数据、评分趋势和风险记录为参考，帮助用户在排行与测评报告之间完成交叉判断。</p>
      <nav aria-label="页脚导航">
        <a href="/" onClick={(e) => handleNav('home', e)}>首页</a>
        <a href="/rankings/all" onClick={(e) => handleNav('rankings', e)}>机场排行</a>
        <a href="/deals" onClick={(e) => handleNav('deals', e)}>活动优惠</a>
        <a href="/risk-monitor" onClick={(e) => handleNav('risk-monitor', e)}>跑路监测</a>
        <a href="/methodology" onClick={(e) => handleNav('methodology', e)}>测评方法</a>
        <a href="/tools" onClick={(e) => handleNav('tools', e)}>工具</a>
        <a href="/reviews" onClick={(e) => handleNav('reviews', e)}>机场评测</a>
        <a href="/apply" onClick={(e) => handleNav('apply', e)}>申请入驻</a>
      </nav>
      <small>© 2026 科学上网 · Node. All rights reserved. 评分独立性声明：机场排行按评分排序，首页优秀机场公平轮换。</small>
    </footer>
  );
}
