'use client';

import { deleteTransaction } from '@/actions/transactions/delete-transaction';
import { updateTransaction } from '@/actions/transactions/edit-transaction';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useConfirm } from '@/hooks/use-confirm';
import { useTransactionModal } from '@/hooks/use-transaction-modal';
import { TransactionSchema } from '@/schemas/transaction';
import { useTransition } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';
import { TransactionForm } from './transaction-form';
import { convertAmountFromMilliUnits } from '@/lib/utils';

interface IUpdateTransactionSheet {}

export const UpdateTransactionSheet: React.FC<IUpdateTransactionSheet> = ({}) => {
  const { isOpen, onClose, onOpen, transaction, resetTransaction } = useTransactionModal();
  const [isPending, startTransition] = useTransition();
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this category',
  );

  const onSubmit = (values: z.infer<typeof TransactionSchema>) => {
    startTransition(async () => {
      const { error, success } = await updateTransaction(values, transaction?.id || '');

      if (error) {
        toast.error(error);
      }

      if (success) {
        toast.success('Category Updated!');
        closeHandler();
      }
    });
  };

  const onDelete = async (id: string) => {
    const ok = await confirm();
    if (!ok) return;
    startTransition(async () => {
      const { error, success } = await deleteTransaction(transaction?.id || '');

      if (error) {
        toast.error(error);
      }

      if (success) {
        toast.success('Category Deleted!');
        closeHandler();
      }
    });
  };

  const closeHandler = () => {
    onClose();
    resetTransaction();
  };

  if (!transaction) return null;

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={closeHandler}>
        <SheetContent className="px-2">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an Existing transaction.</SheetDescription>
          </SheetHeader>

          <TransactionForm
            defaultValues={{
              amount: convertAmountFromMilliUnits(parseFloat(transaction.amount)).toString(),
              date: transaction.date,
              notes: transaction.notes,
              payee: transaction.payee,
              accountId: transaction.spaceId,
              categoryId: transaction.categoryId,
            }}
            id={transaction.id}
            onSubmit={onSubmit}
            disabled={isPending}
            onDelete={onDelete}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
