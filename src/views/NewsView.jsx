import React, { useState, useMemo } from 'react';
import newsData from '../data/news.json';
import { resolveAssetUrl } from '../utils/assetUrl';

export default function NewsView({ selectedArticle: externalSelectedArticle, setSelectedArticle: setExternalSelectedArticle }) {
  const [internalSelectedArticle, setInternalSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedArticle = externalSelectedArticle !== undefined ? externalSelectedArticle : internalSelectedArticle;
  const setSelectedArticle = setExternalSelectedArticle || setInternalSelectedArticle;

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'tech-trends', name: '技术动态' },
    { id: 'client-protocols', name: '客户端协议' },
    { id: 'tutorials', name: '使用教程' },
    { id: 'risk-warning', name: '风险预警' }
  ];

  // 所有文章按日期（更新日期/发布日期）严格从新到旧倒序排序
  const sortedArticles = useMemo(() => {
    return [...newsData].sort((a, b) => {
      const dateA = new Date(a.updated_at || a.published_at);
      const dateB = new Date(b.updated_at || b.published_at);
      return dateB - dateA;
    });
  }, []);

  const filteredArticles = useMemo(() => {
    return sortedArticles.filter(a => {
      if (activeCategory !== 'all' && a.category !== activeCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        return (
          a.title.toLowerCase().includes(q) || 
          (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
          (a.categoryName && a.categoryName.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [sortedArticles, activeCategory, searchQuery]);

  const currentFeatured = filteredArticles[0] || null;
  const sideArticles = filteredArticles.slice(1);

  // 计算文章纯文字字数
  const getWordCount = (article) => {
    if (!article) return 0;
    let len = (article.excerpt || '').length;
    (article.content || []).forEach(b => {
      if (b.text) len += b.text.length;
      if (b.code) len += b.code.length;
      if (b.items) len += b.items.join('').length;
    });
    return len;
  };

  // 文章深度阅读视图
  if (selectedArticle) {
    const displayDate = (selectedArticle.updated_at || selectedArticle.published_at || '').split(' ')[0];
    const wordCount = getWordCount(selectedArticle);

    return (
      <main className="main-wrap" style={{ padding: '36px 16px 80px', maxWidth: '880px', margin: '0 auto' }}>
        {/* 返回按钮 */}
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            setSelectedArticle(null);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563eb',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: '22px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          返回资讯中心
        </button>

        {/* 头部信息 */}
        <header style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ 
              display: 'inline-block',
              padding: '4px 12px',
              backgroundColor: selectedArticle.category === 'risk-warning' ? '#fee2e2' : selectedArticle.category === 'tutorials' ? '#dcfce7' : selectedArticle.category === 'tech-trends' ? '#f3e8ff' : '#e0f2fe',
              color: selectedArticle.category === 'risk-warning' ? '#dc2626' : selectedArticle.category === 'tutorials' ? '#15803d' : selectedArticle.category === 'tech-trends' ? '#7e22ce' : '#0369a1',
              fontSize: '12px',
              fontWeight: 800,
              borderRadius: '999px',
              letterSpacing: '0.04em'
            }}>
              {selectedArticle.categoryName || '资讯动态'}
            </span>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>
              更新日期：{displayDate}
            </span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(26px, 3.5vw, 36px)', 
            fontWeight: 900, 
            color: '#111827', 
            lineHeight: 1.32, 
            margin: '0 0 16px 0',
            letterSpacing: '-0.02em'
          }}>
            {selectedArticle.title}
          </h1>

          <div style={{ 
            fontSize: '13px', 
            color: '#6b7280', 
            display: 'flex', 
            gap: '16px', 
            alignItems: 'center',
            flexWrap: 'wrap',
            paddingBottom: '18px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <span>来源：科学上网 · Node 评测实验室</span>
            <span>·</span>
            <span>{selectedArticle.reads || '浏览 1,280 次'}</span>
            <span>·</span>
            <span>{selectedArticle.time || '12 min read'}</span>
            <span>·</span>
            <span style={{ color: '#059669', fontWeight: 700 }}>全文约 {wordCount.toLocaleString()} 字</span>
          </div>
        </header>

        {/* 封面图 */}
        {selectedArticle.cover_image_url && (
          <div style={{ 
            width: '100%', 
            aspectRatio: '16 / 9',
            borderRadius: '20px', 
            overflow: 'hidden', 
            marginBottom: '32px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.06)'
          }}>
            <img 
              src={resolveAssetUrl(selectedArticle.cover_image_url)} 
              alt={selectedArticle.title} 
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} 
            />
          </div>
        )}

        {/* 正文卡片 */}
        <article className="article-shell" style={{ 
          background: '#ffffff', 
          borderRadius: '24px', 
          border: '1px solid rgba(17,17,17,0.1)', 
          overflow: 'hidden', 
          boxShadow: '0 18px 50px rgba(17,17,17,0.04)',
          padding: '40px 48px'
        }}>
          <div className="news-body" style={{ maxWidth: '100%' }}>
            {Array.isArray(selectedArticle.content) && selectedArticle.content.length > 0 ? (
              selectedArticle.content.map((block, idx) => {
                switch (block.type) {
                  case 'lead':
                    return (
                      <p 
                        key={idx} 
                        className="article-standfirst" 
                        style={{ 
                          fontSize: '17px', 
                          lineHeight: 1.85, 
                          color: '#1f2937', 
                          fontWeight: 500,
                          backgroundColor: '#f8fafc',
                          padding: '20px 24px',
                          borderRadius: '14px',
                          borderLeft: '4px solid #2563eb',
                          marginBottom: '28px'
                        }}
                      >
                        {block.text}
                      </p>
                    );
                  case 'h2':
                    return (
                      <h2 
                        key={idx} 
                        className="news-heading news-heading-2" 
                        style={{ 
                          fontSize: '22px', 
                          fontWeight: 800, 
                          color: '#111827', 
                          margin: '36px 0 16px',
                          paddingBottom: '8px',
                          borderBottom: '1px solid #f1f5f9',
                          letterSpacing: '-0.015em'
                        }}
                      >
                        {block.text}
                      </h2>
                    );
                  case 'h3':
                    return (
                      <h3 
                        key={idx} 
                        className="news-heading news-heading-3" 
                        style={{ 
                          fontSize: '18px', 
                          fontWeight: 700, 
                          color: '#111827', 
                          margin: '24px 0 12px' 
                        }}
                      >
                        {block.text}
                      </h3>
                    );
                  case 'p':
                    return (
                      <p 
                        key={idx} 
                        className="news-paragraph" 
                        style={{ 
                          fontSize: '16px', 
                          lineHeight: 1.9, 
                          color: '#374151', 
                          marginBottom: '18px' 
                        }}
                      >
                        {block.text}
                      </p>
                    );
                  case 'list':
                    return (
                      <ul 
                        key={idx} 
                        className="news-list" 
                        style={{ 
                          margin: '0 0 22px', 
                          paddingLeft: '24px', 
                          fontSize: '15px', 
                          lineHeight: 1.85, 
                          color: '#374151' 
                        }}
                      >
                        {block.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="news-list-item" style={{ marginBottom: '10px' }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  case 'blockquote':
                    return (
                      <blockquote 
                        key={idx} 
                        className="news-blockquote" 
                        style={{ 
                          margin: '26px 0', 
                          padding: '16px 22px', 
                          borderLeft: '4px solid #c93a2e', 
                          backgroundColor: '#fef2f2', 
                          borderRadius: '0 14px 14px 0', 
                          fontSize: '15px', 
                          lineHeight: 1.8, 
                          color: '#4b5563', 
                          fontStyle: 'italic' 
                        }}
                      >
                        {block.text}
                      </blockquote>
                    );
                  case 'code':
                    return (
                      <pre 
                        key={idx} 
                        className="news-code-block" 
                        style={{ 
                          margin: '22px 0', 
                          padding: '20px 24px', 
                          backgroundColor: '#0f172a', 
                          color: '#f8fafc', 
                          borderRadius: '16px', 
                          overflowX: 'auto', 
                          fontSize: '13.5px', 
                          lineHeight: 1.65, 
                          fontFamily: 'Consolas, Monaco, "Courier New", monospace' 
                        }}
                      >
                        <code className="news-code">{block.code}</code>
                      </pre>
                    );
                  default:
                    return null;
                }
              })
            ) : (
              <p className="news-paragraph" style={{ fontSize: '16px', lineHeight: 1.85, color: '#374151' }}>
                {selectedArticle.excerpt}
              </p>
            )}
          </div>

          {/* 文章底部免责与导航 */}
          <div style={{ 
            marginTop: '44px', 
            paddingTop: '24px', 
            borderTop: '1px solid #e5e7eb', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '16px' 
          }}>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>
              本文由 <strong>科学上网 · Node</strong> 技术团队采写发布，仅供网络科研与工程调优参考。
            </span>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setSelectedArticle(null);
              }}
              style={{
                padding: '9px 20px',
                backgroundColor: '#111827',
                color: '#ffffff',
                border: 'none',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              返回文章列表 ↑
            </button>
          </div>
        </article>
      </main>
    );
  }

  // 资讯列表主视图
  return (
    <main className="main-wrap" style={{ paddingBottom: '60px' }}>
      {/* Intro & Search */}
      <section className="news-portal-intro">
        <div className="eyebrow">Node Newsroom</div>
        <h1 className="news-index-title">科学上网 · Node 资讯中心：技术动态、节点评测与工具指南</h1>
        <form 
          className="news-search-form" 
          onSubmit={(e) => e.preventDefault()} 
          role="search"
        >
          <input 
            className="news-search-input" 
            type="search" 
            placeholder="搜索：技术动态 / 客户端协议 / 使用教程 / 风险预警 / PassWall / 专线解析"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="news-search-button" type="submit">搜索</button>
        </form>

        {/* Categories Nav */}
        <nav className="news-category-nav" aria-label="资讯分类">
          {categories.map(c => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={activeCategory === c.id ? 'is-active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setActiveCategory(c.id);
              }}
            >
              {c.name}
            </a>
          ))}
        </nav>
      </section>

      {/* Featured Articles Section */}
      {currentFeatured ? (
        <>
          <section className="news-hub-grid" style={{ marginTop: '24px' }}>
            {/* Featured Story */}
            <article 
              className="hero-card" 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                setSelectedArticle(currentFeatured);
              }} 
              style={{ cursor: 'pointer' }}
            >
              <div className="hero-copy">
                <div>
                  <div className="eyebrow">
                    {activeCategory === 'all' ? 'Featured Story' : currentFeatured.categoryName}
                  </div>
                  <h3 className="hero-title">
                    <a>{currentFeatured.title}</a>
                  </h3>
                  <p className="hero-summary">{currentFeatured.excerpt}</p>
                  <div className="article-taxonomy">
                    <span className="news-taxonomy-chip">{currentFeatured.categoryName}</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gap: '18px' }}>
                  <div className="hero-meta">
                    <span>{(currentFeatured.updated_at || currentFeatured.published_at || '').split(' ')[0]}</span>
                    <span>{currentFeatured.reads}</span>
                    <span>{currentFeatured.time}</span>
                  </div>
                  <span className="hero-cta">阅读全文</span>
                </div>
              </div>
              <div className="hero-cover">
                <img 
                  src={resolveAssetUrl(currentFeatured.cover_image_url)} 
                  alt={currentFeatured.title} 
                  loading="eager" 
                  decoding="async" 
                  width="1280" 
                  height="720" 
                />
              </div>
            </article>

            {/* Side Stack */}
            <div className="news-side-stack">
              {sideArticles.length > 0 ? (
                <>
                  <section className="news-panel">
                    <p className="section-label">
                      {activeCategory === 'all' ? '最新动态' : `${currentFeatured.categoryName} 最新`}
                    </p>
                    <div className="news-panel-list">
                      {sideArticles.slice(0, 2).map(art => (
                        <a 
                          key={art.id}
                          className="news-panel-link" 
                          onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'instant' });
                            setSelectedArticle(art);
                          }}
                        >
                          <h3 className="news-panel-title">{art.title}</h3>
                          <span className="news-panel-meta">
                            {art.categoryName} · {(art.updated_at || art.published_at || '').split(' ')[0]} · {art.reads}
                          </span>
                        </a>
                      ))}
                    </div>
                  </section>

                  {sideArticles.length > 2 && (
                    <section className="news-panel">
                      <p className="section-label">重点推荐</p>
                      <div className="news-panel-list">
                        {sideArticles.slice(2, 4).map(art => (
                          <a 
                            key={art.id}
                            className="news-panel-link" 
                            onClick={(e) => {
                              e.preventDefault();
                              window.scrollTo({ top: 0, behavior: 'instant' });
                              setSelectedArticle(art);
                            }}
                          >
                            <h3 className="news-panel-title">{art.title}</h3>
                            <span className="news-panel-meta">
                              {art.categoryName} · {(art.updated_at || art.published_at || '').split(' ')[0]} · {art.reads}
                            </span>
                          </a>
                        ))}
                      </div>
                    </section>
                  )}
                </>
              ) : (
                <section className="news-panel">
                  <p className="section-label">热点聚焦</p>
                  <div style={{ padding: '24px', fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
                    当前分类精选内容已集中展现在左侧头条，更多专题与测评动态将随测速探测定期同步更新。
                  </div>
                </section>
              )}
            </div>
          </section>

          {/* 全部分类文章列表 */}
          <section style={{ marginTop: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0 }}>
                {activeCategory === 'all' ? '全部文章与深度指南' : `${categories.find(c => c.id === activeCategory)?.name || ''} 专题列表`}
              </h2>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>
                共 {filteredArticles.length} 篇深度长文
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
              {filteredArticles.map(art => {
                const words = getWordCount(art);
                return (
                  <article 
                    key={art.id}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'instant' });
                      setSelectedArticle(art);
                    }}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(17,17,17,0.1)',
                      borderRadius: '18px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '16px',
                      cursor: 'pointer',
                      transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.06)';
                      e.currentTarget.style.borderColor = 'rgba(17,17,17,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(17,17,17,0.1)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 9px',
                          borderRadius: '999px',
                          backgroundColor: art.category === 'risk-warning' ? '#fee2e2' : art.category === 'tutorials' ? '#dcfce7' : art.category === 'tech-trends' ? '#f3e8ff' : '#e0f2fe',
                          color: art.category === 'risk-warning' ? '#dc2626' : art.category === 'tutorials' ? '#15803d' : art.category === 'tech-trends' ? '#7e22ce' : '#0369a1'
                        }}>
                          {art.categoryName}
                        </span>
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                          {(art.updated_at || art.published_at || '').split(' ')[0]}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: '#111827', lineHeight: 1.45, margin: '0 0 10px 0' }}>
                        {art.title}
                      </h3>

                      <p style={{ 
                        fontSize: '13.5px', 
                        lineHeight: 1.6, 
                        color: '#4b5563', 
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {art.excerpt}
                      </p>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      paddingTop: '14px', 
                      borderTop: '1px solid #f3f4f6',
                      fontSize: '12.5px',
                      color: '#6b7280'
                    }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span>{art.time}</span>
                        <span>·</span>
                        <span style={{ color: '#059669', fontWeight: 700 }}>{words.toLocaleString()} 字</span>
                      </div>
                      <span style={{ color: '#2563eb', fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}>
                        阅读全文
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
          <p style={{ fontSize: '16px' }}>未找到相关文章，可尝试搜索其他关键词</p>
        </div>
      )}
    </main>
  );
}
