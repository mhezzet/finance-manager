'use client';
import { login } from '@/actions/auth/login';
import { CardContainer } from '@/components/auth/card-container';
import { FormErrors } from '@/components/form-errors';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RocketIcon } from '@radix-ui/react-icons';

interface ILoginForm {}

export const LoginForm: React.FC<ILoginForm> = ({}) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [successMessage, setSuccessMessage] = useState<string | undefined>('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const searchParams = useSearchParams();
  const urlLinAccountError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : '';
  const callbackUrl = searchParams.get('callbackUrl');

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: 'test@test.com',
      password: '123456',
    },
    shouldUnregister: false,
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setErrorMessage('');
    setSuccessMessage('');

    startTransition(async () => {
      const response = await login(values, callbackUrl);

      if (response?.error) {
        form.reset();
        setErrorMessage(response?.error);
      }

      if (response?.success) {
        form.reset();
        setSuccessMessage(response?.success);
      }

      if (response?.email) {
        form.setValue('email', response?.email);
      }

      if (response?.password) {
        form.setValue('password', response?.password);
      }

      if (response?.twoFactor) {
        setShowTwoFactor(true);
      }
    });
  };

  return (
    <CardContainer
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Testing User!</AlertTitle>
            <AlertDescription>
              <p>Email: test@test.com</p>
              <p>Password: 123456</p>
            </AlertDescription>
          </Alert>
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123456" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="john.doe@example.com" type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="******" type="password" />
                      </FormControl>
                      <Button variant="link" asChild size="sm" className="px-0 font-normal">
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormErrors message={errorMessage || urlLinAccountError} />
            <FormSuccess message={successMessage} />
            <Button disabled={isPending} type="submit" className="w-full">
              {showTwoFactor ? 'Confirm' : 'Login'}
            </Button>
          </div>
        </form>
      </Form>
    </CardContainer>
  );
};
