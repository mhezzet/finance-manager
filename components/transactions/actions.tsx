'use client';

import { deleteCategory } from '@/actions/categories/delete-category';
import { deleteTransaction } from '@/actions/transactions/delete-transaction';
import { Transaction } from '@/components/transactions/columns';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useConfirm } from '@/hooks/use-confirm';
import { useTransactionModal } from '@/hooks/use-transaction-modal';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface IActions {
  transaction: Transaction;
}

export const Actions: React.FC<IActions> = ({ transaction }) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this transaction.',
  );

  const { setTransaction, onOpen } = useTransactionModal();

  const [isPending, startTransition] = useTransition();

  const onEdit = () => {
    setTransaction(transaction);
    onOpen();
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    startTransition(async () => {
      const { error, success } = await deleteTransaction(transaction.id);

      if (error) {
        toast.error(error);
      }

      if (success) {
        toast.success('Transaction Deleted!');
      }
    });
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={isPending} onClick={onEdit}>
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isPending} onClick={onDelete}>
            <Trash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
