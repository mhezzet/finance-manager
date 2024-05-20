'use server';

import { getAccountById } from '@/data/space';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { TransactionSchema } from '@/schemas/transaction';
import { revalidateTag } from 'next/cache';
import * as z from 'zod';

export const createTransaction = async (values: z.infer<typeof TransactionSchema>) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: 'Unauthorized' };

  const dbUser = await getUserById(user.id || '');
  if (!dbUser) return { error: 'Unauthorized' };

  const validatedFields = await TransactionSchema.safeParseAsync(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const account = await getAccountById(values.accountId, dbUser.id)();
  if (!account) return { error: 'Unauthorized' };

  await db.transaction.create({
    data: {
      amount: values.amount,
      date: values.date,
      notes: values.notes,
      payee: values.payee,
      spaceId: values.accountId,
      categoryId: values.categoryId,
    },
  });

  revalidateTag('transactions');
  revalidateTag('summary');

  return { success: 'Transaction Created!' };
};
