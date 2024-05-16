'use server';

import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { revalidateTag } from 'next/cache';

export const deleteBulkTransactions = async (ids: string[]) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: 'Unauthorized' };

  const dbUser = await getUserById(user.id || '');
  if (!dbUser) return { error: 'Unauthorized' };

  await db.transaction.deleteMany({
    where: {
      space: { userId: dbUser.id },
      id: {
        in: ids,
      },
    },
  });

  revalidateTag('transactions');
  //TODO: revalidate summary

  return { success: 'Transaction deleted' };
};
