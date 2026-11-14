import React from 'react';
import sectionsData from '../data/sections.json';

export default function CrossAnalysisSection({ onSelectAirport }) {
  const categories = [
    {
      key: 'most_stable',
      title: '长期稳定机场',
      subtitle: '稳定达标 · 公平轮换',
      data: sectionsData.most_stable?.items || []
    },
    {
      key: 'best_value',
      title: '性价比推荐',
      subtitle: '稳定实惠 · 公平轮换',
      data: sectionsData.best_value?.items || []
    },
    {
      key: 'new_entries',
      title: '新入榜',
      subtitle: 'New Entries',
      data: sectionsData.new_entries?.items || []
    },
    {
      key: 'risk_alerts',
      title: '风险预警',
      subtitle: 'Risk Alerts',
      data: sectionsData.risk_alerts?.items || []
    }
  ];

  return (
    <section aria-labelledby="home-v3-summary-title">
      <div className="home-v3-section-head">
        <div>
          <span>Multiple signals</span>
          <h2 id="home-v3-summary-title">从不同维度交叉判断</h2>
          <p>稳定与性价比达标后公平轮换，展示顺序不代表评分排名。</p>
        </div>
      </div>

      <div className="home-v3-summary-grid">
        {categories.map((cat) => (
          <article key={cat.key}>
            <div className="home-v3-summary-title">
              <h3>{cat.title}</h3>
            </div>
            <p>{cat.subtitle}</p>

            <ol aria-label="展示顺序，非评分排名">
              {cat.data.map((item, idx) => {
                const seq = String(idx + 1).padStart(2, '0');
                const isRisk = cat.key === 'risk_alerts';

                return (
                  <li key={item.airport_id || idx}>
                    <span>{seq}</span>
                    <a
                      href={item.report_url || '#'}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectAirport(item);
                      }}
                    >
                      {item.name}
                    </a>
                    {isRisk ? (
                      <strong className="home-v3-risk-status">{item.status || '跑路'}</strong>
                    ) : (
                      <strong>{Number(item.score).toFixed(2)}</strong>
                    )}
                  </li>
                );
              })}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
