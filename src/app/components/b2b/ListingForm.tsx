"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import CurrencyInput from '../shared/CurrencyInput';
import PhoneInput from '../shared/PhoneInput';
import { useToast } from '../../hooks/useToast';
import { LISTING_TYPES } from '../../utils/constants';
import { mockDistricts, mockApi } from '../../services/mockData';
import { Loader2 } from 'lucide-react';

// Zod Schema
const listingFormSchema = z.object({
  district_id: z.string().min(1, '구역을 선택해주세요'),
  type: z.enum(['뚜껑', '다세대', '빌라', '상가', '기타'], {
    required_error: '매물 유형을 선택해주세요',
  }),
  asking_price: z.number().min(1000000, '최소 금액은 100만원입니다'),
  premium: z.number().optional(),
  property_value: z.number().min(1000000, '권리가액을 입력해주세요'),
  owner_contact: z
    .string()
    .regex(/^010\d{8}$/, '올바른 휴대폰 번호를 입력해주세요'),
  building_unit: z.string().optional(),
});

type ListingFormData = z.infer<typeof listingFormSchema>;

interface ListingFormProps {
  hasAccess: boolean;
  onSubmitSuccess?: () => void;
}

/**
 * B2B 매물 등록 폼 컴포넌트
 */
export default function ListingForm({ hasAccess, onSubmitSuccess }: ListingFormProps) {
  const { success, error: showError } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      asking_price: 0,
      premium: 0,
      property_value: 0,
    },
  });

  const [askingPrice, premium, propertyValue] = watch([
    'asking_price',
    'premium',
    'property_value',
  ]);

  const onSubmit = async (data: ListingFormData) => {
    try {
      await mockApi.createListing({
        ...data,
        owner_contact: data.owner_contact,
      });

      success('매물이 등록되었습니다');
      reset();
      onSubmitSuccess?.();
    } catch (err) {
      showError('매물 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 구역 선택 */}
      <div className="space-y-2">
        <Label>
          재개발 구역 <span className="text-destructive">*</span>
        </Label>
        <Select
          disabled={!hasAccess}
          onValueChange={(value) => setValue('district_id', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="구역을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {mockDistricts.map((district) => (
              <SelectItem key={district.id} value={district.id}>
                {district.name} ({district.administrative_region})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.district_id && (
          <p className="text-sm text-destructive">{errors.district_id.message}</p>
        )}
      </div>

      {/* 매물 유형 */}
      <div className="space-y-2">
        <Label>
          매물 유형 <span className="text-destructive">*</span>
        </Label>
        <Select
          disabled={!hasAccess}
          onValueChange={(value) =>
            setValue('type', value as '뚜껑' | '다세대' | '빌라' | '상가' | '기타')
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="매물 유형을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {LISTING_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-destructive">{errors.type.message}</p>
        )}
      </div>

      {/* 호가 */}
      <div className="space-y-2">
        <CurrencyInput
          label="호가"
          placeholder="예: 350,000,000"
          value={askingPrice}
          onChange={(value) => setValue('asking_price', value)}
          error={errors.asking_price?.message}
          disabled={!hasAccess}
          required
        />
        {/* 서버 이상치 에러 시뮬레이션 */}
        {askingPrice > 0 && askingPrice < 10000000 && (
          <p className="text-sm text-destructive">
            ⚠️ 정상 범위를 벗어난 호가입니다. 오타를 확인해 주세요.
          </p>
        )}
      </div>

      {/* 프리미엄 */}
      <CurrencyInput
        label="프리미엄 (권리금)"
        placeholder="권리금이 있다면 입력 (선택)"
        value={premium}
        onChange={(value) => setValue('premium', value)}
        disabled={!hasAccess}
      />

      {/* 권리가액 */}
      <CurrencyInput
        label="권리가액"
        placeholder="예: 520,000,000"
        value={propertyValue}
        onChange={(value) => setValue('property_value', value)}
        error={errors.property_value?.message}
        disabled={!hasAccess}
        required
      />

      {/* 소유주 연락처 */}
      <div className="space-y-2">
        <PhoneInput
          label="소유주 연락처"
          value={watch('owner_contact') || ''}
          onChange={(value) => setValue('owner_contact', value)}
          error={errors.owner_contact?.message}
          disabled={!hasAccess}
          required
        />
      </div>

      {/* 동호수 */}
      <div className="space-y-2">
        <Label>동호수</Label>
        <Input
          {...register('building_unit')}
          placeholder="예: 101-1001"
          disabled={!hasAccess}
        />
      </div>

      {/* 제출 버튼 */}
      <Button type="submit" className="w-full" disabled={!hasAccess || isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            등록 중...
          </>
        ) : (
          '매물 등록하기'
        )}
      </Button>
    </form>
  );
}
