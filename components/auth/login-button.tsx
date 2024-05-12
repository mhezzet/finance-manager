'use client';
import { LoginForm } from '@/components/auth/login-form';
import { Button, ButtonProps } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

interface ILoginButton extends ButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton: React.FC<ILoginButton> = ({
  children,
  asChild,
  mode = 'redirect',
  ...props
}) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/login');
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          <Button {...props}>{children}</Button>
        </DialogTrigger>
        <DialogContent className="w-auto border-none bg-transparent p-0">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button onClick={onClick} {...props}>
      {children}
    </Button>
  );
};
