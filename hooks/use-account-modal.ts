import { Account } from '@/components/space/columns';
import { create } from 'zustand';

type OmittedAccount = Omit<Account, 'userId'>;

type AccountModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  account?: OmittedAccount;
  setAccount: (account: OmittedAccount) => void;
  resetAccount: () => void;
};

export const useAccountModal = create<AccountModalState>((set) => ({
  isOpen: false,
  account: undefined,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  setAccount: (account) => set({ account }),
  resetAccount: () => set({ account: undefined }),
}));
