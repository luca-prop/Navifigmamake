/**
 * 재개발 구역 관련 타입 정의
 */

export interface District {
  id: string;
  name: string;
  administrative_region: string; // 행정구
  project_stage: 'preparation' | 'association' | 'disposal'; // 사업 단계
  estimated_investment_min: number; // 예상 실투자금 최소
  estimated_investment_max: number; // 예상 실투자금 최대
  matching_score: number; // 매칭 적합도 (0-100)
  ratio: number; // 비례율 (%)
  property_value: number; // 권리가액
  reference_complex?: string; // 참조 단지명
  expected_move_in?: string; // 입주 예정 (YYYY-Q분기)
  last_synced_at: string; // 마지막 데이터 동기화 날짜 (ISO 8601)
}

export interface DistrictSearchParams {
  budget: number;
  regions?: string[];
  project_stages?: Array<'preparation' | 'association' | 'disposal'>;
  min_matching_score?: number;
}

export interface DistrictSearchResult {
  districts: District[];
  total: number;
  last_synced_at: string;
}
