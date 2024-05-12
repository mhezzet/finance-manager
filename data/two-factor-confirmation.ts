import { db } from '@/lib/db';

export const getTwoFactorConfirmationByUserId = async (userId: string) =>
  db.twoFactorConfirmation.findUnique({ where: { userId } });
