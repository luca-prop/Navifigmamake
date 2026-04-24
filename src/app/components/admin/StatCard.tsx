import { Card } from '../ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
  changeLabel?: string;
}

/**
 * Admin 대시보드 통계 카드
 */
export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeLabel,
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <Icon className="w-5 h-5 text-primary" />
      </div>

      <div className="space-y-2">
        <p className="text-3xl font-bold">{value}</p>

        {change !== undefined && (
          <div className="flex items-center gap-1 text-sm">
            {isPositive && (
              <>
                <TrendingUp className="w-4 h-4 text-[--color-success-600]" />
                <span className="text-[--color-success-600] font-medium">
                  +{change}
                </span>
              </>
            )}
            {isNegative && (
              <>
                <TrendingDown className="w-4 h-4 text-destructive" />
                <span className="text-destructive font-medium">{change}</span>
              </>
            )}
            {change === 0 && (
              <span className="text-muted-foreground font-medium">0</span>
            )}
            {changeLabel && (
              <span className="text-muted-foreground ml-1">{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
