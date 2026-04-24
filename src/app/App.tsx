"use client";

import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';
import DemoNav from './components/layout/DemoNav';

// B2C Pages
import HomePage from './pages/b2c/HomePage';
import SearchResultsPage from './pages/b2c/SearchResultsPage';
import ComparisonPage from './pages/b2c/ComparisonPage';
import ListingsPage from './pages/b2c/ListingsPage';

// B2B Pages
import ListingFormPage from './pages/b2b/ListingFormPage';
import BriefingPage from './pages/b2b/BriefingPage';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import LTVManagementPage from './pages/admin/LTVManagementPage';
import ListingManagementPage from './pages/admin/ListingManagementPage';
import LeadManagementPage from './pages/admin/LeadManagementPage';

type Route =
  | 'home'
  | 'search-results'
  | 'comparison'
  | 'listings'
  | 'b2b-listing-form'
  | 'b2b-briefing'
  | 'admin-dashboard'
  | 'admin-ltv'
  | 'admin-listings'
  | 'admin-leads';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [routeParams, setRouteParams] = useState<Record<string, any>>({});

  const navigate = (route: Route, params: Record<string, any> = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);

    // 페이지 이동 시 스크롤을 맨 위로
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // B2C Routes
  if (currentRoute === 'home') {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <HomePage onNavigate={navigate} />
        </main>
        <Footer />
        <DemoNav onNavigate={navigate} />
        <Toaster />
      </div>
    );
  }

  if (currentRoute === 'search-results') {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <SearchResultsPage budget={routeParams.budget || 50000000} onNavigate={navigate} />
        </main>
        <Footer />
        <DemoNav onNavigate={navigate} />
        <Toaster />
      </div>
    );
  }

  if (currentRoute === 'comparison') {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <ComparisonPage
            districtId={routeParams.districtId || 'dist-001'}
            budget={routeParams.budget}
            onNavigate={navigate}
          />
        </main>
        <Footer />
        <DemoNav onNavigate={navigate} />
        <Toaster />
      </div>
    );
  }

  if (currentRoute === 'listings') {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <ListingsPage districtId={routeParams.districtId || 'dist-001'} onNavigate={navigate} />
        </main>
        <Footer />
        <DemoNav onNavigate={navigate} />
        <Toaster />
      </div>
    );
  }

  // B2B Routes
  if (currentRoute === 'b2b-listing-form') {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <ListingFormPage />
        </main>
        <Footer />
        <DemoNav onNavigate={navigate} />
        <Toaster />
      </div>
    );
  }

  if (currentRoute === 'b2b-briefing') {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <BriefingPage listingId={routeParams.listingId} onNavigate={navigate} />
        </main>
        <Footer />
        <DemoNav onNavigate={navigate} />
        <Toaster />
      </div>
    );
  }

  // Admin Routes
  if (currentRoute.startsWith('admin-')) {
    return (
      <>
        <AdminLayout currentRoute={currentRoute} onNavigate={navigate}>
          {currentRoute === 'admin-dashboard' && <DashboardPage />}
          {currentRoute === 'admin-ltv' && <LTVManagementPage />}
          {currentRoute === 'admin-listings' && <ListingManagementPage />}
          {currentRoute === 'admin-leads' && <LeadManagementPage />}
        </AdminLayout>
        <DemoNav onNavigate={navigate} />
        <Toaster />
      </>
    );
  }

  return null;
}
