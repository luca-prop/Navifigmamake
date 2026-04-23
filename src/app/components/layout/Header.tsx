import { Building2 } from 'lucide-react';

interface HeaderProps {
  showNav?: boolean;
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

/**
 * 공통 헤더 컴포넌트
 */
export default function Header({ showNav = false, currentRoute, onNavigate }: HeaderProps) {
  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold">재개발 구역 검색</h1>
        </div>

        {showNav && onNavigate && (
          <nav className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentRoute === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              홈
            </button>
            <button
              onClick={() => onNavigate('search-results')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentRoute === 'search-results' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              검색
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
