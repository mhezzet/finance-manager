import { Transaction } from '@/components/transactions/columns';
import { create } from 'zustand';

type TransactionModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  transaction?: Transaction;
  setTransaction: (transaction: Transaction) => void;
  resetTransaction: () => void;
};

export const useTransactionModal = create<TransactionModalState>((set) => ({
  isOpen: false,
  transaction: undefined,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  setTransaction: (transaction) => set({ transaction }),
  resetTransaction: () => set({ transaction: undefined }),
}));
