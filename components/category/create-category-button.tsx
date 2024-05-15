'use client';

import { Button } from '@/components/ui/button';
import { useNewCategory } from '@/hooks/use-create-category';
import { Plus } from 'lucide-react';

interface ICreateAccountButton {}

export const CreateCategoryButton: React.FC<ICreateAccountButton> = ({}) => {
  const { onOpen } = useNewCategory();

  return (
    <Button size="sm" onClick={onOpen}>
      <Plus className="mr-2 size-4" />
      Add New
    </Button>
  );
};
