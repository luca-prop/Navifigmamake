import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { District } from '../../types/district';
import {
  formatCurrencyWithUnit,
  getProjectStageLabel,
  getProjectStageBadgeColor,
  getMatchingScoreColor,
} from '../../utils/formatters';
import { MapPin, TrendingUp } from 'lucide-react';

interface DistrictCardProps {
  district: District;
  onClick?: () => void;
}

/**
 * 구역 검색 결과 카드 컴포넌트
 */
export default function DistrictCard({ district, onClick }: DistrictCardProps) {
  const stageBadgeColor = getProjectStageBadgeColor(district.project_stage);
  const scoreColor = getMatchingScoreColor(district.matching_score);

  return (
    <Card
      className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* 헤더 */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{district.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {district.administrative_region}
            </div>
          </div>
          <Badge className={stageBadgeColor}>
            {getProjectStageLabel(district.project_stage)}
          </Badge>
        </div>

        {/* 예상 실투자금 */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">예상 실투자금 범위</p>
          <p className="text-lg font-bold text-primary">
            {formatCurrencyWithUnit(district.estimated_investment_min)} ~{' '}
            {formatCurrencyWithUnit(district.estimated_investment_max)}
          </p>
        </div>

        {/* 추가 정보 */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">비례율</p>
            <p className="font-semibold flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-[--color-success-600]" />
              {district.ratio}%
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">권리가액</p>
            <p className="font-semibold">
              {formatCurrencyWithUnit(district.property_value)}
            </p>
          </div>
        </div>

        {/* 참조 단지 */}
        {district.reference_complex && (
          <div className="text-sm">
            <p className="text-muted-foreground">참조 단지</p>
            <p className="font-medium">{district.reference_complex}</p>
          </div>
        )}

        {/* 매칭 적합도 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">매칭 적합도</span>
            <span className="font-semibold">{district.matching_score}%</span>
          </div>
          <Progress value={district.matching_score} className={scoreColor} />
        </div>
      </div>
    </Card>
  );
}
