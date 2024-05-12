import { db } from '@/lib/db';

export const getPasswordResetTokenByToken = async (token: string) =>
  db.passwordResetToken.findUnique({ where: { token } });

export const getPasswordResetTokenByEmail = async (email: string) =>
  db.passwordResetToken.findFirst({ where: { email } });
