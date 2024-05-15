'use server';

import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { revalidateTag } from 'next/cache';

export const deleteBulkAccounts = async (ids: string[]) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: 'Unauthorized' };

  const dbUser = await getUserById(user.id || '');
  if (!dbUser) return { error: 'Unauthorized' };

  const result = await db.space.deleteMany({
    where: {
      userId: user.id,
      id: {
        in: ids,
      },
    },
  });

  revalidateTag('accounts');
  //TODO: revalidate summary

  return { success: 'Accounts deleted' };
};
