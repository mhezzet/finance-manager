import { db } from '@/lib/db';

export const getVerificationTokenByEmail = (email: string) =>
  db.verificationToken.findFirst({ where: { email } });

export const getVerificationTokenByToken = (token: string) =>
  db.verificationToken.findUnique({ where: { token } });
