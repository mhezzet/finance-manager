import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

interface IUserContext {
  children: React.ReactNode;
}

export const UserContext: React.FC<IUserContext> = async ({ children }) => {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};
