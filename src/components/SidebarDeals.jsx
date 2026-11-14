import React from 'react';
import dealsData from '../data/deals.json';

export default function SidebarDeals({ setCurrentRoute }) {
  const gradients = [
    'linear-gradient(135deg,hsl(200 80% 50%),hsl(220 85% 40%))',
    'linear-gradient(135deg,hsl(238 72% 56%),hsl(268 72% 44%))',
    'linear-gradient(135deg,hsl(140 70% 45%),hsl(160 80% 35%))'
  ];

  return (
    <section className="home-v3-sponsored" aria-labelledby="home-v3-sponsored-title">
      <div className="home-v3-section-head">
        <div>
          <span>Sponsored discovery</span>
          <h2 id="home-v3-sponsored-title">商业合作专区</h2>
          <p>广告仅提供曝光，不参与评分与排名 · 当前 {dealsData.length} 个有效活动</p>
        </div>
        <a 
          href="/deals"
          onClick={(e) => {
            e.preventDefault();
            setCurrentRoute('deals');
          }}
        >
          全部优惠 →
        </a>
      </div>

      <div className="home-v3-deal-grid">
        {dealsData.map((deal, idx) => {
          const initialChar = deal.name ? deal.name.charAt(0) : '商';
          const bgGrad = gradients[idx % gradients.length];

          return (
            <a
              key={deal.campaign_id || idx}
              className="home-v3-deal"
              href={deal.website}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              aria-label={`访问 ${deal.name} 官网（新标签页）`}
              data-marketing-placement="deal_card"
              data-airport-id={deal.airport_id}
            >
              <div className="home-v3-deal-top">
                <span
                  className="home-v3-airport-mark"
                  style={{ background: bgGrad }}
                  aria-hidden="true"
                >
                  {initialChar}
                </span>
                <div>
                  <h3>{deal.name}</h3>
                  <small>优惠码：{deal.code}</small>
                </div>
              </div>

              <div className="home-v3-deal-offer">
                <p>{deal.discount_title}</p>
              </div>
            </a>
          );
        })}

      </div>
    </section>
  );
}
