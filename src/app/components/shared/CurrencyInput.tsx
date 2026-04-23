"use client";

import { useFormatCurrency } from '../../hooks/useFormatCurrency';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface CurrencyInputProps {
  label?: string;
  placeholder?: string;
  value?: number;
  onChange?: (value: number) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

/**
 * 천 단위 콤마가 자동으로 찍히는 금액 입력 컴포넌트
 */
export default function CurrencyInput({
  label,
  placeholder = '금액을 입력하세요',
  value: externalValue,
  onChange,
  error,
  disabled = false,
  required = false,
}: CurrencyInputProps) {
  const { value, displayValue, handleChange } = useFormatCurrency(externalValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
    onChange?.(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0);
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <div className="relative">
        <Input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className={error ? 'border-destructive' : ''}
        />
        {displayValue && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            원
          </span>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
