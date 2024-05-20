import { clsx, type ClassValue } from 'clsx';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertAmountToMilliUnits = (amount: number) => {
  return Math.round(amount * 1000);
};
export const convertAmountFromMilliUnits = (milliUnits: number) => {
  return milliUnits / 1000;
};

export const formateCurrency = (value: number) => {
  return Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
};

export const calculatePercentageChange = (current: number, prev: number) => {
  if (prev === 0) {
    return prev === current ? 0 : 100;
  }

  return +(((current - prev) / prev) * 100).toFixed(2);
};

export const fillMissingDays = (
  activeDays: {
    date: string;
    expenses: number;
    income: number;
  }[],
  startDate: Date,
  endDate: Date,
) => {
  if (activeDays.length === 0) return [];

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((active) => isSameDay(active.date, day));

    if (found) {
      return { date: day, expenses: found.expenses, income: found.income };
    } else {
      return {
        date: day,
        expenses: 0,
        income: 0,
      };
    }
  });

  return transactionsByDay;
};

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export const formatDateRange = (period?: Period) => {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    return `${format(defaultFrom, 'LLL dd')} - ${format(defaultTo, 'LLL dd, y')}`;
  }

  if (period.to) {
    return `${format(period.from, 'LLL dd')} - ${format(period.to, 'LLL dd, y')}`;
  }

  return format(period.from, 'LLL dd, y');
};

export const formatPercentage = (
  percentage: number,
  options: { addPrefix?: boolean } = { addPrefix: false },
) => {
  const result = new Intl.NumberFormat('en-US', {
    style: 'percent',
  }).format(percentage / 100);

  if (options.addPrefix && percentage > 0) {
    return `+${result}`;
  }

  return result;
};
