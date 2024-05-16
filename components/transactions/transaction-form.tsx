import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { TransactionSchema } from '@/schemas/transaction';
import { useOptions } from '@/hooks/use-options';
import { Select } from '@/components/select';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AmountInput } from '../amount-input';
import { convertAmountToMilliUnits } from '@/lib/utils';

type FormType = z.infer<typeof TransactionSchema>;

interface ITransactionForm {
  id?: string;
  defaultValues: {
    amount: string;
    payee: string;
    notes: string | null;
    date: Date;
    accountId: string;
    categoryId: string | null;
  };
  onDelete?: (id: string) => void;
  onSubmit: (value: FormType) => void;
  disabled?: boolean;
}

export const TransactionForm: React.FC<ITransactionForm> = (props) => {
  const { defaultValues, onDelete, disabled, onSubmit, id } = props;
  const { accounts, categories } = useOptions();

  const form = useForm<FormType>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormType) => {
    const amount = parseFloat(values.amount);
    const amountInMilliUnit = convertAmountToMilliUnits(amount);

    onSubmit({ ...values, amount: amountInMilliUnit.toString() });
  };

  const handleDelete = () => {
    onDelete?.(id || '');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select an account"
                  options={accounts}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select category"
                  options={categories}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="Add a payee" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                  placeholder="0.00"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  value={field.value || ''}
                  onChange={field.onChange}
                  disabled={disabled}
                  placeholder="notes..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? 'Save Changes' : 'Create Transaction'}
        </Button>
        {!!id && (
          <Button
            type="button"
            onClick={handleDelete}
            className="w-full"
            disabled={disabled}
            variant="outline"
          >
            <Trash className="mr-2 size-4" /> Delete Transaction
          </Button>
        )}
      </form>
    </Form>
  );
};
