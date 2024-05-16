import { clsx, type ClassValue } from 'clsx';
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
