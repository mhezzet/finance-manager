'use server';

import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { TransactionSchema } from '@/schemas/transaction';
import * as z from 'zod';

import { revalidateTag } from 'next/cache';

export const createBulkTransactions = async (data: z.infer<typeof TransactionSchema>[]) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: 'Unauthorized' };

  const dbUser = await getUserById(user.id || '');
  if (!dbUser) return { error: 'Unauthorized' };

  await db.transaction.createMany({
    data: data.map((d) => ({
      spaceId: d.accountId,
      amount: d.amount,
      date: d.date,
      payee: d.payee,
    })),
  });

  revalidateTag('transactions');
  revalidateTag('summary');

  return { success: 'Transactions created' };
};
