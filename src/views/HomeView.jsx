import React from 'react';
import Hero from '../components/Hero';
import RankingSection from '../components/RankingSection';
import SidebarExplore from '../components/SidebarExplore';
import ToolboxSection from '../components/ToolboxSection';
import NewsSection from '../components/NewsSection';
import TrustSection from '../components/TrustSection';
import FaqSection from '../components/FaqSection';

export default function HomeView({ airports, onSelectAirport, onOpenReview, setCurrentRoute, onSelectTag, onSelectArticle, setToolsPlatform }) {
  return (
    <main className="home-v3">
      {/* 1. Hero */}
      <Hero setCurrentRoute={setCurrentRoute} />

      {/* 2. Main content container */}
      <div className="home-v3-main">
        <div className="home-v3-columns">
          {/* Left Column: Ranking List */}
          <RankingSection 
            airports={airports} 
            onSelectAirport={onSelectAirport} 
            onOpenReview={onOpenReview}
            setCurrentRoute={setCurrentRoute} 
          />

          {/* Right Column: Sidebar (Explore + Network Toolbox) */}
          <aside className="home-v3-sidebar">
            <SidebarExplore setCurrentRoute={setCurrentRoute} />
            <ToolboxSection setCurrentRoute={setCurrentRoute} setToolsPlatform={setToolsPlatform} />
          </aside>
        </div>

        {/* 3. Latest News (Full width below the two-column section) */}
        <NewsSection setCurrentRoute={setCurrentRoute} onSelectArticle={onSelectArticle} />

        {/* 4. Trust & Philosophy */}
        <TrustSection 
          setCurrentRoute={setCurrentRoute} 
          onSelectTag={onSelectTag} 
        />

        {/* 5. FAQ & Buyer's Guide */}
        <FaqSection />
      </div>
    </main>
  );
}
