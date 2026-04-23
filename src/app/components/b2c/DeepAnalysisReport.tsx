"use client";

import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { InvestmentAnalysis } from '../../types/comparison';
import { formatCurrencyWithUnit } from '../../utils/formatters';
import { mockApi } from '../../services/mockData';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';

interface DeepAnalysisReportProps {
  districtId: string;
}

/**
 * 심층 분석 리포트 컴포넌트
 */
export default function DeepAnalysisReport({ districtId }: DeepAnalysisReportProps) {
  const [analysis, setAnalysis] = useState<InvestmentAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalysis = async () => {
      setIsLoading(true);
      try {
        const data = await mockApi.getInvestmentAnalysis(districtId);
        setAnalysis(data);
      } catch (error) {
        console.error('Failed to load analysis:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalysis();
  }, [districtId]);

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">심층 분석 리포트</h2>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            CSV 다운로드
          </Button>
        </div>

        <Tabs defaultValue="structure" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="structure">투자 구조</TabsTrigger>
            <TabsTrigger value="cost">주거 비용</TabsTrigger>
            <TabsTrigger value="cashflow">현금 흐름</TabsTrigger>
            <TabsTrigger value="future">미래 가치</TabsTrigger>
          </TabsList>

          {/* 투자 구조 비교 */}
          <TabsContent value="structure">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>구분</TableHead>
                  <TableHead className="text-right">재개발</TableHead>
                  <TableHead className="text-right">기축 아파트</TableHead>
                  <TableHead className="text-right">차이</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">총 투자금</TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyWithUnit(analysis.investment_structure.redevelopment_investment)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyWithUnit(analysis.investment_structure.existing_apartment_investment)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-[--color-success-600]">
                    {formatCurrencyWithUnit(Math.abs(analysis.investment_structure.difference))} 절약
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          {/* 주거 비용 비교 */}
          <TabsContent value="cost">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>구분</TableHead>
                  <TableHead className="text-right">재개발</TableHead>
                  <TableHead className="text-right">기축 아파트</TableHead>
                  <TableHead className="text-right">차이</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">월 주거 비용</TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyWithUnit(analysis.living_cost.redevelopment_monthly_cost)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyWithUnit(analysis.living_cost.existing_monthly_cost)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-[--color-success-600]">
                    {formatCurrencyWithUnit(Math.abs(analysis.living_cost.difference))} 절약
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          {/* 현금 흐름 */}
          <TabsContent value="cashflow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>구분</TableHead>
                  <TableHead className="text-right">재개발</TableHead>
                  <TableHead className="text-right">기축 아파트</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">초기 현금</TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyWithUnit(analysis.cash_flow.redevelopment_initial_cash)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyWithUnit(analysis.cash_flow.existing_initial_cash)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">월 상환금</TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyWithUnit(analysis.cash_flow.redevelopment_monthly_payment)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyWithUnit(analysis.cash_flow.existing_monthly_payment)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          {/* 미래 가치 */}
          <TabsContent value="future">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>구분</TableHead>
                  <TableHead className="text-right">재개발</TableHead>
                  <TableHead className="text-right">기축 아파트</TableHead>
                  <TableHead className="text-right">상승 여력</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">예상 시세</TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    {formatCurrencyWithUnit(analysis.future_value.redevelopment_expected_value)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrencyWithUnit(analysis.future_value.existing_current_value)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-[--color-success-600]">
                    +{formatCurrencyWithUnit(analysis.future_value.potential_appreciation)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}
