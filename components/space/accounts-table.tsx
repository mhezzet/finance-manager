'use client';

import { deleteBulkAccounts } from '@/actions/spaces/bulk-delete';
import { DataTable } from '@/components/data-table';
import { Account, columns } from '@/components/space/columns';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface IAccountsTable {
  accounts: Account[];
}

export const AccountsTable: React.FC<IAccountsTable> = ({ accounts }) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = (ids: string[]) => {
    startTransition(async () => {
      const result = await deleteBulkAccounts(ids);

      if (result.error) {
        toast.error(result.error);
      }

      if (result.success) {
        toast.success('Accounts has been deleted!');
      }
    });
  };

  return (
    <DataTable
      columns={columns}
      disabled={isPending}
      data={accounts}
      filterKey="name"
      onDelete={(rows) => {
        const ids = rows.map((row) => row.original.id);
        onDelete(ids);
      }}
    />
  );
};
