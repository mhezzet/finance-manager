'use server';

import { signOut } from '@/auth';

export const logout = () => signOut({ redirect: true, redirectTo: '/auth/login' });
