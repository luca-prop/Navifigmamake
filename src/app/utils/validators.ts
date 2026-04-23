/**
 * 금액 유효성 검사
 */
export const validateCurrency = (
  amount: number,
  min: number = 1000000,
  max: number = 10000000000
): { valid: boolean; error?: string } => {
  if (amount < min) {
    return {
      valid: false,
      error: `최소 금액은 ${min.toLocaleString('ko-KR')}원입니다.`,
    };
  }
  if (amount > max) {
    return {
      valid: false,
      error: `최대 금액은 ${max.toLocaleString('ko-KR')}원입니다.`,
    };
  }
  return { valid: true };
};

/**
 * 전화번호 유효성 검사 (010으로 시작하는 11자리)
 */
export const validatePhoneNumber = (phone: string): {
  valid: boolean;
  error?: string;
} => {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length !== 11) {
    return {
      valid: false,
      error: '올바른 휴대폰 번호를 입력해주세요 (11자리)',
    };
  }

  if (!cleaned.startsWith('010')) {
    return {
      valid: false,
      error: '010으로 시작하는 번호를 입력해주세요',
    };
  }

  return { valid: true };
};

/**
 * 이메일 유효성 검사
 */
export const validateEmail = (email: string): {
  valid: boolean;
  error?: string;
} => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      valid: false,
      error: '올바른 이메일 주소를 입력해주세요',
    };
  }

  return { valid: true };
};

/**
 * LTV Tier 가격 범위 겹침 검사
 */
export const validateTierPriceRanges = (
  tiers: Array<{ price_min: number; price_max: number }>
): { valid: boolean; error?: string } => {
  for (let i = 0; i < tiers.length; i++) {
    const tier = tiers[i];

    // 하한이 상한보다 큰 경우
    if (tier.price_min >= tier.price_max) {
      return {
        valid: false,
        error: `Tier ${i + 1}: 가격 하한이 상한보다 작아야 합니다`,
      };
    }

    // 다른 Tier와 겹치는지 확인
    for (let j = i + 1; j < tiers.length; j++) {
      const otherTier = tiers[j];

      if (
        (tier.price_min <= otherTier.price_max &&
          tier.price_max >= otherTier.price_min) ||
        (otherTier.price_min <= tier.price_max &&
          otherTier.price_max >= tier.price_min)
      ) {
        return {
          valid: false,
          error: `Tier ${i + 1}과 Tier ${j + 1}의 가격 범위가 겹칩니다`,
        };
      }
    }
  }

  return { valid: true };
};
