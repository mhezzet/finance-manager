import { CreateAccountButton } from '@/components/space/create-account-button';
import { getAccounts } from '@/data/space';
import { currentUser } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

import { NextPage } from 'next';
import { Suspense } from 'react';
import { AccountsTable } from '@/components/space/accounts-table';

const AccountsPage: NextPage = async ({}) => {
  const user = await currentUser();
  const accounts = await getAccounts(user?.id || '');

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">Account Page</CardTitle>
          <CreateAccountButton />
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="flex h-[500px] w-full items-center justify-center">
                <Loader2 className="size-6 animate-spin text-slate-300" />
              </div>
            }
          >
            <AccountsTable accounts={accounts} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
