/**
 * Admin 관련 타입 정의
 */

export interface LTVTier {
  id: string;
  label: string; // Tier 라벨 (예: "일반", "우대", "특별")
  price_min: number; // 가격 하한
  price_max: number; // 가격 상한
  max_loan_percentage: number; // 최대 대출액 (%)
  effective_date: string; // 적용일 (ISO 8601)
}

export interface LTVTierFormData {
  label: string;
  price_min: number;
  price_max: number;
  max_loan_percentage: number;
  effective_date: string;
}

export interface LeadSubscription {
  id: string;
  email: string;
  budget_min: number;
  budget_max: number;
  target_regions: string[]; // 관심 지역 리스트
  is_active: boolean;
  created_at: string; // ISO 8601
}

export interface SystemStats {
  total_districts: number;
  total_listings: number;
  verified_ratio: number; // Verified 비율 (%)
  last_sync: string; // 마지막 동기화 시간
  lead_subscriptions: number;
  month_over_month: {
    districts: number; // 전월 대비 변화
    listings: number;
    leads: number;
  };
}

export interface ListingManagementRow {
  id: string;
  district_name: string;
  type: string;
  asking_price: number;
  premium?: number;
  status: 'ACTIVE' | 'SOLD';
  owner_contact: string;
  is_verified: boolean;
  created_at: string;
}
