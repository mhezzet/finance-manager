import * as z from 'zod';

export const TransactionSchema = z.object({
  amount: z.string().min(1, { message: 'Amount is required' }),
  payee: z.string().min(1, 'Payee is required'),
  notes: z.string().nullable().optional(),
  date: z.coerce.date({ message: 'Date is required' }),
  accountId: z.string().min(1, { message: 'Account is required' }),
  categoryId: z.string().nullable().optional(),
});
