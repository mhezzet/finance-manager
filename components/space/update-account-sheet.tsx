'use client';

import { deleteAccount } from '@/actions/spaces/delete-account';
import { updateAccount } from '@/actions/spaces/edit-account';
import { AccountForm } from '@/components/space/account-form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useUpdateAccount } from '@/hooks/use-update-account';
import { CreateSpaceSchema } from '@/schemas/space';
import { useQueryState } from 'nuqs';
import { useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

interface IUpdateAccountSheet {}

export const UpdateAccountSheet: React.FC<IUpdateAccountSheet> = ({}) => {
  const [name, setName] = useQueryState('name');
  const [id, setId] = useQueryState('id');

  const { isOpen, onClose, onOpen } = useUpdateAccount();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!id || !name) return;

    onOpen();
  }, [id, name, onOpen]);

  const onSubmit = (values: z.infer<typeof CreateSpaceSchema>) => {
    startTransition(async () => {
      const { error, success } = await updateAccount(values, id || '');

      if (error) {
        toast.error(error);
      }

      if (success) {
        toast.success('Account Updated!');
        closeHandler();
      }
    });
  };

  const onDelete = (id: string) => {
    startTransition(async () => {
      const { error, success } = await deleteAccount(id || '');

      if (error) {
        toast.error(error);
      }

      if (success) {
        toast.success('Account Deleted!');
        closeHandler();
      }
    });
  };

  const closeHandler = () => {
    onClose();
    setName(null);
    setId(null);
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeHandler}>
      <SheetContent className="px-2">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create a new account to track your transactions.</SheetDescription>
        </SheetHeader>

        <AccountForm
          defaultValues={{ name: name || '' }}
          id={id || ''}
          onSubmit={onSubmit}
          disabled={isPending}
          onDelete={onDelete}
        />
      </SheetContent>
    </Sheet>
  );
};
