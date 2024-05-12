import { Poppins } from 'next/font/google';
import { LoginButton } from '@/components/auth/login-button';
import { cn } from '@/lib/utils';

const poppinsFont = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn('text-6xl font-semibold text-white drop-shadow-md ', poppinsFont.className)}
        >
          🔐Auth
        </h1>
        <p className="text-lg text-white">A Simple authentication service</p>
        <LoginButton variant="secondary" size="lg" asChild>
          Sign in
        </LoginButton>
      </div>
    </main>
  );
}
