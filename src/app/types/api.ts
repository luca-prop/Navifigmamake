/**
 * API 응답 관련 타입 정의
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page?: number;
    per_page?: number;
    total?: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ErrorResponse {
  code: string;
  message: string;
  field?: string; // 필드별 에러 (폼 validation)
}
