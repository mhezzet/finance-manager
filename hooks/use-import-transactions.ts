import { create } from 'zustand';

export const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

export type ImportedTransaction = {
  data: any[];
  errors: any[];
  meta: {};
};

export type ImportTransactionState = {
  transactions: ImportedTransaction;
  setTransactions: (values: ImportedTransaction) => void;
  resetTransactions: () => void;
};

export const useImportTransactions = create<ImportTransactionState>((set) => ({
  transactions: INITIAL_IMPORT_RESULTS,
  setTransactions: (values) => set({ transactions: values }),
  resetTransactions: () => set({ transactions: INITIAL_IMPORT_RESULTS }),
}));
