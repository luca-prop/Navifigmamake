import { Alert, AlertDescription } from '../ui/alert';
import { ShieldAlert } from 'lucide-react';

/**
 * 패스코드 불일치 시 표시되는 접근 차단 Alert
 */
export default function AccessDeniedAlert() {
  return (
    <Alert variant="destructive" className="mb-6">
      <ShieldAlert className="h-4 w-4" />
      <AlertDescription>
        🚫 유효하지 않은 접근 코드입니다. 관리자에게 문의하세요.
      </AlertDescription>
    </Alert>
  );
}
