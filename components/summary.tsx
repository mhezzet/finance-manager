import { DataCharts } from '@/components/data-charts';
import { DataGrid } from '@/components/data-grid';
import { getSummary } from '@/data/summary';
import { currentUser } from '@/lib/auth';
import { formatDateRange } from '@/lib/utils';

interface ISummary {
  accountId?: string;
  to?: string;
  from?: string;
}

export const Summary: React.FC<ISummary> = async ({ accountId, from, to }) => {
  const user = await currentUser();
  const summary = await getSummary(user?.id || '', from, to, accountId);
  const dateRangeLabel = formatDateRange({ from, to });

  return (
    <>
      <DataGrid summary={summary} dateRangeLabel={dateRangeLabel} />
      <DataCharts summary={summary} dateRangeLabel={dateRangeLabel} />
    </>
  );
};
