'use server';

import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { CreateCategorySchema } from '@/schemas/category';
import { revalidateTag } from 'next/cache';
import * as z from 'zod';

export const createCategory = async (values: z.infer<typeof CreateCategorySchema>) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: 'Unauthorized' };

  const dbUser = await getUserById(user.id || '');
  if (!dbUser) return { error: 'Unauthorized' };

  const validatedFields = await CreateCategorySchema.safeParseAsync(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  await db.category.create({
    data: { name: values.name, userId: user.id },
  });

  revalidateTag('catagories');

  return { success: 'Category Created!' };
};
