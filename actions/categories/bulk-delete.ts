'use server';

import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { revalidateTag } from 'next/cache';

export const deleteBulkCategories = async (ids: string[]) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: 'Unauthorized' };

  const dbUser = await getUserById(user.id || '');
  if (!dbUser) return { error: 'Unauthorized' };

  const result = await db.category.deleteMany({
    where: {
      userId: user.id,
      id: {
        in: ids,
      },
    },
  });

  revalidateTag('categories');
  //TODO: revalidate summary

  return { success: 'Category deleted' };
};
