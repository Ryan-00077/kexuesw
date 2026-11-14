import React, { useState } from 'react';

export default function Navbar({ currentRoute, setCurrentRoute, onSelectArticle, setToolsPlatform }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (route, e) => {
    e?.preventDefault();
    if (onSelectArticle) onSelectArticle(null);
    window.location.hash = route === 'home' ? '#/' : `#/${route}`;
    setCurrentRoute(route);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToolNav = (platform, e) => {
    e?.preventDefault();
    if (onSelectArticle) onSelectArticle(null);
    if (setToolsPlatform) setToolsPlatform(platform);
    window.location.hash = '#/tools';
    setCurrentRoute('tools');
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="public-top-nav-root">
      <nav className="public-top-nav" data-public-top-nav="true">
        <div className="public-top-nav-inner">
          <div className="public-top-nav-start">
            <a 
              className="public-top-nav-brand" 
              href="/" 
              onClick={(e) => handleNav('home', e)}
              data-client-nav="true"
            >
              <span className="public-top-nav-brand-mark" aria-hidden="true">
                <img 
                  src="/logo-white-transparent.png" 
                  alt="Node" 
                  style={{ width: '22px', height: '22px', objectFit: 'contain', display: 'block' }} 
                />
              </span>
              <span className="public-top-nav-brand-title">科学上网 · Node</span>
            </a>

            <div className="public-top-nav-links">
              <a 
                className={`public-top-nav-link ${currentRoute === 'home' ? 'is-active' : ''}`} 
                href="/" 
                onClick={(e) => handleNav('home', e)}
                data-client-nav="true"
              >
                首页
              </a>
              <a 
                className={`public-top-nav-link ${currentRoute === 'rankings' ? 'is-active' : ''}`} 
                href="/rankings/all" 
                onClick={(e) => handleNav('rankings', e)}
                data-client-nav="true"
              >
                机场排行
              </a>
              <a 
                className={`public-top-nav-link ${currentRoute === 'deals' ? 'is-active' : ''}`} 
                href="/deals" 
                onClick={(e) => handleNav('deals', e)}
                data-client-nav="true"
              >
                活动优惠
              </a>
              <a 
                className={`public-top-nav-link ${currentRoute === 'risk-monitor' ? 'is-active' : ''}`} 
                href="/risk-monitor" 
                onClick={(e) => handleNav('risk-monitor', e)}
                data-client-nav="true"
              >
                跑路监测<span className="public-top-nav-badge">快照</span>
              </a>
              <a 
                className={`public-top-nav-link ${currentRoute === 'methodology' ? 'is-active' : ''}`} 
                href="/methodology" 
                onClick={(e) => handleNav('methodology', e)}
                data-client-nav="true"
              >
                测评方法
              </a>

              {/* Tools Item with Dropdown */}
              <span className="public-top-nav-item">
                <a 
                  className={`public-top-nav-link ${currentRoute === 'tools' ? 'is-active' : ''}`} 
                  href="/tools" 
                  aria-haspopup="true" 
                  data-client-nav="true"
                  onClick={(e) => handleToolNav('all', e)}
                >
                  工具
                </a>
                <span className="public-top-nav-submenu">
                  <a 
                    className="public-top-nav-submenu-link" 
                    href="/tools/download" 
                    onClick={(e) => handleToolNav('all', e)}
                    data-client-nav="true"
                  >
                    <span>翻墙工具下载</span>
                  </a>
                  <a 
                    className="public-top-nav-submenu-link" 
                    href="/tools/streaming-check" 
                    onClick={(e) => handleToolNav('streaming-check', e)}
                    data-client-nav="true"
                  >
                    <span>流媒体解锁检测</span>
                  </a>
                  <a 
                    className="public-top-nav-submenu-link" 
                    href="/tools/ip-check" 
                    onClick={(e) => handleToolNav('ip-check', e)}
                    data-client-nav="true"
                  >
                    <span>IP 检测</span>
                  </a>
                  <a 
                    className="public-top-nav-submenu-link" 
                    href="/tools/ip-purity-check" 
                    onClick={(e) => handleToolNav('ip-purity', e)}
                    data-client-nav="true"
                  >
                    <span>IP 纯净度检测</span>
                  </a>
                  <a 
                    className="public-top-nav-submenu-link" 
                    href="/tools/dns-leak-test" 
                    onClick={(e) => handleToolNav('dns-leak', e)}
                    data-client-nav="true"
                  >
                    <span>DNS 泄漏检测</span>
                  </a>
                </span>
              </span>
            </div>
          </div>

          <div className="public-top-nav-actions">
            <a 
              className="public-top-nav-apply" 
              href="/apply" 
              onClick={(e) => handleNav('apply', e)}
              data-client-nav="true"
            >
              <span className="public-top-nav-apply-long">申请入驻</span>
              <span className="public-top-nav-apply-short">申请入驻</span>
            </a>

            <details className="public-top-nav-mobile" open={mobileOpen} data-public-mobile-drawer="true">
              <summary 
                aria-label="打开主导航" 
                aria-haspopup="true"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(!mobileOpen);
                }}
              >
                {!mobileOpen ? (
                  <span className="public-top-nav-mobile-menu-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 7h16"></path>
                      <path d="M4 12h16"></path>
                      <path d="M4 17h16"></path>
                    </svg>
                  </span>
                ) : (
                  <span className="public-top-nav-mobile-close-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="m6 6 12 12"></path>
                      <path d="m18 6-12 12"></path>
                    </svg>
                  </span>
                )}
              </summary>

              {mobileOpen && (
                <div className="public-top-nav-mobile-panel">
                  <div className="public-top-nav-mobile-list">
                    <a className={`public-top-nav-mobile-link ${currentRoute === 'home' ? 'is-active' : ''}`} href="/" onClick={(e) => handleNav('home', e)} data-client-nav="true">
                      <span>首页</span>
                    </a>
                    <a className={`public-top-nav-mobile-link ${currentRoute === 'rankings' ? 'is-active' : ''}`} href="/rankings/all" onClick={(e) => handleNav('rankings', e)} data-client-nav="true">
                      <span>机场排行</span>
                    </a>
                    <a className={`public-top-nav-mobile-link ${currentRoute === 'deals' ? 'is-active' : ''}`} href="/deals" onClick={(e) => handleNav('deals', e)} data-client-nav="true">
                      <span>活动优惠</span>
                    </a>
                    <a className={`public-top-nav-mobile-link ${currentRoute === 'risk-monitor' ? 'is-active' : ''}`} href="/risk-monitor" onClick={(e) => handleNav('risk-monitor', e)} data-client-nav="true">
                      <span>跑路监测</span>
                      <span className="public-top-nav-badge">快照</span>
                    </a>
                    <a className={`public-top-nav-mobile-link ${currentRoute === 'methodology' ? 'is-active' : ''}`} href="/methodology" onClick={(e) => handleNav('methodology', e)} data-client-nav="true">
                      <span>测评方法</span>
                    </a>

                    <div className="public-top-nav-mobile-group">
                      <a className="public-top-nav-mobile-link" href="/tools" onClick={(e) => handleToolNav('all', e)} data-client-nav="true">
                        <span>工具</span>
                      </a>
                      <a className="public-top-nav-mobile-link public-top-nav-mobile-child" href="/tools/download" onClick={(e) => handleToolNav('all', e)} data-client-nav="true">
                        <span>翻墙工具下载</span>
                      </a>
                      <a className="public-top-nav-mobile-link public-top-nav-mobile-child" href="/tools/streaming-check" onClick={(e) => handleToolNav('streaming-check', e)} data-client-nav="true">
                        <span>流媒体解锁检测</span>
                      </a>
                      <a className="public-top-nav-mobile-link public-top-nav-mobile-child" href="/tools/ip-check" onClick={(e) => handleToolNav('ip-check', e)} data-client-nav="true">
                        <span>IP 检测</span>
                      </a>
                      <a className="public-top-nav-mobile-link public-top-nav-mobile-child" href="/tools/ip-purity-check" onClick={(e) => handleToolNav('ip-purity', e)} data-client-nav="true">
                        <span>IP 纯净度检测</span>
                      </a>
                      <a className="public-top-nav-mobile-link public-top-nav-mobile-child" href="/tools/dns-leak-test" onClick={(e) => handleToolNav('dns-leak', e)} data-client-nav="true">
                        <span>DNS 泄漏检测</span>
                      </a>
                    </div>

                    <a className="public-top-nav-mobile-link public-top-nav-mobile-apply" href="/apply" onClick={(e) => handleNav('apply', e)} data-client-nav="true">
                      申请入驻测试 
                      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6"></path>
                        <path d="M10 14 21 3"></path>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </details>
          </div>
        </div>
      </nav>
    </div>
  );
}
