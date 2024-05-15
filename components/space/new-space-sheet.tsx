'use client';

import {
  SheetContent,
  Sheet,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from '@/components/ui/sheet';
import { useNewAccount } from '@/hooks/use-create-account';
import { AccountForm } from '@/components/space/account-form';
import { CreateSpaceSchema } from '@/schemas/space';
import * as z from 'zod';
import { createSpace } from '@/actions/spaces/create-space';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface INewSpaceSheet {}

export const NewSpaceSheet: React.FC<INewSpaceSheet> = ({}) => {
  const { isOpen, onClose } = useNewAccount();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof CreateSpaceSchema>) => {
    startTransition(async () => {
      const { error, success } = await createSpace(values);

      if (error) {
        toast.error(error);
      }

      if (success) {
        toast.success('Account Created!');
        onClose();
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="px-2">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create a new account to track your transactions.</SheetDescription>
        </SheetHeader>

        <AccountForm defaultValues={{ name: '' }} onSubmit={onSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  );
};
