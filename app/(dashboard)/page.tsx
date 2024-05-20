import { ChartLoading } from '@/components/chart';
import { DataCardLoading } from '@/components/data-card';
import { SpendingPieLoading } from '@/components/spending-pie';
import { Summary } from '@/components/summary';
import { NextPage } from 'next';
import { Suspense } from 'react';

interface IHomePage {
  searchParams: {
    from?: string;
    to?: string;
    accountId?: string;
  };
}

const HomePage: NextPage<IHomePage> = ({ searchParams }) => {
  const { from, to, accountId } = searchParams;

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Suspense
        fallback={
          <>
            <div className="mb-8 grid grid-cols-1 gap-8 pb-2 lg:grid-cols-3">
              <DataCardLoading />
              <DataCardLoading />
              <DataCardLoading />
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
              <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                <ChartLoading />
              </div>
              <div className="col-span-1 lg:col-span-3 xl:col-span-2">
                <SpendingPieLoading />
              </div>
            </div>
          </>
        }
      >
        <Summary accountId={accountId} from={from} to={to} />
      </Suspense>
    </div>
  );
};

export default HomePage;
