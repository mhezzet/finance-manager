import { db } from '@/lib/db';

export const getTwoFactorTokenByToken = async (token: string) =>
  db.twoFactorToken.findUnique({ where: { token } });
export const getTwoFactorTokenByEmail = async (email: string) =>
  db.twoFactorToken.findFirst({ where: { email } });
