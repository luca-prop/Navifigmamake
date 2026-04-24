"use client";

import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { LTVTier } from '../../types/admin';
import { useToast } from '../../hooks/useToast';
import { formatCurrency } from '../../utils/formatters';
import { Trash2, Plus, Loader2 } from 'lucide-react';

interface LTVPolicyFormProps {
  initialTiers: LTVTier[];
  onSave?: (tiers: LTVTier[]) => void;
}

/**
 * LTV 정책 관리 폼 (동적 Tier 추가/삭제)
 */
export default function LTVPolicyForm({ initialTiers, onSave }: LTVPolicyFormProps) {
  const { success } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      tiers: initialTiers,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tiers',
  });

  const onSubmit = async (data: { tiers: LTVTier[] }) => {
    setIsSubmitting(true);

    // Mock API 호출
    setTimeout(() => {
      success('LTV 정책이 업데이트되었습니다');
      onSave?.(data.tiers);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleAddTier = () => {
    append({
      id: `tier-${Date.now()}`,
      label: '',
      price_min: 0,
      price_max: 0,
      max_loan_percentage: 70,
      effective_date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Tier 리스트 */}
      <div className="space-y-4">
        {fields.map((field, index) => {
          const tier = watch(`tiers.${index}`);

          return (
            <div key={field.id} className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Tier {index + 1}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Tier 라벨 */}
                <div className="space-y-2">
                  <Label>Tier 라벨</Label>
                  <Input
                    value={tier.label}
                    onChange={(e) =>
                      setValue(`tiers.${index}.label`, e.target.value)
                    }
                    placeholder="예: 일반, 우대, 특별"
                  />
                </div>

                {/* 적용일 */}
                <div className="space-y-2">
                  <Label>적용일</Label>
                  <Input
                    type="date"
                    value={tier.effective_date.split('T')[0]}
                    onChange={(e) =>
                      setValue(`tiers.${index}.effective_date`, e.target.value)
                    }
                  />
                </div>

                {/* 가격 하한 */}
                <div className="space-y-2">
                  <Label>가격 하한</Label>
                  <Input
                    type="number"
                    value={tier.price_min}
                    onChange={(e) =>
                      setValue(`tiers.${index}.price_min`, parseInt(e.target.value) || 0)
                    }
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(tier.price_min)}원
                  </p>
                </div>

                {/* 가격 상한 */}
                <div className="space-y-2">
                  <Label>가격 상한</Label>
                  <Input
                    type="number"
                    value={tier.price_max}
                    onChange={(e) =>
                      setValue(`tiers.${index}.price_max`, parseInt(e.target.value) || 0)
                    }
                    placeholder="1000000000"
                  />
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(tier.price_max)}원
                  </p>
                </div>
              </div>

              {/* 최대 대출액 (%) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>최대 대출액 (%)</Label>
                  <span className="text-lg font-semibold">
                    {tier.max_loan_percentage}%
                  </span>
                </div>
                <Slider
                  value={[tier.max_loan_percentage]}
                  onValueChange={(value) =>
                    setValue(`tiers.${index}.max_loan_percentage`, value[0])
                  }
                  min={0}
                  max={100}
                  step={5}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tier 추가 버튼 */}
      <Button
        type="button"
        variant="outline"
        onClick={handleAddTier}
        disabled={fields.length >= 10}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Tier 추가 {fields.length >= 10 && '(최대 10개)'}
      </Button>

      {/* 저장 버튼 */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            저장 중...
          </>
        ) : (
          '정책 저장'
        )}
      </Button>
    </form>
  );
}
