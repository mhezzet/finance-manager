import { useCategoryModal } from '@/hooks/use-category-modal';
import { cn } from '@/lib/utils';
import { TriangleAlert } from 'lucide-react';
import { Transaction } from '@/components/transactions/columns';
import { useTransactionModal } from '@/hooks/use-transaction-modal';

interface ICategoryColumn {
  category: { name: string; id: string } | null;
  transaction: Transaction;
}

export const CategoryColumn: React.FC<ICategoryColumn> = ({ category, transaction }) => {
  const { onOpen: onOpenCategory, setCategory } = useCategoryModal();
  const { onOpen: onOpenTransaction, setTransaction } = useTransactionModal();

  const onClick = () => {
    if (category) {
      setCategory(category);
      onOpenCategory();
    } else {
      setTransaction(transaction);
      onOpenTransaction();
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex cursor-pointer items-center hover:underline',
        category && 'hover:underline',
        !category && 'text-rose-500',
      )}
    >
      {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {category?.name || 'Uncategorized'}
    </div>
  );
};
