import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatPercentage, formateCurrency } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { IconType } from 'react-icons';
import { CountUp } from '@/components/count-up';
import { Skeleton } from '@/components/ui/skeleton';

const boxVariant = cva('shrink-0 rounded-md p-3', {
  variants: {
    variant: {
      default: 'bg-blue-500/20',
      success: 'bg-emerald-500/20',
      danger: 'bg-rose-500/20',
      warning: 'bg-yellow-500/20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const iconVariant = cva('size-6', {
  variants: {
    variant: {
      default: 'fill-blue-500',
      success: 'fill-emerald-500',
      danger: 'fill-rose-500',
      warning: 'fill-yellow-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

interface IDataCard extends BoxVariants, IconVariants {
  title: string;
  value: number;
  percentageChange: number;
  icon: IconType;
  dateRangeLabel: string;
}

export const DataCard: React.FC<IDataCard> = (props) => {
  const { dateRangeLabel, icon: Icon, title, percentageChange, value, variant } = props;
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="line-clamp-1 text-2xl">{title}</CardTitle>
          <CardDescription className="line-clamp-1">{dateRangeLabel}</CardDescription>
        </div>
        <div className={boxVariant({ variant })}>
          <Icon className={iconVariant({ variant })} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="mb-2 line-clamp-1 break-all text-2xl font-bold">
          <CountUp
            preserveValue
            start={0}
            end={value || 0}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formateCurrency}
          />
        </h1>
        <p
          className={cn(
            'line-clamp-1 text-sm text-muted-foreground',
            percentageChange > 0 && 'text-emerald-500',
            percentageChange < 0 && 'text-rose-500',
          )}
        >
          {formatPercentage(percentageChange, { addPrefix: true })} from last period
        </p>
      </CardContent>
    </Card>
  );
};

export const DataCardLoading = () => {
  return (
    <Card className="h-[192px] border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="size-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-2 h-10 w-24 shrink-0" />
        <Skeleton className="h-4 w-40 shrink-0" />
      </CardContent>
    </Card>
  );
};
