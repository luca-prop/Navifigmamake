import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Listing } from '../../types/listing';
import { formatCurrencyWithUnit, formatDate } from '../../utils/formatters';
import { CheckCircle2, Eye } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  onViewDetails: () => void;
}

/**
 * 매물 카드 컴포넌트 (Verified/일반 구분)
 */
export default function ListingCard({ listing, onViewDetails }: ListingCardProps) {
  const isVerified = listing.is_verified;

  return (
    <Card
      className={`p-5 transition-all duration-200 hover:shadow-md ${
        isVerified
          ? 'border-2 border-[--color-success-500] bg-[--color-success-50]'
          : ''
      }`}
    >
      <div className="space-y-4">
        {/* 상단: Verified Badge */}
        {isVerified && (
          <div className="flex items-center justify-between">
            <Badge className="bg-[--color-success-100] text-[--color-success-600]">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              ✅ Verified
            </Badge>
            <p className="text-xs text-muted-foreground">중개사 인증</p>
          </div>
        )}

        {/* 매물 유형 */}
        <div className="flex items-center gap-2">
          <Badge variant="outline">{listing.type}</Badge>
          {listing.status === 'SOLD' && (
            <Badge variant="secondary">거래 완료</Badge>
          )}
        </div>

        {/* 호가 */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">호가</p>
          <p className="text-2xl font-bold text-primary">
            {formatCurrencyWithUnit(listing.asking_price)}
          </p>
        </div>

        {/* 프리미엄 */}
        {listing.premium && (
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">프리미엄</p>
            <p className="text-lg font-semibold">
              +{formatCurrencyWithUnit(listing.premium)}
            </p>
          </div>
        )}

        {/* 권리가액 */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">권리가액</p>
          <p className="text-lg font-semibold">
            {formatCurrencyWithUnit(listing.property_value)}
          </p>
        </div>

        {/* 등록일 */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>등록일</span>
          <span>{formatDate(listing.created_at)}</span>
        </div>

        {/* 상세 보기 버튼 */}
        <Button variant="ghost" className="w-full" onClick={onViewDetails}>
          <Eye className="w-4 h-4 mr-2" />
          상세 보기
        </Button>
      </div>
    </Card>
  );
}
