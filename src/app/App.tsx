"use client";

import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import Footer from './components/layout/Footer';

// B2C Pages
import HomePage from './pages/b2c/HomePage';
import SearchResultsPage from './pages/b2c/SearchResultsPage';
import ComparisonPage from './pages/b2c/ComparisonPage';
import ListingsPage from './pages/b2c/ListingsPage';

type Route =
  | 'home'
  | 'search-results'
  | 'comparison'
  | 'listings';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [routeParams, setRouteParams] = useState<Record<string, any>>({});

  const navigate = (route: Route, params: Record<string, any> = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);

    // 페이지 이동 시 스크롤을 맨 위로
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* B2C Routes */}
        {currentRoute === 'home' && (
          <HomePage onNavigate={navigate} />
        )}

        {currentRoute === 'search-results' && (
          <SearchResultsPage
            budget={routeParams.budget || 0}
            onNavigate={navigate}
          />
        )}

        {currentRoute === 'comparison' && (
          <ComparisonPage
            districtId={routeParams.districtId}
            budget={routeParams.budget}
            onNavigate={navigate}
          />
        )}

        {currentRoute === 'listings' && (
          <ListingsPage
            districtId={routeParams.districtId}
            onNavigate={navigate}
          />
        )}
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}
