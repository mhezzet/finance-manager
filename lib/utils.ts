import { clsx, type ClassValue } from 'clsx';
import { eachDayOfInterval, isSameDay } from 'date-fns';
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
