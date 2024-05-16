'use client';
import CurrencyInput from 'react-currency-input-field';
import { Info, MinusCircle, PlusCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IAmountInput {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const AmountInput: React.FC<IAmountInput> = ({ onChange, value, disabled, placeholder }) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue >= 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = () => {
    if (!value) return;
    onChange((parseFloat(value) * -1).toString());
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onReverseValue}
              className={cn(
                'absolute left-1.5 top-1.5 flex items-center justify-center rounded-md bg-slate-400 p-[5px]  transition hover:bg-slate-500',
                isIncome && 'bg-emerald-500  hover:bg-emerald-600',
                isExpense && 'bg-rose-500  hover:bg-rose-600',
              )}
            >
              {!parsedValue && <Info className="size-4 text-white" />}
              {isIncome && <PlusCircle className="size-4 text-white" />}
              {isExpense && <MinusCircle className="size-4 text-white" />}
            </button>
          </TooltipTrigger>
          <TooltipContent>Use [+] for income and [-] for expenses</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        prefix="$"
        placeholder={placeholder}
        value={value}
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onChange}
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {isIncome && 'This will count as income'}
        {isExpense && 'This will count as expense'}
      </p>
    </div>
  );
};
