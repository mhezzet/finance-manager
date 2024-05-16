import { create } from 'zustand';

export type Option = { value: string; label: string };

type NewOptionsState = {
  categories: Option[];
  accounts: Option[];
  setAccounts: (options: Option[]) => void;
  setCategories: (options: Option[]) => void;
};

export const useOptions = create<NewOptionsState>((set) => ({
  accounts: [],
  categories: [],
  setAccounts: (options) => set({ accounts: options }),
  setCategories: (options) => set({ categories: options }),
}));
