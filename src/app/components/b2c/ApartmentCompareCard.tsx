import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { ApartmentComparison } from '../../types/comparison';
import {
  formatCurrencyWithUnit,
  formatDate,
  getRecoveryRateBadge,
} from '../../utils/formatters';
import { Building2, TrendingUp, RefreshCw } from 'lucide-react';

interface ApartmentCompareCardProps {
  apartment: ApartmentComparison;
  onChangeClick?: () => void;
}

/**
 * 기축 아파트 비교 카드 컴포넌트
 */
export default function ApartmentCompareCard({
  apartment,
  onChangeClick,
}: ApartmentCompareCardProps) {
  const recoveryBadge = getRecoveryRateBadge(apartment.recovery_rate);

  return (
    <Card className="p-5 relative">
      {/* 변경 버튼 */}
      {onChangeClick && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3"
          onClick={onChangeClick}
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          변경
        </Button>
      )}

      <div className="space-y-4 pr-16">
        {/* 아파트명 */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">{apartment.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{apartment.building_type}</p>
        </div>

        {/* 최신 실거래가 */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">최신 실거래가</p>
          <p className="text-lg font-bold text-primary">
            {formatCurrencyWithUnit(apartment.latest_transaction_price)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDate(apartment.latest_transaction_date)} 기준
          </p>
        </div>

        {/* 전고점 데이터 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">전고점 대비</span>
            <span className="font-semibold">
              {formatCurrencyWithUnit(apartment.peak_price)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDate(apartment.peak_date)} 전고점
          </p>
        </div>

        {/* 회복률 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              회복률
            </span>
            <Badge className={recoveryBadge.color}>{recoveryBadge.label}</Badge>
          </div>
          <Progress value={apartment.recovery_rate} className="h-2" />
          <p className="text-right text-sm font-semibold">{apartment.recovery_rate}%</p>
        </div>
      </div>
    </Card>
  );
}
