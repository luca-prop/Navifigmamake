"use client";

import { useEffect, useState } from 'react';

/**
 * 값의 변경을 지연시켜 불필요한 리렌더링을 방지하는 Hook
 * @param value - debounce할 값
 * @param delay - 지연 시간(ms), 기본값 500ms
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
