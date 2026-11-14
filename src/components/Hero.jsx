import React from 'react';

export default function Hero({ setCurrentRoute }) {
  return (
    <section className="home-v3-hero">
      <div className="home-v3-hero-copy">
        <div className="home-v3-hero-eyebrow">
          <a 
            className="home-v3-transparency-link" 
            href="/ranking-transparency" 
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#/methodology';
            setCurrentRoute('methodology');
            }}
          >
            关于 科学上网 · Node 评分、排名独立性的声明
          </a>
        </div>
        <h1>科学上网 · Node：机场 VPN 推荐与<span>可靠性榜单</span></h1>
        <p>基于公开监测数据，结合优秀机场轮换展示及长期稳定、性价比、新入榜与风险预警榜单，帮助用户快速筛选值得关注的机场 VPN 与测评报告。</p>
        <div className="home-v3-actions">
          <a 
            className="home-v3-primary" 
            href="/rankings/all" 
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#/rankings';
            setCurrentRoute('rankings');
            }}
          >
            查看完整排行
          </a>
          <a 
            href="/ranking-transparency" 
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#/methodology';
              setCurrentRoute('methodology');
            }}
          >
            测评方法与独立性声明
          </a>
        </div>
      </div>
    </section>
  );
}
