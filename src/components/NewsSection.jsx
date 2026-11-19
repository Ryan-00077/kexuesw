import React from 'react';
import newsData from '../data/news.json';
import { resolveAssetUrl } from '../utils/assetUrl';

export default function NewsSection({ setCurrentRoute, onSelectArticle }) {
  // 按文章更新/发布日期严格从新到旧倒序排列，并在首页展示前 4 篇
  const sortedNews = [...newsData]
    .sort((a, b) => new Date(b.updated_at || b.published_at) - new Date(a.updated_at || a.published_at))
    .slice(0, 4);

  return (
    <section id="announcement-dynamics-section" className="home-v3-latest-news" aria-labelledby="latest-news-title">
      <div className="home-v3-news-head">
        <h2 id="latest-news-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m3 11 18-5v12L3 14v-3z" />
            <path d="M7 15v5a1 1 0 0 1-3 0v-6" />
          </svg>
          最近新闻
        </h2>
        <a
          href="/news"
          onClick={(e) => {
            e.preventDefault();
            if (onSelectArticle) onSelectArticle(null);
            window.location.hash = '#/news';
            setCurrentRoute('news');
          }}
        >
          更多动态 <span aria-hidden="true">›</span>
        </a>
      </div>

      <ol className="home-v3-news">
        {sortedNews.map((item) => {
          const displayDate = (item.updated_at || item.published_at || '').split(' ')[0];
          return (
            <li key={item.id}>
              <a 
                href={item.href || `/news/${item.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (onSelectArticle) onSelectArticle(item);
                  window.location.hash = `#/news/${item.slug || item.id}`;
                  setCurrentRoute('news');
                }}
              >
                {item.cover_image_url && (
                  <span className="home-v3-news-thumb">
                    <img 
                      src={resolveAssetUrl(item.cover_image_url)} 
                      alt={item.title} 
                      width="112" 
                      height="80" 
                      loading="lazy" 
                      decoding="async" 
                    />
                  </span>
                )}
                <div className="home-v3-news-copy">
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </div>
                <time dateTime={item.updated_at || item.published_at}>
                  {displayDate}
                </time>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
