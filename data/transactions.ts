import { db } from '@/lib/db';
import { unstable_cache } from 'next/cache';
import { parse, subDays } from 'date-fns';

export const getTransactions = unstable_cache(
  (userId: string, to?: string, from?: string, accountId?: string) => {
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const startDate = from ? parse(from, 'yyyy-MM-dd', new Date()) : defaultFrom;
    const endDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : defaultTo;

    return db.transaction.findMany({
      where: { spaceId: accountId, space: { userId }, date: { lte: endDate, gte: startDate } },
      include: {
        category: { select: { id: true, name: true } },
        space: { select: { id: true, name: true } },
      },
      orderBy: {
        date: 'desc',
      },
    });
  },
  ['transactions'],
  {
    tags: ['transactions'],
    revalidate: 3600,
  },
);

export const getTransactionById = (id: string, userId: string) =>
  unstable_cache(
    () =>
      db.transaction.findFirstOrThrow({
        where: { id, space: { userId } },
        include: {
          category: { select: { id: true, name: true } },
          space: { select: { id: true, name: true } },
        },
      }),
    ['transaction', id],
    {
      tags: ['transaction', id],
      revalidate: 3600,
    },
  );
