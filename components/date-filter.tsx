'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatDateRange } from '@/lib/utils';
import { format, subDays } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { useQueryState } from 'nuqs';

interface IDateFilter {}

export const DateFilter: React.FC<IDateFilter> = ({}) => {
  const [to, setTo] = useQueryState('to', { shallow: false });
  const [from, setFrom] = useQueryState('from', { shallow: false });

  const defaultTo = new Date('2024-05-28');
  const defaultFrom = new Date('2024-03-28');

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={false}
          size="sm"
          variant="outline"
          className="h-9 w-full rounded-md border-none bg-white/10 px-3 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto"
        >
          <span>{formatDateRange(paramState)}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p--0 w-full lg:w-auto" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={paramState.from}
          selected={paramState}
          onSelect={(dateRange) => {
            setFrom(dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : null);
            setTo(dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : null);
          }}
          numberOfMonths={2}
        />
        <div className="flex w-full items-center gap-x-2 p-4">
          <PopoverClose asChild>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                setFrom(null);
                setTo(null);
              }}
            >
              Reset
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
