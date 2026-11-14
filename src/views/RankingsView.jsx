import React, { useState, useMemo } from 'react';

export default function RankingsView({ airports, onSelectAirport, onOpenReview, setCurrentRoute }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedLines, setSelectedLines] = useState([]);
  const [selectedStreaming, setSelectedStreaming] = useState([]);
  const [selectedImports, setSelectedImports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Payment Options
  const paymentOptions = [
    { id: 'wechat', name: '微信' },
    { id: 'alipay', name: '支付宝' },
    { id: 'usdt_trc20', name: 'USDT-TRC20' },
    { id: 'usdt_erc20', name: 'USDT-ERC20' },
    { id: 'usdt_bep20', name: 'USDT-BEP20' },
    { id: 'stripe_card', name: '银行卡' },
    { id: 'paypal', name: 'PayPal' },
    { id: 'crypto_other', name: '其他加密货币' },
    { id: 'unionpay', name: '银联' }
  ];

  // 2. Client Options
  const clientOptions = [
    { id: 'self_built_client', name: '自建客户端' },
    { id: 'clash', name: 'Clash' },
    { id: 'clash_verge', name: 'Clash Verge' },
    { id: 'clash_mi', name: 'Clash Mi' },
    { id: 'clash_party', name: 'Clash Party' },
    { id: 'shadowrocket', name: 'Shadowrocket' },
    { id: 'quantumult_x', name: 'Quantumult X' },
    { id: 'stash', name: 'Stash' },
    { id: 'surge', name: 'Surge' },
    { id: 'sing_box', name: 'sing-box' },
    { id: 'v2rayn', name: 'v2rayN' },
    { id: 'v2rayng', name: 'v2rayNG' },
    { id: 'nekobox', name: 'NekoBox' },
    { id: 'surfboard', name: 'Surfboard' },
    { id: 'xiaohuojian', name: '小火箭' },
    { id: 'openclash', name: 'OpenClash' }
  ];

  // 3. Region Options
  const regionOptions = [
    { id: 'hong_kong', name: '香港' },
    { id: 'taiwan', name: '台湾' },
    { id: 'macao', name: '澳门' },
    { id: 'japan', name: '日本' },
    { id: 'singapore', name: '新加坡' },
    { id: 'united_states', name: '美国' },
    { id: 'south_korea', name: '韩国' },
    { id: 'united_kingdom', name: '英国' },
    { id: 'germany', name: '德国' },
    { id: 'turkey', name: '土耳其' },
    { id: 'india', name: '印度' },
    { id: 'indonesia', name: '印度尼西亚' },
    { id: 'thailand', name: '泰国' },
    { id: 'philippines', name: '菲律宾' },
    { id: 'malaysia', name: '马来西亚' },
    { id: 'vietnam', name: '越南' },
    { id: 'australia', name: '澳大利亚' },
    { id: 'canada', name: '加拿大' },
    { id: 'brazil', name: '巴西' },
    { id: 'chile', name: '智利' },
    { id: 'france', name: '法国' },
    { id: 'italy', name: '意大利' },
    { id: 'argentina', name: '阿根廷' },
    { id: 'netherlands', name: '荷兰' },
    { id: 'south_africa', name: '南非' },
    { id: 'russia', name: '俄罗斯' },
    { id: 'spain', name: '西班牙' },
    { id: 'switzerland', name: '瑞士' },
    { id: 'sweden', name: '瑞典' },
    { id: 'finland', name: '芬兰' },
    { id: 'norway', name: '挪威' },
    { id: 'poland', name: '波兰' },
    { id: 'uae', name: '阿联酋' }
  ];

  // 4. Line Options
  const lineOptions = [
    { id: 'iepl', name: 'IEPL' },
    { id: 'iplc', name: 'IPLC' },
    { id: 'cn2', name: 'CN2' },
    { id: 'bgp', name: 'BGP' },
    { id: 'relay', name: '中转' }
  ];

  // 5. Streaming Options
  const streamingOptions = [
    { id: 'netflix', name: 'Netflix' },
    { id: 'chatgpt', name: 'ChatGPT' },
    { id: 'disney_plus', name: 'Disney+' },
    { id: 'hbo_max', name: 'HBO Max' },
    { id: 'youtube_premium', name: 'YouTube Premium' },
    { id: 'tiktok', name: 'TikTok' },
    { id: 'spotify', name: 'Spotify' }
  ];

  // 6. Import Options
  const importOptions = [
    { id: 'one_click_import', name: '一键导入' },
    { id: 'subscription_link', name: '订阅链接' },
    { id: 'universal_subscription', name: '通用订阅' },
    { id: 'qr_code_import', name: '二维码导入' },
    { id: 'tutorials', name: '教程支持' }
  ];

  const toggleFilter = (type, id) => {
    setCurrentPage(1);
    if (type === 'payment') {
      setSelectedPayments(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    } else if (type === 'client') {
      setSelectedClients(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    } else if (type === 'region') {
      setSelectedRegions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    } else if (type === 'line') {
      setSelectedLines(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    } else if (type === 'streaming') {
      setSelectedStreaming(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    } else if (type === 'import') {
      setSelectedImports(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    }
  };

  const activeFiltersCount = selectedPayments.length + selectedClients.length + selectedRegions.length + selectedLines.length + selectedStreaming.length + selectedImports.length + (searchTerm ? 1 : 0);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedPayments([]);
    setSelectedClients([]);
    setSelectedRegions([]);
    setSelectedLines([]);
    setSelectedStreaming([]);
    setSelectedImports([]);
    setCurrentPage(1);
  };

  // Filter Logic
  const filteredAirports = useMemo(() => {
    return airports.filter((item) => {
      const caps = item.capabilities || {};

      // 1. Search Query
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const nameMatch = (item.name || '').toLowerCase().includes(q);
        const introMatch = (item.airport_intro || '').toLowerCase().includes(q);
        const tagMatch = (item.tags || []).some(t => t.toLowerCase().includes(q));
        if (!nameMatch && !introMatch && !tagMatch) return false;
      }

      // 2. Payments
      if (selectedPayments.length > 0) {
        const itemPayments = (caps.payment_methods || []).map(p => p.key);
        const match = selectedPayments.some(sp => itemPayments.includes(sp));
        if (!match) return false;
      }

      // 3. Clients
      if (selectedClients.length > 0) {
        const itemClients = (caps.clients || []).map(c => c.key);
        const match = selectedClients.some(sc => itemClients.includes(sc));
        if (!match) return false;
      }

      // 4. Regions
      if (selectedRegions.length > 0) {
        const itemRegions = (caps.regions || []).map(r => r.key);
        const match = selectedRegions.some(sr => itemRegions.includes(sr));
        if (!match) return false;
      }

      // 5. Lines
      if (selectedLines.length > 0) {
        const itemLines = [];
        (caps.regions || []).forEach(r => {
          (r.line_types || []).forEach(lt => itemLines.push(lt.key));
        });
        const tagLineMatch = (item.tags || []).some(t => selectedLines.some(sl => t.toLowerCase().includes(sl)));
        const lineMatch = selectedLines.some(sl => itemLines.includes(sl)) || tagLineMatch;
        if (!lineMatch) return false;
      }

      // 6. Streaming
      if (selectedStreaming.length > 0) {
        const itemStreaming = (caps.streaming || []).map(s => s.key);
        const match = selectedStreaming.some(ss => itemStreaming.includes(ss));
        if (!match) return false;
      }

      // 7. Import Methods
      if (selectedImports.length > 0) {
        const itemImports = (caps.import_methods || []).map(im => im.key);
        const match = selectedImports.some(si => itemImports.includes(si));
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));
  }, [airports, searchTerm, selectedPayments, selectedClients, selectedRegions, selectedLines, selectedStreaming, selectedImports]);

  const totalPages = Math.max(1, Math.ceil(filteredAirports.length / pageSize));
  const paginatedItems = filteredAirports.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const formatCapabilities = (item) => {
    const parts = [];
    const caps = item.capabilities || {};
    if (caps.payment_methods && caps.payment_methods.length > 0) {
      parts.push(caps.payment_methods.slice(0, 2).map(p => p.label || p.key).join('/'));
    }
    if (caps.clients && caps.clients.length > 0) {
      parts.push(caps.clients.slice(0, 2).map(c => c.label || c.key).join('/'));
    }
    if (caps.regions && caps.regions.length > 0) {
      parts.push(caps.regions.slice(0, 2).map(r => r.label || r.key).join('/'));
    }
    if (caps.plan?.supports_annual) {
      parts.push('年付');
    }
    if (caps.telegram?.has_group) {
      parts.push('TG群');
    }
    return parts.length > 0 ? parts.join(' · ') : '节点丰富 · 专线直达';
  };

  return (
    <main className="page-main">
      {/* 1. Hero */}
      <section className="hero hero-dark">
        <div className="eyebrow">机场排行</div>
        <h1>机场排行榜：全量机场 VPN 评分排名</h1>
        <p>
          {todayStr} 机场排行收录 {airports.length} 个已上线机场，按公开展示分数降序排列，支持分页查看官网入口、状态、标签、成立日期、月付价格、试用支持与测评报告。
        </p>
        <div className="metric-grid">
          <div className="metric">
            <div>收录机场</div>
            <strong>{airports.length}</strong>
          </div>
          <div className="metric">
            <div>当前分页</div>
            <strong>{currentPage}/{totalPages}</strong>
          </div>
          <div className="metric">
            <div>已选筛选</div>
            <strong>{activeFiltersCount}</strong>
          </div>
          <div className="metric">
            <div>数据日期</div>
            <strong>{todayStr}</strong>
          </div>
        </div>
      </section>

      {/* 2. Filter Card */}
      <section className="content-card ranking-filter-card">
        <h2>搜索与分类筛选</h2>
        <form className="ranking-search-form" onSubmit={(e) => e.preventDefault()} role="search">
          <input 
            className="ranking-search-input" 
            type="search" 
            placeholder="搜索机场名称、官网、标签或简介"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="ranking-search-button" type="submit">搜索</button>
        </form>
        <p className="muted">可按机场名称、支付方式、客户端、节点地区、线路、套餐和 Telegram 支持筛选。</p>

        {activeFiltersCount > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <button 
              type="button" 
              className="filter-clear" 
              onClick={clearAllFilters}
              style={{ cursor: 'pointer' }}
            >
              清除全部筛选 ({activeFiltersCount}) ✕
            </button>
          </div>
        )}

        {/* Filter Group 1: 支付方式 */}
        <div className="filter-group">
          <h3>支付方式</h3>
          <div className="filter-chip-row">
            {paymentOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                className={`filter-chip ${selectedPayments.includes(opt.id) ? 'active' : ''}`}
                onClick={() => toggleFilter('payment', opt.id)}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Group 2: 客户端 */}
        <div className="filter-group">
          <h3>客户端</h3>
          <div className="filter-chip-row">
            {clientOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                className={`filter-chip ${selectedClients.includes(opt.id) ? 'active' : ''}`}
                onClick={() => toggleFilter('client', opt.id)}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Group 3: 节点地区 */}
        <div className="filter-group">
          <h3>节点地区</h3>
          <div className="filter-chip-row">
            {regionOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                className={`filter-chip ${selectedRegions.includes(opt.id) ? 'active' : ''}`}
                onClick={() => toggleFilter('region', opt.id)}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Group 4: 线路类型 */}
        <div className="filter-group">
          <h3>线路类型</h3>
          <div className="filter-chip-row">
            {lineOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                className={`filter-chip ${selectedLines.includes(opt.id) ? 'active' : ''}`}
                onClick={() => toggleFilter('line', opt.id)}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Group 5: 流媒体与服务 */}
        <div className="filter-group">
          <h3>流媒体与服务</h3>
          <div className="filter-chip-row">
            {streamingOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                className={`filter-chip ${selectedStreaming.includes(opt.id) ? 'active' : ''}`}
                onClick={() => toggleFilter('streaming', opt.id)}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Group 6: 导入方式 */}
        <div className="filter-group">
          <h3>导入方式</h3>
          <div className="filter-chip-row">
            {importOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                className={`filter-chip ${selectedImports.includes(opt.id) ? 'active' : ''}`}
                onClick={() => toggleFilter('import', opt.id)}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA Tool Download */}
      <a 
        className="home-tool-download-cta" 
        href="/tools/download" 
        onClick={(e) => {
          e.preventDefault();
          if (setCurrentRoute) setCurrentRoute('tools');
        }}
        aria-label="翻墙工具客户端下载"
      >
        <div className="home-tool-download-copy">
          <span className="home-tool-download-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false" style={{ width: '24px', height: '24px' }}>
              <path d="M12 3v10m0 0 4-4m-4 4-4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M5 17v1.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="home-tool-download-text">
            <strong>翻墙工具客户端下载</strong>
            <p>按 Android、macOS、Windows、Linux 选择常用客户端，下载后可继续导入机场订阅。</p>
          </span>
        </div>
        <div className="home-tool-download-meta">
          <div className="home-tool-download-platforms">
            <span>Android</span><span>macOS</span><span>Windows</span><span>Linux</span>
          </div>
          <span className="home-tool-download-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false" style={{ width: '20px', height: '20px' }}>
              <path d="M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="m13 6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </a>

      {/* 4. Table List */}
      <section className="content-card">
        <h2>机场排行列表</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>排名</th>
                <th>机场</th>
                <th>状态</th>
                <th>分数</th>
                <th>月付</th>
                <th>服务能力</th>
                <th>入口</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                    未匹配到符合所有当前筛选条件的机场，请尝试减少筛选标签
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item, idx) => {
                  const rankNum = (currentPage - 1) * pageSize + idx + 1;

                  return (
                    <tr key={item.airport_id || idx}>
                      <td>#{rankNum}</td>
                      <td>
                        <a 
                          href={item.website} 
                          target="_blank" 
                          rel="nofollow noopener noreferrer"
                          style={{ fontWeight: 600, color: '#111' }}
                        >
                          {item.name}
                        </a>
                      </td>
                      <td>{item.status === 'normal' || !item.status ? '正常' : '观察中'}</td>
                      <td><strong>{item.score || '--'}</strong></td>
                      <td>¥{Number(item.plan_price_month).toFixed(2).replace(/\.00$/, '')}</td>
                      <td style={{ fontSize: '13px', color: '#666' }}>{formatCapabilities(item)}</td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <a 
                          className="report-link" 
                          href={`/reports/${item.airport_id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onOpenReview(item);
                          }}
                        >
                          机场评测
                        </a>
                        <a
                          className="report-link"
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
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Pagination */}
      <nav className="ranking-pagination" aria-label="机场排行分页">
        <span>第 {currentPage} 页，共 {totalPages} 页</span>
        <div>
          <span 
            aria-disabled={currentPage === 1}
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }
            }}
            style={{ cursor: currentPage > 1 ? 'pointer' : 'default' }}
          >
            上一页
          </span>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <a
              key={page}
              aria-current={currentPage === page ? 'page' : undefined}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              style={{ cursor: 'pointer' }}
            >
              {page}
            </a>
          ))}
          <a 
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }
            }}
            style={{ cursor: currentPage < totalPages ? 'pointer' : 'default' }}
          >
            下一页
          </a>
        </div>
      </nav>
    </main>
  );
}
