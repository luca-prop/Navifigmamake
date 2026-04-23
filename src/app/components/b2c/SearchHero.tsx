"use client";

import { useState } from 'react';
import { Button } from '../ui/button';
import CurrencyInput from '../shared/CurrencyInput';
import { validateCurrency } from '../../utils/validators';
import { Search } from 'lucide-react';

interface SearchHeroProps {
  onSearch: (budget: number) => void;
}

/**
 * 메인 랜딩 검색 영역 (Hero Section)
 */
export default function SearchHero({ onSearch }: SearchHeroProps) {
  const [budget, setBudget] = useState(0);
  const [error, setError] = useState('');

  const handleSearch = () => {
    // 유효성 검사
    const validation = validateCurrency(budget);
    if (!validation.valid) {
      setError(validation.error || '');
      return;
    }

    setError('');
    onSearch(budget);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="max-w-2xl w-full space-y-8">
        {/* 메인 헤딩 */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            내 가용 현금으로
            <br />
            진입 가능한 재개발 구역은?
          </h1>
          <p className="text-lg text-muted-foreground">
            예산을 입력하고 투자 가능한 재개발 구역을 확인하세요
          </p>
        </div>

        {/* 검색 입력 */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3" onKeyPress={handleKeyPress}>
            <div className="flex-1">
              <CurrencyInput
                placeholder="예산을 입력하세요 (예: 50,000,000원)"
                value={budget}
                onChange={setBudget}
                error={error}
              />
            </div>
            <Button
              size="lg"
              className="sm:w-auto w-full"
              onClick={handleSearch}
              disabled={budget === 0}
            >
              <Search className="w-5 h-5 mr-2" />
              검색
            </Button>
          </div>

          {/* 예시 금액 버튼 */}
          <div className="flex flex-wrap gap-2 justify-center">
            <p className="text-sm text-muted-foreground w-full mb-1">
              빠른 검색:
            </p>
            {[30000000, 50000000, 70000000, 100000000].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => {
                  setBudget(amount);
                  setError('');
                }}
              >
                {(amount / 10000000).toLocaleString()}천만원
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
