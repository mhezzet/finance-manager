import { Navbar } from '@/app/(protected)/_components/navbar';
import { auth } from '@/auth';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';

const ProtectedLayout: NextPage<Readonly<{ children: React.ReactNode }>> = async ({ children }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
