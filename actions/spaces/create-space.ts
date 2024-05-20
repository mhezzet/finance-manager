'use server';

import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

import { CreateSpaceSchema } from '@/schemas/space';
import { revalidateTag } from 'next/cache';
import * as z from 'zod';

export const createSpace = async (values: z.infer<typeof CreateSpaceSchema>) => {
  const user = await currentUser();
  if (!user || !user.id) return { error: 'Unauthorized' };

  const dbUser = await getUserById(user.id || '');
  if (!dbUser) return { error: 'Unauthorized' };

  const validatedFields = await CreateSpaceSchema.safeParseAsync(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  await db.space.create({
    data: { name: values.name, userId: user.id },
  });

  revalidateTag('accounts');
  revalidateTag('summary');

  return { success: 'Account Created!' };
};
