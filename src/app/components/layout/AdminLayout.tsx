import { ReactNode } from 'react';
import {
  Home,
  Settings,
  Package,
  Bell,
  Building2,
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  currentRoute: string;
  onNavigate: (route: string) => void;
}

/**
 * Admin 페이지 레이아웃 (사이드바 포함)
 */
export default function AdminLayout({
  children,
  currentRoute,
  onNavigate,
}: AdminLayoutProps) {
  const menuItems = [
    {
      id: 'admin-dashboard',
      label: '대시보드',
      icon: Home,
    },
    {
      id: 'admin-ltv',
      label: 'LTV 관리',
      icon: Settings,
    },
    {
      id: 'admin-listings',
      label: '매물 관리',
      icon: Package,
    },
    {
      id: 'admin-leads',
      label: '구독 관리',
      icon: Bell,
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* 사이드바 */}
      <aside className="w-60 border-r bg-sidebar flex flex-col">
        {/* 로고 */}
        <div className="p-6 border-b flex items-center gap-2">
          <Building2 className="w-6 h-6 text-sidebar-primary" />
          <h1 className="text-lg font-semibold text-sidebar-foreground">
            Admin
          </h1>
        </div>

        {/* 메뉴 */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
