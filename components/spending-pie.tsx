'use client';

import { PieVariant } from '@/components/pie-variant';
import { RadarVariant } from '@/components/radar-variant';
import { RadialVariant } from '@/components/radial-variant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { FileSearch, Loader2, PieChart, RadarIcon, Target } from 'lucide-react';
import { useState } from 'react';

interface ISpendingPie {
  data: { name: string; value: number }[];
}

export const SpendingPie: React.FC<ISpendingPie> = ({ data }) => {
  const [variant, setVariant] = useState('pie');

  const onTypeChange = (type: string) => {
    setVariant(type);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <CardTitle className="line-clamp-1 text-xl">Categories</CardTitle>
        <Select defaultValue={variant} onValueChange={onTypeChange}>
          <SelectTrigger className="h-9 rounded-md px-3 lg:w-auto">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">
              <div className="flex items-center">
                <PieChart className="mr-2 size-4 shrink-0" />
                <p className="line-clamp-1">Pie chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radar">
              <div className="flex items-center">
                <RadarIcon className="mr-2 size-4 shrink-0" />
                <p className="line-clamp-1">Radar chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radial">
              <div className="flex items-center">
                <Target className="mr-2 size-4 shrink-0" />
                <p className="line-clamp-1">Radial chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[350px] w-full flex-col items-center justify-center gap-y-4">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground">No data for this period</p>
          </div>
        ) : (
          <>
            {variant === 'pie' && <PieVariant data={data} />}
            {variant === 'radar' && <RadarVariant data={data} />}
            {variant === 'radial' && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const SpendingPieLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-full lg:w-[120px]" />
      </CardHeader>
      <CardContent>
        <div className="flex h-[350px] w-full items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
        </div>
      </CardContent>
    </Card>
  );
};
