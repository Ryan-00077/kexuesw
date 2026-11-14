import React from 'react';

export default function SidebarExplore({ setCurrentRoute }) {
  return (
    <section className="home-v3-explore">
      <span>EXCELLENCE IN CONSOLIDATION</span>
      <h2>探索更多优质机场</h2>
      <p>想快速找出适合特定需求的高阶中转网络么？寻找配有电竞游戏级别优化、4K Netflix HDR高流控或双向原生 IP 的高级套餐通道。</p>
      <a 
        href="/rankings/all"
        onClick={(e) => {
          e.preventDefault();
          window.location.hash = '#/rankings';
          setCurrentRoute('rankings');
        }}
      >
        立即探索 <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
