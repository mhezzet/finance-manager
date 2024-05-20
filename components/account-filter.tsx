'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQueryState } from 'nuqs';

interface IAccountFilter {
  accounts: {
    id: string;
    name: string;
    userId: string;
  }[];
}

export const AccountFilter: React.FC<IAccountFilter> = ({ accounts }) => {
  const [accountId, setAccountId] = useQueryState('accountId', { shallow: false });

  return (
    <Select
      value={accountId || 'all'}
      onValueChange={(value) => setAccountId(value === 'all' ? null : value)}
    >
      <SelectTrigger className="h-9 w-full rounded-md border-none bg-white/10 px-3 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto">
        <SelectValue placeholder="Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All accounts</SelectItem>
        {accounts.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
