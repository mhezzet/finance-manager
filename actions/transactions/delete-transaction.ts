'use server';

import { getTransactionById } from '@/data/transactions';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { revalidateTag } from 'next/cache';

export const deleteTransaction = async (id: string) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: 'Unauthorized' };

  const dbUser = await getUserById(user.id || '');
  if (!dbUser) return { error: 'Unauthorized' };

  const transaction = await getTransactionById(id, dbUser.id)();
  if (!transaction) return { error: 'Transaction not found!' };

  await db.transaction.delete({ where: { id } });

  revalidateTag('transactions');
  revalidateTag(id);

  return { success: 'Transaction deleted!' };
};
