"use client";

import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
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
import { Listing } from '../../types/listing';
import { mockListings } from '../../services/mockData';
import { formatCurrencyWithUnit, formatDate } from '../../utils/formatters';
import { Search, MoreVertical, CheckCircle, Trash2, Copy } from 'lucide-react';

/**
 * Admin 매물 관리 페이지
 */
export default function ListingManagementPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { success } = useToast();

  const { currentItems, currentPage, totalPages, goToPage, hasNextPage, hasPrevPage } =
    usePagination(filteredListings, 10);

  useEffect(() => {
    // Mock 데이터 로드
    setTimeout(() => {
      setListings(mockListings);
      setFilteredListings(mockListings);
      setIsLoading(false);
    }, 500);
  }, []);

  // 검색 및 필터링
  useEffect(() => {
    let filtered = [...listings];

    // 검색어 필터링
    if (searchQuery) {
      filtered = filtered.filter(
        (l) =>
          l.district_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 상태 필터링
    if (statusFilter !== 'all') {
      filtered = filtered.filter((l) => l.status === statusFilter);
    }

    setFilteredListings(filtered);
  }, [listings, searchQuery, statusFilter]);

  const handleToggleVerified = (id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, is_verified: !l.is_verified } : l))
    );
    success('Verified 상태가 변경되었습니다');
  };

  const handleChangeStatus = (id: string, status: 'ACTIVE' | 'SOLD') => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    success('매물 상태가 변경되었습니다');
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 이 매물을 삭제하시겠습니까?')) {
      setListings((prev) => prev.filter((l) => l.id !== id));
      success('매물이 삭제되었습니다');
    }
  };

  const handleCopyContact = (contact: string) => {
    navigator.clipboard.writeText(contact);
    success('연락처가 복사되었습니다');
  };

  if (isLoading) {
    return (
      <AdminGuard>
        <LoadingSpinner text="매물 데이터를 불러오는 중..." />
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="space-y-6">
        {/* 헤더 */}
        <div>
          <h1 className="text-3xl font-bold mb-2">매물 관리</h1>
          <p className="text-muted-foreground">
            등록된 매물을 관리하고 상태를 변경할 수 있습니다
          </p>
        </div>

        {/* 필터 및 검색 */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="구역명 또는 매물 유형 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="ACTIVE">판매중</SelectItem>
                <SelectItem value="SOLD">거래완료</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground mt-2">
            총 {filteredListings.length}개 매물
          </p>
        </Card>

        {/* 테이블 */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>구역</TableHead>
                <TableHead>유형</TableHead>
                <TableHead className="text-right">호가</TableHead>
                <TableHead className="text-right">프리미엄</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>연락처</TableHead>
                <TableHead>등록일</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    검색 결과가 없습니다
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {listing.district_name}
                        {listing.is_verified && (
                          <CheckCircle className="w-4 h-4 text-[--color-success-600]" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{listing.type}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrencyWithUnit(listing.asking_price)}
                    </TableCell>
                    <TableCell className="text-right">
                      {listing.premium
                        ? formatCurrencyWithUnit(listing.premium)
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={listing.status}
                        onValueChange={(value) =>
                          handleChangeStatus(listing.id, value as 'ACTIVE' | 'SOLD')
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">
                            <Badge variant="outline">판매중</Badge>
                          </SelectItem>
                          <SelectItem value="SOLD">
                            <Badge variant="secondary">거래완료</Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyContact(listing.owner_contact)}
                        className="font-mono text-xs"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        {listing.owner_contact.replace(
                          /(\d{3})(\d{4})(\d{4})/,
                          '$1-$2-$3'
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(listing.created_at)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleToggleVerified(listing.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {listing.is_verified
                              ? 'Verified 해제'
                              : 'Verified 설정'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(listing.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
