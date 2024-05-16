'use client';

import { deleteCategory } from '@/actions/categories/delete-category';
import { updateCategory } from '@/actions/categories/edit-category';
import { CategoryForm } from '@/components/category/category-form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useConfirm } from '@/hooks/use-confirm';
import { useCategoryModal } from '@/hooks/use-category-modal';
import { CreateSpaceSchema } from '@/schemas/space';
import { useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

interface IUpdateCategorySheet {}

export const UpdateCategorySheet: React.FC<IUpdateCategorySheet> = ({}) => {
  const { isOpen, onClose, category, resetCategory } = useCategoryModal();

  const [isPending, startTransition] = useTransition();
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this category',
  );

  const onSubmit = (values: z.infer<typeof CreateSpaceSchema>) => {
    startTransition(async () => {
      const { error, success } = await updateCategory(values, category?.id || '');

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
      const { error, success } = await deleteCategory(id || '');

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
    resetCategory();
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={closeHandler}>
        <SheetContent className="px-2">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an Existing category.</SheetDescription>
          </SheetHeader>

          <CategoryForm
            defaultValues={{ name: category?.name || '' }}
            id={category?.id || ''}
            onSubmit={onSubmit}
            disabled={isPending}
            onDelete={onDelete}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
