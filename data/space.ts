import { db } from '@/lib/db';
import { unstable_cache } from 'next/cache';

export const getAccounts = unstable_cache(
  (userId: string) => db.space.findMany({ where: { userId } }),
  ['accounts'],
  {
    tags: ['accounts'],
    revalidate: 3600,
  },
);

export const getAccountById = (id: string, userId: string) =>
  unstable_cache(() => db.space.findFirstOrThrow({ where: { id, userId } }), ['account', id], {
    tags: ['account', id],
    revalidate: 3600,
  });
