import { db } from '@/lib/db';
import { unstable_cache } from 'next/cache';

export const getCategories = unstable_cache(
  (userId: string) => db.category.findMany({ where: { userId } }),
  ['categories'],
  {
    tags: ['categories'],
    revalidate: 3600,
  },
);

export const getCategoryById = (id: string, userId: string) =>
  unstable_cache(() => db.category.findFirstOrThrow({ where: { id, userId } }), ['category', id], {
    tags: ['category', id],
    revalidate: 3600,
  });
