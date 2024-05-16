import { create } from 'zustand';

type NewTransactionState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  categories: { value: string; label: string }[];
  accounts: { value: string; label: string }[];
};

export const useNewTransaction = create<NewTransactionState>((set) => ({
  isOpen: false,
  accounts: [],
  categories: [],
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
