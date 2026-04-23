import { ReactNode } from 'react';
import { FileQuestion } from 'lucide-react';
import { Button } from '../ui/button';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * 빈 상태를 표시하는 공통 컴포넌트
 */
export default function EmptyState({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 text-muted-foreground">
        {icon || <FileQuestion className="w-16 h-16" />}
      </div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {description && (
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          {description}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {primaryAction && (
          <Button onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
        )}

        {secondaryAction && (
          <Button variant="outline" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}
