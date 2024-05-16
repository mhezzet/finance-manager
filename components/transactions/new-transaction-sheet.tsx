'use client';

import {
  SheetContent,
  Sheet,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from '@/components/ui/sheet';
import * as z from 'zod';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { useNewTransaction } from '@/hooks/use-create-transaction';
import { TransactionForm } from './transaction-form';
import { TransactionSchema } from '@/schemas/transaction';
import { createTransaction } from '@/actions/transactions/create-transaction';

interface INewTransactionSheet {}

export const NewTransactionSheet: React.FC<INewTransactionSheet> = ({}) => {
  const { isOpen, onClose } = useNewTransaction();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof TransactionSchema>) => {
    startTransition(async () => {
      const { error, success } = await createTransaction(values);

      if (error) {
        toast.error(error);
      }

      if (success) {
        toast.success('Transaction Created!');
        onClose();
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="px-2">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new transaction.</SheetDescription>
        </SheetHeader>

        <TransactionForm
          defaultValues={{
            amount: '',
            date: new Date(),
            notes: '',
            payee: '',
            accountId: '',
            categoryId: null,
          }}
          onSubmit={onSubmit}
          disabled={isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
