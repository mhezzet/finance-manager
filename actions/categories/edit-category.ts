'use server';

import { getCategoryById } from '@/data/category';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { CreateCategorySchema } from '@/schemas/category';
import { revalidateTag } from 'next/cache';
import * as z from 'zod';

export const updateCategory = async (values: z.infer<typeof CreateCategorySchema>, id: string) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: 'Unauthorized' };

  const dbUser = await getUserById(user.id || '');
  if (!dbUser) return { error: 'Unauthorized' };

  const validatedFields = await CreateCategorySchema.safeParseAsync(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const category = await getCategoryById(id, dbUser.id)();

  if (!category) return { error: 'Category not found!' };

  await db.category.update({ where: { userId: dbUser.id, id }, data: { name: values.name } });

  revalidateTag('categories');
  revalidateTag('transactions');

  revalidateTag(id);

  return { success: 'Category updated!' };
};
