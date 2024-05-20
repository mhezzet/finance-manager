'use client';

import { useImportTransactions } from '@/hooks/use-import-transactions';
import { useQueryState } from 'nuqs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { ImportTable } from './import-table';
import { convertAmountToMilliUnits } from '@/lib/utils';
import { format, parse } from 'date-fns';
import { useSelectAccount } from '@/hooks/use-select-account';
import { toast } from 'sonner';
import { createBulkTransactions } from '@/actions/transactions/bulk-create';

interface SelectedColumnState {
  [key: string]: string | null;
}

const dateFormat = 'yyyy-MM-dd HH:mm:ss';
const outputFormat = 'yyyy-MM-dd';

const requiredOptions = ['amount', 'date', 'payee'];

interface ITransactionsImport {}

export const TransactionsImport: React.FC<ITransactionsImport> = ({}) => {
  const { transactions, resetTransactions } = useImportTransactions();
  const [_, setView] = useQueryState('view', { shallow: false });
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>({});
  const [SelectAccountConfirmation, confirm] = useSelectAccount();
  const [isPending, startTransaction] = useTransition();

  const onCancelImport = () => {
    resetTransactions();
    setView(null);
  };

  const headers: string[] = transactions.data[0];
  const values = transactions.data.slice(1);

  const onTableHeadSelectChange = (columnIndex: number, value: string | null) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };
      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === 'skip') {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;

      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = async () => {
    const getColumnIndex = (column: string) => {
      return column.split('_')[1];
    };

    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: values
        .map((row) => {
          const transformedRow = row.map((cell: any, index: number) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });

          return transformedRow.every((item: any) => item === null) ? [] : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell: any, index: number) => {
        const header = mappedData.headers[index];

        if (header !== null) {
          acc[header] = cell;
        }

        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMilliUnits(parseFloat(item.amount)).toString(),
      date: parse(item.date, dateFormat, new Date()),
    }));

    const accountId = await confirm();

    if (!accountId) return toast.error('please select an account to continue.');

    const data = formattedData.map((value) => ({ ...value, accountId }));

    startTransaction(async () => {
      const { error, success } = await createBulkTransactions(data);

      if (error) {
        toast.error(error);
      }

      if (success) {
        toast.success('Category Deleted!');

        onCancelImport();
      }
    });
  };

  if (!headers) return null;

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <SelectAccountConfirmation />
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">Import Transactions</CardTitle>
          <div className="flex flex-col items-center gap-x-2 gap-y-2 lg:flex-row">
            <Button
              size="sm"
              onClick={onCancelImport}
              disabled={isPending}
              className="w-full lg:w-auto"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="w-full lg:w-auto"
              disabled={progress < requiredOptions.length || isPending}
              onClick={handleContinue}
            >
              Continue ({progress} / {requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={values}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
