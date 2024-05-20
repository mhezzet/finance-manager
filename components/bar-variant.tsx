import { CustomTooltip } from '@/components/custom-tooltip';
import { format } from 'date-fns';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

interface IBarVariant {
  data: {
    date: Date;
    expenses: number;
    income: number;
  }[];
}

export const BarVariant: React.FC<IBarVariant> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, 'dd MMM')}
          style={{ fontSize: '12px' }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="income" fill="#3d82f6" className="drop-shadow-sm" />
        <Bar dataKey="expenses" fill="#f43f5e" className="drop-shadow-sm" />
      </BarChart>
    </ResponsiveContainer>
  );
};