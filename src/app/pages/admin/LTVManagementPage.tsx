"use client";

import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import LTVPolicyForm from '../../components/admin/LTVPolicyForm';
import AdminGuard from '../../components/admin/AdminGuard';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { LTVTier } from '../../types/admin';
import { mockLTVTiers } from '../../services/mockData';

/**
 * Admin LTV 정책 관리 페이지
 */
export default function LTVManagementPage() {
  const [tiers, setTiers] = useState<LTVTier[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock 데이터 로드
    setTimeout(() => {
      setTiers(mockLTVTiers);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <AdminGuard>
        <LoadingSpinner text="LTV 정책을 불러오는 중..." />
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="space-y-8">
        {/* 헤더 */}
        <div>
          <h1 className="text-3xl font-bold mb-2">LTV 정책 관리</h1>
          <p className="text-muted-foreground">
            가격 구간별 최대 대출 비율을 설정합니다
          </p>
        </div>

        {/* LTV 정책 폼 */}
        <Card className="p-6">
          <LTVPolicyForm
            initialTiers={tiers}
            onSave={(updatedTiers) => setTiers(updatedTiers)}
          />
        </Card>

        {/* 안내 */}
        <div className="bg-muted/30 p-4 rounded-lg text-sm">
          <p className="text-muted-foreground">
            💡 Tier는 가격 범위가 겹치지 않도록 설정해야 하며, 최소 1개 이상
            유지되어야 합니다.
          </p>
        </div>
      </div>
    </AdminGuard>
  );
}
