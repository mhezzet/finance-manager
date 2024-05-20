'use server';

import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { TransactionSchema } from '@/schemas/transaction';
import { revalidateTag } from 'next/cache';
import * as z from 'zod';

export const updateTransaction = async (
  values: z.infer<typeof TransactionSchema>,
  transactionId: string,
) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: 'Unauthorized' };

  const dbUser = await getUserById(user.id || '');
  if (!dbUser) return { error: 'Unauthorized' };

  const validatedFields = await TransactionSchema.safeParseAsync(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const transaction = await db.transaction.findFirst({
    where: { id: transactionId, space: { userId: dbUser.id } },
  });
  if (!transaction) return { error: 'There is no such a transaction' };

  await db.transaction.update({
    where: { id: transactionId },
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
  revalidateTag(transactionId);
  revalidateTag('summary');

  return { success: 'Account updated!' };
};
