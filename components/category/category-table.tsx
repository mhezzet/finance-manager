'use client';

import { DataTable } from '@/components/data-table';
import { Category, columns } from '@/components/category/columns';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { deleteBulkCategories } from '@/actions/categories/bulk-delete';

interface ICategoriesTable {
  categories: Category[];
}

export const CategoriesTable: React.FC<ICategoriesTable> = ({ categories }) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = (ids: string[]) => {
    startTransition(async () => {
      const result = await deleteBulkCategories(ids);

      if (result.error) {
        toast.error(result.error);
      }

      if (result.success) {
        toast.success('Categories has been deleted!');
      }
    });
  };

  return (
    <DataTable
      columns={columns}
      disabled={isPending}
      data={categories}
      filterKey="name"
      onDelete={(rows) => {
        const ids = rows.map((row) => row.original.id);
        onDelete(ids);
      }}
    />
  );
};
