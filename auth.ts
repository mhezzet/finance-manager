import authConfig from '@/auth.config';
import { getAccountByUserId } from '@/data/account';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getUserById } from '@/data/user';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;

      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) {
        return false;
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id);

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({ where: { id: twoFactorConfirmation.id } });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.isOauth = token.isOauth;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);
      if (!user) return token;

      const account = await getAccountByUserId(user.id);

      token.email = user.email;
      token.name = user.name;
      token.role = user.role;
      token.isTwoFactorEnabled = user.isTwoFactorEnabled;
      token.isOauth = !!account;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
