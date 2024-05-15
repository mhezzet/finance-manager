'use client';

import {
  SheetContent,
  Sheet,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from '@/components/ui/sheet';
import { useNewCategory } from '@/hooks/use-create-category';
import { CategoryForm } from '@/components/category/category-form';
import { CreateSpaceSchema } from '@/schemas/space';
import * as z from 'zod';
import { createCategory } from '@/actions/categories/create-category';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface INewCategorySheet {}

export const NewCategorySheet: React.FC<INewCategorySheet> = ({}) => {
  const { isOpen, onClose } = useNewCategory();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof CreateSpaceSchema>) => {
    startTransition(async () => {
      const { error, success } = await createCategory(values);

      if (error) {
        toast.error(error);
      }

      if (success) {
        toast.success('Category Created!');
        onClose();
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="px-2">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>Create a new category to track your transactions.</SheetDescription>
        </SheetHeader>

        <CategoryForm defaultValues={{ name: '' }} onSubmit={onSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  );
};
