"use client";

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import ApartmentCompareCard from '../../components/b2c/ApartmentCompareCard';
import ApartmentSwitchDialog from '../../components/b2c/ApartmentSwitchDialog';
import BudgetSlider from '../../components/b2c/BudgetSlider';
import DeepAnalysisReport from '../../components/b2c/DeepAnalysisReport';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { ComparisonData, ApartmentComparison } from '../../types/comparison';
import { mockApi } from '../../services/mockData';
import { useDebounce } from '../../hooks/useDebounce';
import {
  formatCurrencyWithUnit,
  getProjectStageLabel,
  getProjectStageBadgeColor,
} from '../../utils/formatters';
import { ArrowLeft, Info, AlertTriangle, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

interface ComparisonPageProps {
  districtId: string;
  budget?: number;
  onNavigate: (route: string, params?: Record<string, any>) => void;
}

/**
 * 1:1 대조 대시보드 페이지
 */
export default function ComparisonPage({
  districtId,
  budget: initialBudget,
  onNavigate,
}: ComparisonPageProps) {
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apartments, setApartments] = useState<ApartmentComparison[]>([]);
  const [budget, setBudget] = useState(initialBudget || 0);
  const [showReport, setShowReport] = useState(false);
  const [switchDialogOpen, setSwitchDialogOpen] = useState(false);
  const [switchingIndex, setSwitchingIndex] = useState<number>(0);

  const debouncedBudget = useDebounce(budget, 500);

  // 비교 데이터 로드
  useEffect(() => {
    const loadComparison = async () => {
      setIsLoading(true);
      try {
        const data = await mockApi.getComparisonData(districtId, debouncedBudget);
        setComparisonData(data);
        setApartments(data.apartments);
        if (!budget) {
          setBudget(data.district.estimated_investment_min);
        }
      } catch (error) {
        console.error('Failed to load comparison data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadComparison();
  }, [districtId, debouncedBudget]);

  const handleApartmentSwitch = (newApartment: ApartmentComparison) => {
    const updated = [...apartments];
    updated[switchingIndex] = newApartment;
    setApartments(updated);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <LoadingSpinner text="비교 데이터를 불러오는 중..." />
      </div>
    );
  }

  if (!comparisonData) {
    return null;
  }

  const { district, data_expansion_notice, budget_shortage, recommended_budget } = comparisonData;
  const stageBadgeColor = getProjectStageBadgeColor(district.project_stage);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => onNavigate('search-results', { budget })} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          검색 결과로 돌아가기
        </Button>

        <h1 className="text-3xl font-bold mb-2">재개발 vs 기축 아파트 비교</h1>
        <p className="text-muted-foreground">
          투자 구조를 비교하고 최적의 선택을 하세요
        </p>
      </div>

      {/* 알림 영역 */}
      <div className="space-y-4 mb-8">
        {/* 데이터 범위 확장 알림 */}
        {data_expansion_notice && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              ℹ️ {data_expansion_notice.original_region} 내 비교 데이터가 부족하여,
              인접 행정구({data_expansion_notice.expanded_region}) 기준으로
              산정되었습니다.
            </AlertDescription>
          </Alert>
        )}

        {/* 예산 부족 경고 */}
        {budget_shortage && recommended_budget && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="space-y-3">
              <p>
                ⚠️ 현재 가용 현금이 최소 진입 비용보다{' '}
                <span className="font-semibold">
                  {formatCurrencyWithUnit(budget_shortage)}
                </span>{' '}
                부족합니다.
              </p>
              <BudgetSlider
                currentBudget={budget}
                recommendedBudget={recommended_budget}
                onChange={setBudget}
              />
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* 비교 대시보드 */}
      <div className="grid lg:grid-cols-5 gap-8 mb-8">
        {/* 좌측: 재개발 구역 정보 (2/5) */}
        <div className="lg:col-span-2">
          <Card className="p-6 h-full">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{district.name}</h2>
                  <Badge className={stageBadgeColor}>
                    {getProjectStageLabel(district.project_stage)}
                  </Badge>
                </div>
              </div>

              {/* 주요 지표 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">비례율</p>
                  <p className="text-xl font-bold flex items-center gap-1">
                    <TrendingUp className="w-5 h-5 text-[--color-success-600]" />
                    {district.ratio}%
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">권리가액</p>
                  <p className="text-xl font-bold">
                    {formatCurrencyWithUnit(district.property_value)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">예상 추가 부담금</p>
                  <p className="text-lg font-semibold text-primary">
                    {formatCurrencyWithUnit(district.estimated_investment_min)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">입주 예정</p>
                  <p className="text-lg font-semibold">{district.expected_move_in}</p>
                </div>
              </div>

              {/* 잠재 미래 가치 */}
              {district.reference_complex && (
                <div className="bg-[--color-success-50] p-4 rounded-lg border border-[--color-success-500]">
                  <p className="text-sm text-[--color-success-600] font-medium mb-2">
                    잠재 미래 가치
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">참조 단지:</span>{' '}
                    {district.reference_complex}
                  </p>
                </div>
              )}

              {/* 매물 보기 버튼 */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onNavigate('listings', { districtId: district.id })}
              >
                이 구역 매물 보기
              </Button>
            </div>
          </Card>
        </div>

        {/* 우측: 기축 아파트 비교 (3/5) */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">기축 아파트 비교군</h2>
            <div className="grid gap-4">
              {apartments.map((apartment, index) => (
                <ApartmentCompareCard
                  key={apartment.id}
                  apartment={apartment}
                  onChangeClick={() => {
                    setSwitchingIndex(index);
                    setSwitchDialogOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 심층 분석 리포트 토글 */}
      <div className="space-y-4">
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => setShowReport(!showReport)}
        >
          {showReport ? (
            <>
              <ChevronUp className="w-5 h-5 mr-2" />
              심층 분석 리포트 닫기
            </>
          ) : (
            <>
              <ChevronDown className="w-5 h-5 mr-2" />
              📊 심층 분석 리포트 보기
            </>
          )}
        </Button>

        {showReport && <DeepAnalysisReport districtId={district.id} />}
      </div>

      {/* 아파트 변경 Dialog */}
      <ApartmentSwitchDialog
        open={switchDialogOpen}
        onOpenChange={setSwitchDialogOpen}
        currentApartment={apartments[switchingIndex]}
        onSelect={handleApartmentSwitch}
      />
    </div>
  );
}
