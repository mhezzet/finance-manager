import { Separator } from '@/components/ui/separator';
import { formatPercentage, formateCurrency } from '@/lib/utils';
import { format } from 'date-fns';

export const CategoryTooltip: React.FC = ({ active, payload }: any) => {
  if (!active) return null;

  const name = payload[0].payload.name;
  const value = payload[0].value;

  return (
    <div className="overflow-hidden rounded-sm border bg-white shadow-sm">
      <div className="bg-muted p-2 px-3 text-sm text-muted-foreground">{name}</div>
      <Separator />
      <div className="p2 space-y-1 px-3">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 rounded-full bg-rose-500" />
            <p className="text-sm text-muted-foreground">Expense</p>
          </div>
          <p className="text-right text-sm font-medium">{formateCurrency(value * -1)}</p>
        </div>
      </div>
    </div>
  );
};
