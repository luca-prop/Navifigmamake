import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Listing } from '../../types/listing';
import {
  formatCurrencyWithUnit,
  maskPhoneNumber,
  maskBuildingUnit,
} from '../../utils/formatters';
import { Presentation, Printer } from 'lucide-react';

interface BriefingViewProps {
  listing: Listing;
}

/**
 * B2B 고객 브리핑 모드 (Read-only, 마스킹 처리)
 */
export default function BriefingView({ listing }: BriefingViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* 상단 브리핑 모드 표시 */}
      <div className="flex items-center justify-between">
        <Badge className="bg-[--color-info-100] text-[--color-info-600] text-base px-4 py-2">
          <Presentation className="w-5 h-5 mr-2" />
          🎤 고객 브리핑 모드
        </Badge>
        <p className="text-sm text-muted-foreground">
          중개사 전용 정보는 마스킹 처리됩니다
        </p>
      </div>

      {/* 매물 정보 카드 */}
      <Card className="p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{listing.district_name}</h2>
            <Badge variant="outline" className="text-base">
              {listing.type}
            </Badge>
          </div>

          {/* 주요 정보 그리드 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">호가</p>
              <p className="text-3xl font-bold text-primary">
                {formatCurrencyWithUnit(listing.asking_price)}
              </p>
            </div>

            {listing.premium && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">프리미엄</p>
                <p className="text-2xl font-bold">
                  {formatCurrencyWithUnit(listing.premium)}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">권리가액</p>
              <p className="text-2xl font-bold">
                {formatCurrencyWithUnit(listing.property_value)}
              </p>
            </div>

            {/* 마스킹된 정보 */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">소유주 연락처</p>
              <p className="text-xl font-mono text-muted-foreground">
                {maskPhoneNumber(listing.owner_contact)}
              </p>
            </div>

            {listing.building_unit && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">동호수</p>
                <p className="text-xl font-mono text-muted-foreground">
                  {maskBuildingUnit()}
                </p>
              </div>
            )}
          </div>

          {listing.is_verified && (
            <div className="bg-[--color-success-50] p-4 rounded-lg border border-[--color-success-500]">
              <p className="text-sm font-medium text-[--color-success-600]">
                ✅ 중개사 인증 매물
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* 투자 시뮬레이션 영역 */}
      <Card className="p-8">
        <h3 className="text-xl font-bold mb-6">투자 시뮬레이션 (정확한 데이터 제공)</h3>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 좌측: 투자 구조 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">투자 구조</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">총 투자금</span>
                <span className="font-semibold">
                  {formatCurrencyWithUnit(
                    listing.asking_price + (listing.premium || 0)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">권리가액</span>
                <span className="font-semibold">
                  {formatCurrencyWithUnit(listing.property_value)}
                </span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-muted-foreground">예상 추가 부담금</span>
                <span className="font-bold text-primary">
                  {formatCurrencyWithUnit(
                    Math.max(0, listing.property_value - listing.asking_price)
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* 우측: 예상 수익률 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">예상 수익</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">현재 투자금</span>
                <span className="font-semibold">
                  {formatCurrencyWithUnit(listing.asking_price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">예상 완성 시세</span>
                <span className="font-semibold">
                  {formatCurrencyWithUnit(Math.floor(listing.property_value * 1.4))}
                </span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-muted-foreground">예상 수익</span>
                <span className="font-bold text-[--color-success-600]">
                  +
                  {formatCurrencyWithUnit(
                    Math.floor(listing.property_value * 1.4) -
                      listing.asking_price -
                      (listing.premium || 0)
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 인쇄 버튼 */}
        <div className="mt-8 pt-6 border-t">
          <Button onClick={handlePrint} variant="outline" className="w-full">
            <Printer className="w-4 h-4 mr-2" />
            인쇄하기
          </Button>
        </div>
      </Card>
    </div>
  );
}
