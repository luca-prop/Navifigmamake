"use client";

import { Slider } from '../ui/slider';
import { formatCurrencyWithUnit } from '../../utils/formatters';

interface BudgetSliderProps {
  currentBudget: number;
  recommendedBudget: number;
  onChange: (value: number) => void;
}

/**
 * 예산 조정 Slider 컴포넌트
 */
export default function BudgetSlider({
  currentBudget,
  recommendedBudget,
  onChange,
}: BudgetSliderProps) {
  const minBudget = Math.floor(currentBudget * 0.8);
  const maxBudget = Math.ceil(recommendedBudget * 1.2);
  const step = 1000000; // 100만원 단위

  const handleChange = (values: number[]) => {
    onChange(values[0]);
  };

  return (
    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">예산 조정</span>
        <span className="text-sm font-bold text-primary">
          {formatCurrencyWithUnit(currentBudget)}
        </span>
      </div>

      <Slider
        value={[currentBudget]}
        onValueChange={handleChange}
        min={minBudget}
        max={maxBudget}
        step={step}
        className="w-full"
      />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatCurrencyWithUnit(minBudget)}</span>
        <span>{formatCurrencyWithUnit(maxBudget)}</span>
      </div>
    </div>
  );
}
