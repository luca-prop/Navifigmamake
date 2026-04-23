"use client";

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';
import ListingCard from '../../components/b2c/ListingCard';
import ContactRequestDialog from '../../components/b2c/ContactRequestDialog';
import EmptyState from '../../components/shared/EmptyState';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { usePagination } from '../../hooks/usePagination';
import { useToast } from '../../hooks/useToast';
import { Listing } from '../../types/listing';
import { mockApi } from '../../services/mockData';
import { ArrowLeft } from 'lucide-react';

interface ListingsPageProps {
  districtId: string;
  onNavigate: (route: string, params?: Record<string, any>) => void;
}

/**
 * 구역별 매물 리스트 페이지
 */
export default function ListingsPage({ districtId, onNavigate }: ListingsPageProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [sortedListings, setSortedListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>('latest');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { success } = useToast();

  const { currentItems, currentPage, totalPages, goToPage, hasNextPage, hasPrevPage } =
    usePagination(sortedListings, 10);

  // 매물 데이터 로드
  useEffect(() => {
    const loadListings = async () => {
      setIsLoading(true);
      try {
        const data = await mockApi.getListingsByDistrict(districtId);
        setListings(data);
        setSortedListings(data);
      } catch (error) {
        console.error('Failed to load listings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadListings();
  }, [districtId]);

  // 정렬 처리
  useEffect(() => {
    let sorted = [...listings];

    switch (sortBy) {
      case 'latest':
        sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.asking_price - b.asking_price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.asking_price - a.asking_price);
        break;
    }

    setSortedListings(sorted);
  }, [listings, sortBy]);

  const handleContactRequest = (email: string) => {
    // Mock API 호출
    success('요청이 접수되었습니다. 이메일을 확인해주세요.');
    setDialogOpen(false);
  };

  const districtName = listings.length > 0 ? listings[0].district_name : '구역';

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('search-results')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {districtName} - 매물 리스트
            </h1>
            <p className="text-muted-foreground">
              총 <span className="font-semibold text-primary">{listings.length}개</span>{' '}
              매물
            </p>
          </div>

          {/* 정렬 옵션 */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="price-asc">가격 낮은순</SelectItem>
              <SelectItem value="price-desc">가격 높은순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 로딩 상태 */}
      {isLoading && <LoadingSpinner text="매물 정보를 불러오는 중..." />}

      {/* 매물 리스트 */}
      {!isLoading && sortedListings.length > 0 && (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {currentItems.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onViewDetails={() => {
                  setSelectedListing(listing);
                  setDialogOpen(true);
                }}
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
      {!isLoading && sortedListings.length === 0 && (
        <EmptyState
          title="이 구역에는 아직 등록된 매물이 없습니다"
          description="관심 구역으로 등록하고 매물이 올라오면 알림을 받아보세요."
          primaryAction={{
            label: '관심 구역 알림 신청',
            onClick: () => success('알림이 설정되었습니다'),
          }}
          secondaryAction={{
            label: '다른 구역 보기',
            onClick: () => onNavigate('search-results'),
          }}
        />
      )}

      {/* 연락처 요청 Dialog */}
      {selectedListing && (
        <ContactRequestDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          listing={selectedListing}
          onSubmit={handleContactRequest}
        />
      )}
    </div>
  );
}
