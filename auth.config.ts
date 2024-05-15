import { getUserByEmail } from '@/data/user';
import { env } from '@/env.mjs';
import { LoginSchema } from '@/schemas/auth';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export default {
  providers: [
    GitHub({ clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET }),
    Google({ clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET }),
    Credentials({
      async authorize(credentials, request) {
        const validatedFields = await LoginSchema.safeParseAsync(credentials);

        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);

        if (!user || !user.password) return null;

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
