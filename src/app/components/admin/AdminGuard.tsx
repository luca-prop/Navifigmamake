"use client";

import { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
}

/**
 * Admin 권한 체크 Guard 컴포넌트
 */
export default function AdminGuard({ children }: AdminGuardProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Mock 권한 체크 (실제로는 서버에서 인증)
    setTimeout(() => {
      setHasAccess(true); // Demo에서는 항상 접근 허용
      setIsChecking(false);
    }, 500);
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">권한 확인 중...</p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">🚫 접근 권한이 없습니다</h1>
        <p className="text-muted-foreground mb-6">
          관리자 권한이 필요한 페이지입니다
        </p>
        <p className="text-sm text-muted-foreground">3초 후 메인 페이지로 이동합니다...</p>
      </div>
    );
  }

  return <>{children}</>;
}
