import React, { useState, useEffect } from 'react';

function getLocalDateStr() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function RankingSection({ airports, onSelectAirport, onOpenReview, setCurrentRoute }) {
  const displayItems = airports.slice(0, 12);
  const [todayStr, setTodayStr] = useState(getLocalDateStr);

  useEffect(() => {
    // 跨日自动更新：每分钟检测一次，跨过零点时界面自动跳到新日期，无需手动刷新
    const timer = setInterval(() => {
      const current = getLocalDateStr();
      setTodayStr((prev) => (prev !== current ? current : prev));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="home-v3-ranking" aria-labelledby="home-v3-ranking-title">
      <div className="home-v3-section-head">
        <div>
          <span>Airport rotation · {todayStr}</span>
          <h2 id="home-v3-ranking-title">科学上网 · Node 优秀机场</h2>
        </div>
        <a 
          href="/rankings/all" 
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '#/rankings';
            setCurrentRoute('rankings');
          }}
        >
          全量榜单 →
        </a>
      </div>

      <div className="home-v3-table-wrap">
        <table>
          <caption>科学上网 · Node 优秀机场当前轮换展示</caption>
          <thead>
            <tr>
              <th scope="col">展示顺序</th>
              <th scope="col">机场名称</th>
              <th scope="col">节点数量</th>
              <th scope="col">月付</th>
              <th scope="col">入口</th>
            </tr>
          </thead>
          <tbody>
            {displayItems.map((item, idx) => {
              const rank = idx + 1;
              const rankClass = rank <= 3 ? `home-v3-rank home-v3-rank-${rank}` : 'home-v3-rank';

              return (
                <tr key={item.airport_id || idx}>
                  <td>
                    <b className={rankClass}>{rank}</b>
                  </td>
                  <td>
                    <a 
                      className="home-v3-airport-name" 
                      href={`/reports/${item.airport_id || rank}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectAirport(item);
                      }}
                    >
                      {item.name}
                    </a>
                    <div className="home-v3-tags">
                      {(item.tags || []).filter((tag) => tag !== '观察中').slice(0, 2).map((tag, tIdx) => (
                        <span key={tIdx}>{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <strong>{item.node_count ? `${item.node_count} 个` : '30 个'}</strong>
                  </td>
                  <td>
                    <strong>¥{Number(item.plan_price_month).toFixed(2).replace(/\.00$/, '')}/月</strong>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
                      <a 
                        className="home-v3-row-action" 
                        href={`/reports/${item.airport_id || rank}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onOpenReview(item);
                        }}
                      >
                        机场评测
                      </a>
                      <a
                        className="home-v3-row-action"
                        href={item.website}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                      >
                        官网直达
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
