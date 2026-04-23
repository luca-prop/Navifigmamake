"use client";

import { useState, useMemo } from 'react';

/**
 * 페이지네이션 로직을 처리하는 Hook
 */
export const usePagination = <T,>(
  items: T[],
  itemsPerPage: number = 10
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const prevPage = () => {
    goToPage(currentPage - 1);
  };

  const reset = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    reset,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};
