/**
 * 금액 포맷팅 유틸리티
 */
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('ko-KR');
};

/**
 * 금액을 억/만원 단위로 변환
 * @example formatCurrencyWithUnit(350000000) => "3억 5,000만원"
 */
export const formatCurrencyWithUnit = (amount: number): string => {
  const billion = Math.floor(amount / 100000000);
  const million = Math.floor((amount % 100000000) / 10000);

  if (billion > 0 && million > 0) {
    return `${billion}억 ${million.toLocaleString()}만원`;
  } else if (billion > 0) {
    return `${billion}억원`;
  } else {
    return `${million.toLocaleString()}만원`;
  }
};

/**
 * 날짜를 YYYY.MM.DD 형식으로 변환
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

/**
 * 전화번호 포맷팅 (010-1234-5678)
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

/**
 * 전화번호 마스킹 (010-****-5678)
 */
export const maskPhoneNumber = (phone: string): string => {
  const formatted = formatPhoneNumber(phone);
  return formatted.replace(/(\d{3})-(\d{4})-(\d{4})/, '$1-****-$3');
};

/**
 * 동호수 마스킹
 */
export const maskBuildingUnit = (): string => {
  return '***-****';
};

/**
 * 특정 날짜로부터 며칠 지났는지 계산
 */
export const getDaysAgo = (dateString: string): number => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

/**
 * 사업 단계에 따른 Badge 색상 반환
 */
export const getProjectStageBadgeColor = (
  stage: 'preparation' | 'association' | 'disposal'
): string => {
  const colors = {
    preparation: 'bg-[--color-stage-preparation] text-[--color-stage-preparation-foreground]',
    association: 'bg-[--color-stage-association] text-[--color-stage-association-foreground]',
    disposal: 'bg-[--color-stage-disposal] text-[--color-stage-disposal-foreground]',
  };
  return colors[stage];
};

/**
 * 사업 단계 라벨 반환
 */
export const getProjectStageLabel = (
  stage: 'preparation' | 'association' | 'disposal'
): string => {
  const labels = {
    preparation: '착공준비',
    association: '조합설립',
    disposal: '관리처분',
  };
  return labels[stage];
};

/**
 * 전고점 회복률에 따른 텍스트 색상
 */
export const getRecoveryRateColor = (rate: number): string => {
  if (rate >= 80) return 'text-[--color-success-600]';
  if (rate >= 60) return 'text-[--color-warning-600]';
  return 'text-[--color-destructive]';
};

/**
 * 전고점 회복률 Badge 정보
 */
export const getRecoveryRateBadge = (rate: number): {
  label: string;
  color: string;
} => {
  if (rate >= 80) {
    return {
      label: '회복 우수',
      color: 'bg-[--color-success-100] text-[--color-success-600]',
    };
  }
  if (rate >= 60) {
    return {
      label: '회복 중',
      color: 'bg-[--color-warning-100] text-[--color-warning-600]',
    };
  }
  return {
    label: '미회복',
    color: 'bg-destructive/10 text-destructive',
  };
};

/**
 * 매칭 적합도에 따른 Progress 색상
 */
export const getMatchingScoreColor = (score: number): string => {
  if (score >= 80) return 'bg-[--color-success-500]';
  if (score >= 50) return 'bg-[--color-warning-500]';
  return 'bg-muted';
};
