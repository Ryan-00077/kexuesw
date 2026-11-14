import React from 'react';

export default function RiskMonitorView({ onSelectAirport }) {
  const todayStr = new Date().toISOString().split('T')[0];

  const riskList = [
    { 
      rank: 1, 
      name: '上帝世界', 
      status: '跑路', 
      reason: '全线节点持续超时断连，官网已无法访问，管理人员已失联，确认为跑路。', 
      penalty: 100, 
      id: 75,
      tags: ['已跑路', '停止服务'],
      score: 0.00
    },
    { 
      rank: 2, 
      name: '滕王阁', 
      status: '跑路', 
      reason: '节点大面积熔断，官方群全员禁言解散，官网打不开，已确认跑路。', 
      penalty: 100, 
      id: 77,
      tags: ['已跑路', '停止服务'],
      score: 0.00
    },
    { 
      rank: 3, 
      name: '蜜雪冰城', 
      status: '跑路', 
      reason: '官网自动探测持续失败，订阅解析完全失效，客服渠道无法联络，确认停服跑路。', 
      penalty: 100, 
      id: 78,
      tags: ['已跑路', '停止服务'],
      score: 0.00
    },
    { 
      rank: 4, 
      name: '奈云 VPN', 
      status: '跑路', 
      reason: '经多区域拨测节点已全部离线，官网域名无法解析，已确认跑路。', 
      penalty: 100, 
      id: 76,
      tags: ['已跑路', '停止服务'],
      score: 0.00
    }
  ];

  return (
    <main className="page-main">
      <section className="hero hero-risk">
        <div className="eyebrow">跑路监测</div>
        <h1>跑路机场监测：高风险机场名单与机场跑路预警</h1>
        <p>本页聚合管理员确认跑路与命中风险观察标签的机场，原始 HTML 直接暴露风险原因、状态和报告入口。</p>
        <div className="metric-grid">
          <div className="metric">
            <div>风险对象</div>
            <strong>{riskList.length}</strong>
          </div>
          <div className="metric">
            <div>当前分页</div>
            <strong>1/1</strong>
          </div>
          <div className="metric">
            <div>默认页容量</div>
            <strong>20</strong>
          </div>
          <div className="metric">
            <div>数据日期</div>
            <strong>{todayStr}</strong>
          </div>
        </div>
      </section>

      <section className="content-card">
        <h2>风险监测列表</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>排序</th>
                <th>机场</th>
                <th>状态</th>
                <th>原因</th>
                <th>风险扣分</th>
                <th>报告</th>
              </tr>
            </thead>
            <tbody>
              {riskList.map((item) => (
                <tr key={item.rank}>
                  <td>#{item.rank}</td>
                  <td><strong>{item.name}</strong></td>
                  <td>
                    <span 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 800,
                        color: '#e11d48',
                        backgroundColor: '#ffe4e6',
                        border: '1px solid #fecdd3'
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.reason}</td>
                  <td>
                    <span style={{ color: '#e11d48', fontWeight: 700 }}>
                      -{item.penalty}
                    </span>
                  </td>
                  <td>
                    <a 
                      href={`/reports/${item.id}`}
                      className="report-link"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onSelectAirport) onSelectAirport(item);
                      }}
                    >
                      测评报告
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
