'use client';

import { deleteAccount } from '@/actions/spaces/delete-account';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAccountModal } from '@/hooks/use-account-modal';
import { useConfirm } from '@/hooks/use-confirm';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface IActions {
  id: string;
  name: string;
}

export const Actions: React.FC<IActions> = ({ id, name }) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this account.',
  );

  const [isPending, startTransition] = useTransition();

  const { setAccount, onOpen } = useAccountModal();

  const onEdit = () => {
    setAccount({ id, name });
    onOpen();
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    startTransition(async () => {
      const { error, success } = await deleteAccount(id);

      if (error) {
        toast.error(error);
      }

      if (success) {
        toast.success('Account Deleted!');
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
