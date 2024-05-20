import { db } from '@/lib/db';
import { calculatePercentageChange, fillMissingDays } from '@/lib/utils';
import { parse, subDays, addDays, differenceInDays } from 'date-fns';
import { unstable_cache } from 'next/cache';

export type Summary = {
  remainingAmount: number;
  remainingChange: number;
  incomeAmount: number;
  inComeChange: number;
  expensesAmount: number;
  expensesChange: number;
  categories: Record<string, number>;
  days: {
    date: Date;
    expenses: number;
    income: number;
  }[];
};

export const getSummary = unstable_cache(
  async (userId: string, from?: string, to?: string, accountId?: string): Promise<Summary> => {
    const defaultTo = addDays(new Date(), 1);
    const defaultFrom = subDays(defaultTo, 30);

    const startDate = from ? parse(from, 'yyyy-MM-dd', new Date()) : defaultFrom;
    const endDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : defaultTo;

    const periodLength = differenceInDays(endDate, startDate) + 1;
    const lastPeriodStart = subDays(startDate, periodLength);
    const lastPeriodEnd = subDays(endDate, periodLength);

    const fetchFinancialDate = async (
      startDate: Date,
      endDate: Date,
    ): Promise<{ income: number; expenses: number; remaining: number }> => {
      const transactions = await db.transaction.findMany({
        where: {
          date: {
            lte: endDate,
            gte: startDate,
          },
          spaceId: accountId,
          space: {
            userId,
          },
        },
      });

      return transactions.reduce(
        (sum, transaction) => {
          const amount = parseFloat(transaction.amount);

          return {
            income: +(amount >= 0 ? sum.income + amount / 1000 : sum.income).toFixed(2),
            expenses: +(amount < 0 ? sum.expenses + amount / 1000 : sum.expenses).toFixed(2),
            remaining: +(sum.remaining + amount / 1000).toFixed(2),
          };
        },
        {
          income: 0,
          expenses: 0,
          remaining: 0,
        },
      );
    };

    const currentPeriod = await fetchFinancialDate(startDate, endDate);
    const lastPeriod = await fetchFinancialDate(lastPeriodStart, lastPeriodEnd);

    const inComeChange = calculatePercentageChange(currentPeriod.income, lastPeriod.income);
    const expensesChange = calculatePercentageChange(currentPeriod.expenses, lastPeriod.expenses);
    const remainingChange = calculatePercentageChange(
      currentPeriod.remaining,
      lastPeriod.remaining,
    );

    const transactions = await db.transaction.findMany({
      where: {
        date: {
          lte: endDate,
          gte: startDate,
        },
        spaceId: accountId,
        space: {
          userId,
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const categories = transactions.reduce(
      (categories, transaction) => {
        const categoryName = transaction.category?.name || 'other';
        const categoryAmount = categories[categoryName] || 0;
        const transactionAmount = +(parseFloat(transaction.amount) / 1000).toFixed(2);

        return {
          ...categories,
          [categoryName]:
            categoryAmount + (transactionAmount < 0 ? Math.abs(transactionAmount) : 0),
        };
      },
      {} as Record<string, number>,
    );

    const activities = transactions.reduce(
      (acc, transaction) => {
        const date = transaction.date.toISOString().split('T')[0];
        const amount = +(parseFloat(transaction.amount) / 1000).toFixed(2);

        return {
          ...acc,
          [date]: acc[date] ? [...acc[date], amount] : [amount],
        };
      },
      {} as Record<string, number[]>,
    );

    const activeDays = Object.entries(activities).map(([date, amounts]) => {
      const expenses = amounts
        .filter((amount) => amount < 0)
        .reduce((sum, amount) => sum + Math.abs(amount), 0);
      const income = amounts
        .filter((amount) => amount >= 0)
        .reduce((sum, amount) => sum + amount, 0);

      return { date, expenses, income };
    });

    const days = fillMissingDays(activeDays, startDate, endDate);

    return {
      remainingAmount: currentPeriod.remaining,
      remainingChange,
      incomeAmount: currentPeriod.income,
      inComeChange,
      expensesAmount: currentPeriod.expenses,
      expensesChange,
      categories,
      days,
    };
  },
  ['summary'],
  {
    tags: ['summary'],
    revalidate: 3600,
  },
);
