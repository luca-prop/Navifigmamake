/**
 * 매물 관련 타입 정의
 */

export type ListingType = '뚜껑' | '다세대' | '빌라' | '상가' | '기타';
export type ListingStatus = 'ACTIVE' | 'SOLD';

export interface Listing {
  id: string;
  district_id: string;
  district_name?: string; // 구역명 (조인된 데이터)
  type: ListingType;
  asking_price: number; // 호가
  premium?: number; // 프리미엄
  property_value: number; // 권리가액
  owner_contact: string; // 소유주 연락처
  building_unit?: string; // 동호수
  is_verified: boolean; // 인증 여부
  status: ListingStatus;
  created_at: string; // ISO 8601
  updated_at?: string;
}

export interface ListingFormData {
  district_id: string;
  type: ListingType;
  asking_price: number;
  premium?: number;
  property_value: number;
  owner_contact: string;
  building_unit?: string;
}

export interface ListingUpdateData extends Partial<ListingFormData> {
  is_verified?: boolean;
  status?: ListingStatus;
}
