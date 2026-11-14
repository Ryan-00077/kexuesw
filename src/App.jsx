import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AirportModal from './components/AirportModal';

import HomeView from './views/HomeView';
import RankingsView from './views/RankingsView';
import DealsView from './views/DealsView';
import RiskMonitorView from './views/RiskMonitorView';
import MethodologyView from './views/MethodologyView';
import ToolsView from './views/ToolsView';
import NewsView from './views/NewsView';
import ReviewsView from './views/ReviewsView';
import ApplyView from './views/ApplyView';

import initialAirports from './data/airports.json';

// 首页与完整榜单共用这六家机场，按指定顺序展示。
const rankingAirportIds = [104, 106, 107, 105, 108, 103];
const airports = rankingAirportIds
  .map((id) => initialAirports.find((airport) => airport.airport_id === id))
  .filter(Boolean);

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedReviewAirport, setSelectedReviewAirport] = useState(null);
  const [toolsPlatform, setToolsPlatform] = useState('all');

  // Sync route with browser hash or history
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '');
      const rawPath = window.location.pathname.replace(/^\//, '');
      const current = rawHash || rawPath;

      if (current === 'ranking-transparency') {
        setCurrentRoute('methodology');
        return;
      }

      // 匹配 /go/:slug 外部官网直达跳转
      if (current.startsWith('go/')) {
        const slug = current.replace('go/', '');
        const goMap = {
          shenxing: 'https://wuhan01.shenxingaff.com/#/?code=WUQMrgI8',
          dalaoyun: 'https://fugui0077.dalaoyunaff.com/#/?code=Wpfk4XD5',
          shandianshu: 'https://fugui0077.shandianshuaff.com/#/?code=KSByEAn9',
          liulianyun: 'https://zyrrz.liulianyunaff.com/#/?code=Y6A1M1MN',
          huanqiuti: 'https://fugui0077.huanqiutiaff.com/#/?code=rJyQn4xG',
          yunjiexian: 'https://fugui0077.yunjiexianaff.com/#/?code=FVkiFyAx'
        };
        if (goMap[slug]) {
          window.location.replace(goMap[slug]);
          return;
        }
      }

      // 匹配机场测评专属路由，如 airports/shenxing
      if (current.startsWith('airports/')) {
        const slug = current.replace('airports/', '');
        const slugMap = {
          shenxing: 104,
          dalaoyun: 106,
          yunjiexian: 107,
          liulianyun: 105,
          shandianshu: 108,
          huanqiuti: 103
        };
        const targetId = slugMap[slug];
        const target = initialAirports.find(
          (a) => a.report_url === `/${current}` || a.report_url === `/${slug}` || (targetId && a.airport_id === targetId)
        );
        if (target) {
          setSelectedReviewAirport(target);
          setCurrentRoute('reviews');
          return;
        }
      }

      if (current) {
        if (current === 'home') {
          setCurrentRoute('home');
          return;
        }
        if (current.startsWith('rankings')) {
          setCurrentRoute('rankings');
          return;
        }
        if (current.startsWith('tools')) {
          setCurrentRoute('tools');
          return;
        }
        if (current.startsWith('news')) {
          setCurrentRoute('news');
          return;
        }
        if (['rankings', 'deals', 'risk-monitor', 'methodology', 'tools', 'news', 'reviews', 'apply'].includes(current)) {
          setCurrentRoute(current);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="page-shell">
      {/* Top Navbar */}
      <Navbar 
        currentRoute={currentRoute} 
        setCurrentRoute={setCurrentRoute} 
        onSelectArticle={setSelectedArticle}
        setToolsPlatform={setToolsPlatform}
      />

      {/* Main Routed View */}
      {currentRoute === 'home' && (
        <HomeView
          airports={airports}
          onSelectAirport={setSelectedAirport}
          onOpenReview={(airport) => {
            setSelectedReviewAirport(airport);
            setCurrentRoute('reviews');
            if (airport.report_url) {
              window.location.hash = `#${airport.report_url}`;
            }
          }}
          setCurrentRoute={setCurrentRoute}
          onSelectArticle={setSelectedArticle}
          setToolsPlatform={setToolsPlatform}
        />
      )}

      {currentRoute === 'rankings' && (
        <RankingsView
          airports={airports}
          onSelectAirport={setSelectedAirport}
          onOpenReview={(airport) => {
            setSelectedReviewAirport(airport);
            setCurrentRoute('reviews');
            if (airport.report_url) {
              window.location.hash = `#${airport.report_url}`;
            }
          }}
          setCurrentRoute={setCurrentRoute}
        />
      )}

      {currentRoute === 'deals' && (
        <DealsView setCurrentRoute={setCurrentRoute} />
      )}

      {currentRoute === 'risk-monitor' && (
        <RiskMonitorView 
          onSelectAirport={setSelectedAirport} 
          setCurrentRoute={setCurrentRoute}
        />
      )}

      {currentRoute === 'methodology' && (
        <MethodologyView setCurrentRoute={setCurrentRoute} />
      )}

      {currentRoute === 'tools' && (
        <ToolsView 
          setCurrentRoute={setCurrentRoute} 
          activePlatform={toolsPlatform}
          setActivePlatform={setToolsPlatform}
        />
      )}

      {currentRoute === 'news' && (
        <NewsView 
          setCurrentRoute={setCurrentRoute} 
          selectedArticle={selectedArticle}
          setSelectedArticle={setSelectedArticle}
        />
      )}

      {currentRoute === 'reviews' && (
        <ReviewsView
          airports={airports}
          allAirports={initialAirports}
          selectedAirport={selectedReviewAirport}
          onSelectAirport={(apt) => {
            setSelectedReviewAirport(apt);
            if (!apt) {
              window.location.hash = '#/reviews';
            } else if (apt.report_url) {
              window.location.hash = `#${apt.report_url}`;
            }
          }}
        />
      )}

      {currentRoute === 'apply' && (
        <ApplyView setCurrentRoute={setCurrentRoute} />
      )}

      {/* Footer */}
      <Footer 
        setCurrentRoute={setCurrentRoute} 
        onSelectArticle={setSelectedArticle}
        onSelectReview={setSelectedReviewAirport}
      />

      {/* Airport Details Modal */}
      <AirportModal 
        airport={selectedAirport} 
        onClose={() => setSelectedAirport(null)} 
      />
    </div>
  );
}
