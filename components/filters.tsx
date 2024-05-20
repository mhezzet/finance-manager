import { AccountFilter } from '@/components/account-filter';
import { DateFilter } from '@/components/date-filter';
import { getAccounts } from '@/data/space';
import { currentUser } from '@/lib/auth';

interface IFilters {}

export const Filters: React.FC<IFilters> = async (props) => {
  const user = await currentUser();
  const accounts = await getAccounts(user?.id || '');

  return (
    <div className="mt-3 flex flex-col items-center gap-y-2 lg:flex-row lg:gap-x-2 lg:gap-y-0">
      <AccountFilter accounts={accounts} />
      <DateFilter />
    </div>
  );
};
