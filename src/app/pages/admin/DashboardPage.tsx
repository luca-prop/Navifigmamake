"use client";

import { useState, useEffect } from 'react';
import StatCard from '../../components/admin/StatCard';
import AdminGuard from '../../components/admin/AdminGuard';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { SystemStats } from '../../types/admin';
import { mockSystemStats } from '../../services/mockData';
import { formatDate } from '../../utils/formatters';
import { Building2, Package, CheckCircle, Clock, Bell } from 'lucide-react';

/**
 * Admin 메인 대시보드 페이지
 */
export default function DashboardPage() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock 데이터 로드
    setTimeout(() => {
      setStats(mockSystemStats);
      setIsLoading(false);
    }, 800);
  }, []);

  if (isLoading) {
    return (
      <AdminGuard>
        <LoadingSpinner text="시스템 현황을 불러오는 중..." />
      </AdminGuard>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <AdminGuard>
      <div className="space-y-8">
        {/* 헤더 */}
        <div>
          <h1 className="text-3xl font-bold mb-2">시스템 대시보드</h1>
          <p className="text-muted-foreground">
            재개발 구역 검색 서비스 관리 현황
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard
            title="총 구역 수"
            value={stats.total_districts}
            icon={Building2}
            change={stats.month_over_month.districts}
            changeLabel="지난달 대비"
          />

          <StatCard
            title="총 매물 수"
            value={stats.total_listings}
            icon={Package}
            change={stats.month_over_month.listings}
            changeLabel="지난달 대비"
          />

          <StatCard
            title="Verified 비율"
            value={`${stats.verified_ratio}%`}
            icon={CheckCircle}
          />

          <StatCard
            title="최근 동기화"
            value={formatDate(stats.last_sync)}
            icon={Clock}
          />

          <StatCard
            title="Lead 구독 수"
            value={stats.lead_subscriptions}
            icon={Bell}
            change={stats.month_over_month.leads}
            changeLabel="지난달 대비"
          />
        </div>

        {/* 추가 정보 */}
        <div className="bg-muted/30 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">시스템 정보</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">서비스 상태</p>
              <p className="font-semibold text-[--color-success-600]">정상 작동</p>
            </div>
            <div>
              <p className="text-muted-foreground">API 응답 시간</p>
              <p className="font-semibold">~250ms</p>
            </div>
            <div>
              <p className="text-muted-foreground">일일 방문자 수</p>
              <p className="font-semibold">1,247명</p>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
