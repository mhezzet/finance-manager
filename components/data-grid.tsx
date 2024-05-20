'use client';
import { DataCard } from '@/components/data-card';
import { Summary } from '@/data/summary';
import { FaPiggyBank } from 'react-icons/fa';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';

interface IDataGrid {
  summary: Summary;
  dateRangeLabel: string;
}

export const DataGrid: React.FC<IDataGrid> = ({ dateRangeLabel, summary }) => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-8 pb-2 lg:grid-cols-3">
      <DataCard
        title="Remaining"
        value={summary.remainingAmount}
        percentageChange={summary.remainingChange}
        icon={FaPiggyBank}
        variant="default"
        dateRangeLabel={dateRangeLabel}
      />
      <DataCard
        title="Income"
        value={summary.incomeAmount}
        percentageChange={summary.inComeChange}
        icon={FaArrowTrendUp}
        variant="default"
        dateRangeLabel={dateRangeLabel}
      />
      <DataCard
        title="Expenses"
        value={summary.expensesAmount}
        percentageChange={summary.expensesChange}
        icon={FaArrowTrendDown}
        variant="default"
        dateRangeLabel={dateRangeLabel}
      />
    </div>
  );
};
