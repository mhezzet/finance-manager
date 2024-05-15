'use client';

import { Button } from '@/components/ui/button';
import { useNewAccount } from '@/hooks/use-create-account';
import { Plus } from 'lucide-react';

interface ICreateAccountButton {}

export const CreateAccountButton: React.FC<ICreateAccountButton> = ({}) => {
  const { onOpen } = useNewAccount();

  return (
    <Button size="sm" onClick={onOpen}>
      <Plus className="mr-2 size-4" />
      Add New
    </Button>
  );
};
