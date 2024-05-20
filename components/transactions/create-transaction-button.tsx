'use client';

import { Button } from '@/components/ui/button';
import { useNewTransaction } from '@/hooks/use-create-transaction';
import { Plus } from 'lucide-react';

interface ICreateTransactionButton {}

export const CreateTransactionButton: React.FC<ICreateTransactionButton> = ({}) => {
  const { onOpen } = useNewTransaction();

  return (
    <Button size="sm" className="w-full lg:w-auto" onClick={onOpen}>
      <Plus className="mr-2 size-4" />
      Add New
    </Button>
  );
};
