/**
 * 개발용 Mock 데이터
 */

import { District } from '../types/district';
import { Listing } from '../types/listing';
import { ApartmentComparison, ComparisonData, InvestmentAnalysis } from '../types/comparison';
import { SystemStats, LTVTier, LeadSubscription } from '../types/admin';

// 재개발 구역 Mock 데이터
export const mockDistricts: District[] = [
  {
    id: 'dist-001',
    name: '쌍문동 재개발 구역',
    administrative_region: '도봉구',
    project_stage: 'association',
    estimated_investment_min: 30000000,
    estimated_investment_max: 55000000,
    matching_score: 92,
    ratio: 120,
    property_value: 520000000,
    reference_complex: '래미안 쌍문',
    expected_move_in: '2028-3Q',
    last_synced_at: '2026-04-20T10:00:00Z',
  },
  {
    id: 'dist-002',
    name: '상계동 4구역',
    administrative_region: '노원구',
    project_stage: 'disposal',
    estimated_investment_min: 40000000,
    estimated_investment_max: 65000000,
    matching_score: 85,
    ratio: 115,
    property_value: 580000000,
    reference_complex: '힐스테이트 상계',
    expected_move_in: '2027-4Q',
    last_synced_at: '2026-04-18T14:30:00Z',
  },
  {
    id: 'dist-003',
    name: '수유동 1구역',
    administrative_region: '강북구',
    project_stage: 'preparation',
    estimated_investment_min: 25000000,
    estimated_investment_max: 48000000,
    matching_score: 78,
    ratio: 125,
    property_value: 480000000,
    reference_complex: '수유 e편한세상',
    expected_move_in: '2029-2Q',
    last_synced_at: '2026-04-19T09:15:00Z',
  },
  {
    id: 'dist-004',
    name: '번동 2구역',
    administrative_region: '강북구',
    project_stage: 'association',
    estimated_investment_min: 35000000,
    estimated_investment_max: 58000000,
    matching_score: 88,
    ratio: 118,
    property_value: 540000000,
    reference_complex: '번동 센트럴파크',
    expected_move_in: '2028-1Q',
    last_synced_at: '2026-04-21T16:45:00Z',
  },
  {
    id: 'dist-005',
    name: '미아동 3구역',
    administrative_region: '강북구',
    project_stage: 'disposal',
    estimated_investment_min: 45000000,
    estimated_investment_max: 72000000,
    matching_score: 91,
    ratio: 122,
    property_value: 620000000,
    reference_complex: '미아 롯데캐슬',
    expected_move_in: '2027-3Q',
    last_synced_at: '2026-02-15T11:20:00Z', // 오래된 데이터
  },
  {
    id: 'dist-006',
    name: '장위동 1구역',
    administrative_region: '성북구',
    project_stage: 'preparation',
    estimated_investment_min: 28000000,
    estimated_investment_max: 50000000,
    matching_score: 75,
    ratio: 113,
    property_value: 495000000,
    reference_complex: '장위 푸르지오',
    expected_move_in: '2029-4Q',
    last_synced_at: '2026-04-22T08:30:00Z',
  },
];

// 매물 Mock 데이터
export const mockListings: Listing[] = [
  {
    id: 'list-001',
    district_id: 'dist-001',
    district_name: '쌍문동 재개발 구역',
    type: '뚜껑',
    asking_price: 350000000,
    premium: 20000000,
    property_value: 520000000,
    owner_contact: '01012345678',
    building_unit: '101-1001',
    is_verified: true,
    status: 'ACTIVE',
    created_at: '2026-04-15T10:00:00Z',
  },
  {
    id: 'list-002',
    district_id: 'dist-001',
    district_name: '쌍문동 재개발 구역',
    type: '다세대',
    asking_price: 280000000,
    property_value: 480000000,
    owner_contact: '01087654321',
    building_unit: '102-302',
    is_verified: true,
    status: 'ACTIVE',
    created_at: '2026-04-18T14:30:00Z',
  },
  {
    id: 'list-003',
    district_id: 'dist-001',
    district_name: '쌍문동 재개발 구역',
    type: '빌라',
    asking_price: 320000000,
    premium: 15000000,
    property_value: 500000000,
    owner_contact: '01055556666',
    building_unit: '103-201',
    is_verified: false,
    status: 'ACTIVE',
    created_at: '2026-04-20T09:15:00Z',
  },
  {
    id: 'list-004',
    district_id: 'dist-002',
    district_name: '상계동 4구역',
    type: '뚜껑',
    asking_price: 420000000,
    premium: 25000000,
    property_value: 580000000,
    owner_contact: '01011112222',
    building_unit: '201-501',
    is_verified: true,
    status: 'ACTIVE',
    created_at: '2026-04-10T11:20:00Z',
  },
  {
    id: 'list-005',
    district_id: 'dist-002',
    district_name: '상계동 4구역',
    type: '다세대',
    asking_price: 380000000,
    property_value: 550000000,
    owner_contact: '01033334444',
    is_verified: false,
    status: 'ACTIVE',
    created_at: '2026-04-12T16:45:00Z',
  },
];

// 아파트 비교 Mock 데이터
export const mockApartments: ApartmentComparison[] = [
  {
    id: 'apt-001',
    name: '래미안 쌍문',
    building_type: '101동 84㎡',
    latest_transaction_price: 650000000,
    latest_transaction_date: '2026-03-15T00:00:00Z',
    peak_price: 720000000,
    peak_date: '2021-08-20T00:00:00Z',
    recovery_rate: 90,
    administrative_region: '도봉구',
  },
  {
    id: 'apt-002',
    name: '쌍문 SK VIEW',
    building_type: '203동 74㎡',
    latest_transaction_price: 580000000,
    latest_transaction_date: '2026-02-28T00:00:00Z',
    peak_price: 680000000,
    peak_date: '2021-10-10T00:00:00Z',
    recovery_rate: 85,
    administrative_region: '도봉구',
  },
  {
    id: 'apt-003',
    name: '쌍문 동아아파트',
    building_type: '105동 59㎡',
    latest_transaction_price: 420000000,
    latest_transaction_date: '2026-01-10T00:00:00Z',
    peak_price: 520000000,
    peak_date: '2022-02-15T00:00:00Z',
    recovery_rate: 81,
    administrative_region: '도봉구',
  },
  {
    id: 'apt-004',
    name: '힐스테이트 상계',
    building_type: '301동 84㎡',
    latest_transaction_price: 720000000,
    latest_transaction_date: '2026-04-01T00:00:00Z',
    peak_price: 850000000,
    peak_date: '2021-11-25T00:00:00Z',
    recovery_rate: 85,
    administrative_region: '노원구',
  },
];

// 비교 데이터 Mock
export const mockComparisonData: ComparisonData = {
  district: mockDistricts[0],
  apartments: [mockApartments[0], mockApartments[1], mockApartments[2]],
};

// 심층 분석 Mock 데이터
export const mockInvestmentAnalysis: InvestmentAnalysis = {
  investment_structure: {
    redevelopment_investment: 370000000,
    existing_apartment_investment: 650000000,
    difference: -280000000,
  },
  living_cost: {
    redevelopment_monthly_cost: 1200000,
    existing_monthly_cost: 2100000,
    difference: -900000,
  },
  cash_flow: {
    redevelopment_initial_cash: 35000000,
    existing_initial_cash: 130000000,
    redevelopment_monthly_payment: 1200000,
    existing_monthly_payment: 2100000,
  },
  future_value: {
    redevelopment_expected_value: 720000000,
    existing_current_value: 650000000,
    potential_appreciation: 70000000,
  },
};

// Admin: 시스템 통계 Mock 데이터
export const mockSystemStats: SystemStats = {
  total_districts: 42,
  total_listings: 156,
  verified_ratio: 68,
  last_sync: '2026-04-23T14:35:00Z',
  lead_subscriptions: 234,
  month_over_month: {
    districts: 3,
    listings: 12,
    leads: 8,
  },
};

// Admin: LTV Tier Mock 데이터
export const mockLTVTiers: LTVTier[] = [
  {
    id: 'tier-001',
    label: '일반',
    price_min: 0,
    price_max: 600000000,
    max_loan_percentage: 70,
    effective_date: '2026-01-01T00:00:00Z',
  },
  {
    id: 'tier-002',
    label: '우대',
    price_min: 600000001,
    price_max: 900000000,
    max_loan_percentage: 60,
    effective_date: '2026-01-01T00:00:00Z',
  },
  {
    id: 'tier-003',
    label: '특별',
    price_min: 900000001,
    price_max: 10000000000,
    max_loan_percentage: 50,
    effective_date: '2026-01-01T00:00:00Z',
  },
];

// Admin: Lead 구독 Mock 데이터
export const mockLeadSubscriptions: LeadSubscription[] = [
  {
    id: 'lead-001',
    email: 'user1@example.com',
    budget_min: 30000000,
    budget_max: 50000000,
    target_regions: ['도봉구', '노원구'],
    is_active: true,
    created_at: '2026-03-15T10:00:00Z',
  },
  {
    id: 'lead-002',
    email: 'user2@example.com',
    budget_min: 40000000,
    budget_max: 70000000,
    target_regions: ['강북구'],
    is_active: true,
    created_at: '2026-04-01T14:30:00Z',
  },
  {
    id: 'lead-003',
    email: 'user3@example.com',
    budget_min: 25000000,
    budget_max: 45000000,
    target_regions: ['도봉구', '강북구', '성북구'],
    is_active: false,
    created_at: '2026-02-20T09:15:00Z',
  },
];

// Mock API 함수들
export const mockApi = {
  // 구역 검색
  searchDistricts: (budget: number): Promise<District[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockDistricts.filter(
          (d) =>
            budget >= d.estimated_investment_min &&
            budget <= d.estimated_investment_max
        );
        resolve(filtered.sort((a, b) => b.matching_score - a.matching_score));
      }, 800);
    });
  },

  // 구역 상세 조회
  getDistrict: (id: string): Promise<District | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDistricts.find((d) => d.id === id) || null);
      }, 300);
    });
  },

  // 비교 데이터 조회
  getComparisonData: (districtId: string, budget?: number): Promise<ComparisonData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const district = mockDistricts.find((d) => d.id === districtId);
        if (!district) {
          resolve({
            district: mockDistricts[0],
            apartments: [],
          });
          return;
        }

        const data: ComparisonData = {
          district,
          apartments: mockApartments.slice(0, 3),
        };

        // 예산 부족 시뮬레이션
        if (budget && budget < district.estimated_investment_min) {
          data.budget_shortage = district.estimated_investment_min - budget;
          data.recommended_budget = district.estimated_investment_min;
        }

        resolve(data);
      }, 1000);
    });
  },

  // 구역별 매물 리스트
  getListingsByDistrict: (districtId: string): Promise<Listing[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockListings.filter((l) => l.district_id === districtId);
        // Verified 매물 우선 정렬
        const sorted = filtered.sort((a, b) => {
          if (a.is_verified && !b.is_verified) return -1;
          if (!a.is_verified && b.is_verified) return 1;
          return 0;
        });
        resolve(sorted);
      }, 600);
    });
  },

  // 매물 등록
  createListing: (data: Partial<Listing>): Promise<Listing> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newListing: Listing = {
          id: `list-${Date.now()}`,
          district_id: data.district_id!,
          type: data.type!,
          asking_price: data.asking_price!,
          premium: data.premium,
          property_value: data.property_value!,
          owner_contact: data.owner_contact!,
          building_unit: data.building_unit,
          is_verified: false,
          status: 'ACTIVE',
          created_at: new Date().toISOString(),
        };
        resolve(newListing);
      }, 800);
    });
  },

  // 심층 분석 리포트
  getInvestmentAnalysis: (districtId: string): Promise<InvestmentAnalysis> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockInvestmentAnalysis);
      }, 1200);
    });
  },
};
