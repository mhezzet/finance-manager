'use server';

import { getAccountById } from '@/data/space';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { CreateSpaceSchema } from '@/schemas/space';
import { revalidateTag } from 'next/cache';
import * as z from 'zod';

export const deleteAccount = async (id: string) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: 'Unauthorized' };

  const dbUser = await getUserById(user.id || '');
  if (!dbUser) return { error: 'Unauthorized' };

  const account = await getAccountById(id, dbUser.id)();

  if (!account) return { error: 'Account not found!' };

  await db.space.delete({ where: { userId: dbUser.id, id } });

  revalidateTag('accounts');
  revalidateTag('transactions');
  revalidateTag(id);
  revalidateTag('summary');

  return { success: 'Account deleted!' };
};
