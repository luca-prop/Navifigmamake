"use client";

import { useState, useCallback } from 'react';

/**
 * 금액 입력 시 천 단위 콤마 포맷팅을 자동으로 처리하는 Hook
 */
export const useFormatCurrency = (initialValue: number = 0) => {
  const [value, setValue] = useState(initialValue);
  const [displayValue, setDisplayValue] = useState(
    initialValue > 0 ? initialValue.toLocaleString('ko-KR') : ''
  );

  const handleChange = useCallback((inputValue: string) => {
    // 숫자만 추출
    const numericValue = inputValue.replace(/\D/g, '');
    const numberValue = numericValue ? parseInt(numericValue, 10) : 0;

    setValue(numberValue);
    setDisplayValue(numberValue > 0 ? numberValue.toLocaleString('ko-KR') : '');
  }, []);

  const reset = useCallback(() => {
    setValue(0);
    setDisplayValue('');
  }, []);

  const setNewValue = useCallback((newValue: number) => {
    setValue(newValue);
    setDisplayValue(newValue > 0 ? newValue.toLocaleString('ko-KR') : '');
  }, []);

  return {
    value,
    displayValue,
    handleChange,
    reset,
    setValue: setNewValue,
  };
};
