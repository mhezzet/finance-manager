import { CategoryTooltip } from '@/components/category-tooltip';
import { formatPercentage } from '@/lib/utils';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COLORS = ['#0062FF', '#12C6FF', '#FF647F', '#FF9354'];

interface IRadarVariant {
  data: { name: string; value: number }[];
}

export const RadarVariant: React.FC<IRadarVariant> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
        <PolarGrid />
        <PolarAngleAxis style={{ fontSize: '12px' }} dataKey="name" />
        <PolarRadiusAxis style={{ fontSize: '12px' }} />
        <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};
