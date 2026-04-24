"use client";

import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';
import AdminGuard from '../../components/admin/AdminGuard';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { usePagination } from '../../hooks/usePagination';
import { useToast } from '../../hooks/useToast';
import { LeadSubscription } from '../../types/admin';
import { mockLeadSubscriptions } from '../../services/mockData';
import { formatCurrencyWithUnit, formatDate } from '../../utils/formatters';
import { Download } from 'lucide-react';

/**
 * Admin Lead 구독 관리 페이지
 */
export default function LeadManagementPage() {
  const [leads, setLeads] = useState<LeadSubscription[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<LeadSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const { success } = useToast();

  const { currentItems, currentPage, totalPages, goToPage, hasNextPage, hasPrevPage } =
    usePagination(filteredLeads, 20);

  useEffect(() => {
    // Mock 데이터 로드
    setTimeout(() => {
      setLeads(mockLeadSubscriptions);
      setFilteredLeads(mockLeadSubscriptions);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleFilter = () => {
    const min = minBudget ? parseInt(minBudget.replace(/,/g, '')) : 0;
    const max = maxBudget ? parseInt(maxBudget.replace(/,/g, '')) : Infinity;

    const filtered = leads.filter(
      (lead) => lead.budget_min >= min && lead.budget_max <= max
    );

    setFilteredLeads(filtered);
    success('필터가 적용되었습니다');
  };

  const handleResetFilter = () => {
    setMinBudget('');
    setMaxBudget('');
    setFilteredLeads(leads);
  };

  const handleToggleActive = (id: string) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, is_active: !lead.is_active } : lead
      )
    );
    success('구독 상태가 변경되었습니다');
  };

  const handleExportCSV = () => {
    // CSV 내보내기 Mock
    const csv = [
      ['이메일', '예산 범위', '타겟 지역', '상태', '등록일'].join(','),
      ...filteredLeads.map((lead) =>
        [
          lead.email,
          `${lead.budget_min}-${lead.budget_max}`,
          lead.target_regions.join(';'),
          lead.is_active ? '활성' : '비활성',
          formatDate(lead.created_at),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `lead-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    success('CSV 파일이 다운로드되었습니다');
  };

  if (isLoading) {
    return (
      <AdminGuard>
        <LoadingSpinner text="구독 데이터를 불러오는 중..." />
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="space-y-6">
        {/* 헤더 */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Lead 구독 관리</h1>
          <p className="text-muted-foreground">
            매물 알림을 신청한 사용자를 관리합니다
          </p>
        </div>

        {/* 필터 및 액션 */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label>예산 범위 필터 (최소)</Label>
                <Input
                  placeholder="예: 30000000"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>예산 범위 필터 (최대)</Label>
                <Input
                  placeholder="예: 70000000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                />
              </div>
              <Button onClick={handleFilter}>필터 적용</Button>
              <Button variant="outline" onClick={handleResetFilter}>
                초기화
              </Button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                총 {filteredLeads.length}개 구독
              </p>
              <Button onClick={handleExportCSV} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                CSV 내보내기
              </Button>
            </div>
          </div>
        </Card>

        {/* 테이블 */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이메일</TableHead>
                <TableHead>예산 범위</TableHead>
                <TableHead>타겟 지역</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>등록일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    검색 결과가 없습니다
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.email}</TableCell>
                    <TableCell>
                      {formatCurrencyWithUnit(lead.budget_min)} ~{' '}
                      {formatCurrencyWithUnit(lead.budget_max)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {lead.target_regions.map((region) => (
                          <Badge key={region} variant="outline">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={lead.is_active}
                          onCheckedChange={() => handleToggleActive(lead.id)}
                        />
                        <span className="text-sm">
                          {lead.is_active ? '활성' : '비활성'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(lead.created_at)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="p-4 border-t">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => hasPrevPage && goToPage(currentPage - 1)}
                      className={
                        !hasPrevPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                      }
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
                      className={
                        !hasNextPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Card>
      </div>
    </AdminGuard>
  );
}
