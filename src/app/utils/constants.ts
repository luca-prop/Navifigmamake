/**
 * 프로젝트 전역 상수
 */

// API 관련
export const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';
export const API_TIMEOUT = 30000; // 30초

// 페이지네이션
export const ITEMS_PER_PAGE = 10;
export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];

// 금액 범위
export const MIN_BUDGET = 1000000; // 100만원
export const MAX_BUDGET = 10000000000; // 100억원
export const BUDGET_STEP = 1000000; // 100만원 단위

// 데이터 신선도 임계값 (일)
export const DATA_FRESHNESS_THRESHOLD = 30;

// 매칭 적합도 기준
export const MATCHING_SCORE_EXCELLENT = 80;
export const MATCHING_SCORE_GOOD = 50;

// 전고점 회복률 기준
export const RECOVERY_RATE_EXCELLENT = 80;
export const RECOVERY_RATE_GOOD = 60;

// 매물 유형
export const LISTING_TYPES = ['뚜껑', '다세대', '빌라', '상가', '기타'] as const;

// 매물 상태
export const LISTING_STATUS = {
  ACTIVE: 'ACTIVE',
  SOLD: 'SOLD',
} as const;

// 사업 단계
export const PROJECT_STAGES = {
  PREPARATION: 'preparation',
  ASSOCIATION: 'association',
  DISPOSAL: 'disposal',
} as const;

// 정렬 옵션
export const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'price-asc', label: '가격 낮은순' },
  { value: 'price-desc', label: '가격 높은순' },
] as const;

// Toast 메시지
export const TOAST_MESSAGES = {
  LISTING_CREATED: '매물이 등록되었습니다',
  LISTING_UPDATED: '매물이 수정되었습니다',
  LISTING_DELETED: '매물이 삭제되었습니다',
  LTV_UPDATED: 'LTV 정책이 업데이트되었습니다',
  REQUEST_SENT: '요청이 접수되었습니다. 이메일을 확인해주세요.',
  ERROR_OCCURRED: '일시적인 오류가 발생했습니다. 다시 시도해주세요.',
} as const;

// Footer 법적 안내 문구
export const FOOTER_DISCLAIMER =
  '⚠️ 본 데이터는 국토부 실거래가 및 동일 행정구 기준 비교이며, 현장 호가와 다를 수 있습니다. 투자 판단의 책임은 이용자에게 있습니다.';
