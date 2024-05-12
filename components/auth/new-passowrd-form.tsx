'use client';
import { newPassword } from '@/actions/new-password';
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
import { NewPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface INewPasswordForm {}

export const NewPasswordForm: React.FC<INewPasswordForm> = ({}) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [successMessage, setSuccessMessage] = useState<string | undefined>('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setErrorMessage('');
    setSuccessMessage('');

    startTransition(() =>
      newPassword(values, token).then((data) => {
        setErrorMessage(data.error);
        setSuccessMessage(data.success);
      }),
    );
  };

  return (
    <CardContainer
      headerLabel="Enter a new password"
      backButtonLabel="Back to login?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormErrors message={errorMessage} />
            <FormSuccess message={successMessage} />
            <Button disabled={isPending} type="submit" className="w-full">
              Reset password
            </Button>
          </div>
        </form>
      </Form>
    </CardContainer>
  );
};
