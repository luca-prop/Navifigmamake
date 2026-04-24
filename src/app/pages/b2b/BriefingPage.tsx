"use client";

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import BriefingView from '../../components/b2b/BriefingView';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { Listing } from '../../types/listing';
import { mockListings } from '../../services/mockData';
import { ArrowLeft } from 'lucide-react';

interface BriefingPageProps {
  listingId?: string;
  onNavigate?: (route: string) => void;
}

/**
 * B2B 고객 브리핑 페이지
 */
export default function BriefingPage({ listingId, onNavigate }: BriefingPageProps) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock 데이터 로드
    setTimeout(() => {
      const found =
        mockListings.find((l) => l.id === listingId) || mockListings[0];
      setListing(found);
      setIsLoading(false);
    }, 500);
  }, [listingId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="브리핑 자료를 준비하는 중..." />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">매물을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* 헤더 */}
        {onNavigate && (
          <Button variant="ghost" onClick={() => onNavigate('home')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            돌아가기
          </Button>
        )}

        <BriefingView listing={listing} />
      </div>
    </div>
  );
}
