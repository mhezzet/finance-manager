'use client';

import { DataTable } from '@/components/data-table';
import { Transaction, columns } from '@/components/transactions/columns';
import { useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import { deleteBulkTransactions } from '@/actions/transactions/bulk-delete';
import { Option, useOptions } from '@/hooks/use-options';

interface ITransactionsTable {
  transactions: Transaction[];
  accountsOptions: Option[];
  categoriesOptions: Option[];
}

export const TransactionsTable: React.FC<ITransactionsTable> = ({
  transactions,
  accountsOptions,
  categoriesOptions,
}) => {
  const [isPending, startTransition] = useTransition();
  const { setAccounts, setCategories } = useOptions();

  const onDelete = (ids: string[]) => {
    startTransition(async () => {
      const result = await deleteBulkTransactions(ids);

      if (result.error) {
        toast.error(result.error);
      }

      if (result.success) {
        toast.success('Transactions has been deleted!');
      }
    });
  };

  useEffect(() => {
    setAccounts(accountsOptions);
    setCategories(categoriesOptions);
  }, [accountsOptions, categoriesOptions, setAccounts, setCategories]);

  return (
    <DataTable
      columns={columns}
      disabled={isPending}
      data={transactions}
      filterKey="payee"
      onDelete={(rows) => {
        const ids = rows.map((row) => row.original.id);
        onDelete(ids);
      }}
    />
  );
};
