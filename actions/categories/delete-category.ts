'use server';

import { getCategoryById } from '@/data/category';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { revalidateTag } from 'next/cache';

export const deleteCategory = async (id: string) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: 'Unauthorized' };

  const dbUser = await getUserById(user.id || '');
  if (!dbUser) return { error: 'Unauthorized' };

  const account = await getCategoryById(id, dbUser.id)();

  if (!account) return { error: 'Category not found!' };

  await db.category.delete({ where: { userId: dbUser.id, id } });

  revalidateTag('categories');
  revalidateTag(id);

  return { success: 'Catagories deleted!' };
};
