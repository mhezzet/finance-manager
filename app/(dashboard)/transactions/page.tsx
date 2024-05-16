import { currentUser } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

import { NextPage } from 'next';
import { Suspense } from 'react';
import { CreateTransactionButton } from '@/components/transactions/create-transaction-button';
import { TransactionsTable } from '@/components/transactions/transaction-table';
import { getTransactions } from '@/data/transactions';
import { getAccounts } from '@/data/space';
import { getCategories } from '@/data/category';

const TransactionPage: NextPage = async ({}) => {
  const user = await currentUser();
  const transactions = await getTransactions(user?.id || '');
  const accounts = await getAccounts(user?.id || '');
  const categories = await getCategories(user?.id || '');

  const accountsOptions = accounts.map((account) => ({ value: account.id, label: account.name }));
  const categoriesOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">Transactions History</CardTitle>
          <CreateTransactionButton />
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="flex h-[500px] w-full items-center justify-center">
                <Loader2 className="size-6 animate-spin text-slate-300" />
              </div>
            }
          >
            <TransactionsTable
              accountsOptions={accountsOptions}
              categoriesOptions={categoriesOptions}
              transactions={transactions}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionPage;
