import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Menu } from 'lucide-react';

interface DemoNavProps {
  onNavigate: (route: string) => void;
}

/**
 * 데모용 네비게이션 (모든 페이지로 빠르게 이동)
 */
export default function DemoNav({ onNavigate }: DemoNavProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="lg" className="shadow-lg">
            <Menu className="w-5 h-5 mr-2" />
            데모 메뉴
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>B2C (일반 사용자)</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onNavigate('home')}>
            🏠 메인 랜딩
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate('search-results')}>
            🔍 검색 결과 (예산 5천만원)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate('comparison')}>
            📊 1:1 대조 대시보드
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate('listings')}>
            📋 매물 리스트
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel>B2B (중개사)</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onNavigate('b2b-listing-form')}>
            📝 매물 등록 (패스코드: 1234)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate('b2b-briefing')}>
            🎤 고객 브리핑 모드
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel>Admin (관리자)</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onNavigate('admin-dashboard')}>
            📈 대시보드
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate('admin-ltv')}>
            ⚙️ LTV 정책 관리
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate('admin-listings')}>
            📦 매물 관리
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate('admin-leads')}>
            🔔 구독 관리
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
