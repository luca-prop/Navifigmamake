/**
 * 1:1 비교 대시보드 관련 타입 정의
 */

import { District } from './district';

export interface ApartmentComparison {
  id: string;
  name: string;
  building_type: string; // 동/평형 (예: "101동 84㎡")
  latest_transaction_price: number;
  latest_transaction_date: string; // ISO 8601
  peak_price: number; // 전고점 가격
  peak_date: string; // 전고점 날짜
  recovery_rate: number; // 전고점 대비 회복률 (%)
  administrative_region: string; // 행정구
}

export interface ComparisonData {
  district: District;
  apartments: ApartmentComparison[];
  data_expansion_notice?: {
    original_region: string;
    expanded_region: string;
  };
  budget_shortage?: number; // 부족한 금액 (있을 경우)
  recommended_budget?: number; // 권장 예산
}

export interface InvestmentAnalysis {
  investment_structure: {
    redevelopment_investment: number;
    existing_apartment_investment: number;
    difference: number;
  };
  living_cost: {
    redevelopment_monthly_cost: number;
    existing_monthly_cost: number;
    difference: number;
  };
  cash_flow: {
    redevelopment_initial_cash: number;
    existing_initial_cash: number;
    redevelopment_monthly_payment: number;
    existing_monthly_payment: number;
  };
  future_value: {
    redevelopment_expected_value: number;
    existing_current_value: number;
    potential_appreciation: number;
  };
}
