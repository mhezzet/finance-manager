'use client';
import { Chart } from '@/components/chart';
import { SpendingPie } from '@/components/spending-pie';
import { Summary } from '@/data/summary';

interface IDataCharts {
  summary: Summary;
  dateRangeLabel: string;
}

export const DataCharts: React.FC<IDataCharts> = ({ summary }) => {
  const categories = Object.entries(summary.categories).map(([categoryName, value]) => ({
    name: categoryName,
    value,
  }));
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={summary.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={categories} />
      </div>
    </div>
  );
};
