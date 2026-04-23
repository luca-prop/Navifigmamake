import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { getDaysAgo, formatDate } from '../../utils/formatters';
import { DATA_FRESHNESS_THRESHOLD } from '../../utils/constants';

interface DataSyncAlertProps {
  lastSyncedAt: string;
}

/**
 * 데이터 신선도 경고 Alert 컴포넌트
 * 마지막 동기화 날짜가 30일을 초과한 경우 표시
 */
export default function DataSyncAlert({ lastSyncedAt }: DataSyncAlertProps) {
  const daysAgo = getDaysAgo(lastSyncedAt);

  if (daysAgo <= DATA_FRESHNESS_THRESHOLD) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        ⚠️ 마지막 데이터 갱신일: {formatDate(lastSyncedAt)} ({daysAgo}일 전).
        데이터가 최신이 아닐 수 있습니다.
      </AlertDescription>
    </Alert>
  );
}
