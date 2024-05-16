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
import { useAccountModal } from '@/hooks/use-account-modal';
import { useConfirm } from '@/hooks/use-confirm';
import { CreateSpaceSchema } from '@/schemas/space';
import { useTransition } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

interface IUpdateAccountSheet {}

export const UpdateAccountSheet: React.FC<IUpdateAccountSheet> = ({}) => {
  const { isOpen, onClose, account, resetAccount } = useAccountModal();

  const [isPending, startTransition] = useTransition();
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this account',
  );

  const onSubmit = (values: z.infer<typeof CreateSpaceSchema>) => {
    startTransition(async () => {
      const { error, success } = await updateAccount(values, account?.id || '');

      if (error) {
        toast.error(error);
      }

      if (success) {
        toast.success('Account Updated!');
        closeHandler();
      }
    });
  };

  const onDelete = async (id: string) => {
    const ok = await confirm();
    if (!ok) return;
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
    resetAccount();
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={closeHandler}>
        <SheetContent className="px-2">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an Existing account.</SheetDescription>
          </SheetHeader>

          <AccountForm
            defaultValues={{ name: account?.name || '' }}
            id={account?.id || ''}
            onSubmit={onSubmit}
            disabled={isPending}
            onDelete={onDelete}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
