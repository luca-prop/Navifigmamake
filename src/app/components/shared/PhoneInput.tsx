"use client";

import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { formatPhoneNumber } from '../../utils/formatters';

interface PhoneInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

/**
 * 자동으로 하이픈이 삽입되는 전화번호 입력 컴포넌트
 */
export default function PhoneInput({
  label,
  placeholder = '010-1234-5678',
  value = '',
  onChange,
  error,
  disabled = false,
  required = false,
}: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (value) {
      setDisplayValue(formatPhoneNumber(value));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '');
    const formatted = formatPhoneNumber(cleaned);

    setDisplayValue(formatted);
    onChange?.(cleaned);
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Input
        type="tel"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={13}
        className={error ? 'border-destructive' : ''}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
