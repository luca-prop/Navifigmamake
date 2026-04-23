"use client";

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import DistrictCard from '../../components/b2c/DistrictCard';
import DataSyncAlert from '../../components/shared/DataSyncAlert';
import EmptyState from '../../components/shared/EmptyState';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { usePagination } from '../../hooks/usePagination';
import { useToast } from '../../hooks/useToast';
import { validateEmail } from '../../utils/validators';
import { formatCurrency } from '../../utils/formatters';
import { District } from '../../types/district';
import { mockApi } from '../../services/mockData';
import { ArrowLeft, Bell } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';

interface SearchResultsPageProps {
  budget: number;
  onNavigate: (route: string, params?: Record<string, any>) => void;
}

/**
 * 구역 검색 결과 페이지
 */
export default function SearchResultsPage({ budget, onNavigate }: SearchResultsPageProps) {
  const [districts, setDistricts] = useState<District[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeadDialog, setShowLeadDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { success } = useToast();

  const { currentItems, currentPage, totalPages, goToPage, hasNextPage, hasPrevPage } =
    usePagination(districts, 10);

  // 검색 데이터 로드
  useEffect(() => {
    const loadDistricts = async () => {
      setIsLoading(true);
      try {
        const results = await mockApi.searchDistricts(budget);
        setDistricts(results);
      } catch (error) {
        console.error('Failed to load districts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDistricts();
  }, [budget]);

  // Lead 알림 신청
  const handleLeadSubmit = () => {
    const validation = validateEmail(email);
    if (!validation.valid) {
      setEmailError(validation.error || '');
      return;
    }

    // Mock API 호출 (실제로는 서버에 전송)
    success('알림이 설정되었습니다. 이메일을 확인해주세요.');
    setShowLeadDialog(false);
    setEmail('');
    setEmailError('');
  };

  // 데이터 신선도 체크 (가장 오래된 데이터 기준)
  const oldestSyncDate = districts.length > 0
    ? districts.reduce((oldest, d) =>
        new Date(d.last_synced_at) < new Date(oldest) ? d.last_synced_at : oldest,
      districts[0].last_synced_at)
    : '';

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>

        <h1 className="text-3xl font-bold mb-2">검색 결과</h1>
        <p className="text-muted-foreground">
          예산 <span className="font-semibold text-foreground">{formatCurrency(budget)}원</span>{' '}
          기준으로 총 <span className="font-semibold text-primary">{districts.length}개</span>{' '}
          구역이 검색되었습니다
        </p>
      </div>

      {/* 데이터 신선도 경고 */}
      {oldestSyncDate && <DataSyncAlert lastSyncedAt={oldestSyncDate} />}

      {/* 로딩 상태 */}
      {isLoading && <LoadingSpinner text="구역 정보를 불러오는 중..." />}

      {/* 검색 결과 */}
      {!isLoading && districts.length > 0 && (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {currentItems.map((district) => (
              <DistrictCard
                key={district.id}
                district={district}
                onClick={() => onNavigate('comparison', { districtId: district.id, budget })}
              />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => hasPrevPage && goToPage(currentPage - 1)}
                    className={!hasPrevPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => goToPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => hasNextPage && goToPage(currentPage + 1)}
                    className={!hasNextPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      {/* Empty State */}
      {!isLoading && districts.length === 0 && (
        <EmptyState
          title="현재 예산 범위 내 진입 가능한 구역이 없습니다"
          description="예산을 조정하거나 알림을 설정해보세요."
          primaryAction={{
            label: '예산 내 매물 출현 시 알림 받기',
            onClick: () => setShowLeadDialog(true),
          }}
          secondaryAction={{
            label: '예산 수정하기',
            onClick: () => onNavigate('home'),
          }}
        />
      )}

      {/* Lead 알림 신청 Dialog */}
      <Dialog open={showLeadDialog} onOpenChange={setShowLeadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              예산 내 매물 알림 신청
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              예산 범위 내 매물이 등록되면 이메일로 알려드립니다.
            </p>

            <div className="space-y-2">
              <Label>이메일 주소</Label>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
              />
              {emailError && (
                <p className="text-sm text-destructive">{emailError}</p>
              )}
            </div>

            <div className="bg-muted/50 p-3 rounded-lg text-sm">
              <p className="font-medium mb-1">알림 조건</p>
              <p className="text-muted-foreground">
                예산: {formatCurrency(budget)}원
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowLeadDialog(false)} className="flex-1">
              취소
            </Button>
            <Button onClick={handleLeadSubmit} className="flex-1">
              알림 신청
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
