import { Category } from '@/components/category/columns';
import { create } from 'zustand';

type OmittedCategory = Omit<Category, 'userId'>;

type CategoryModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  category?: OmittedCategory;
  setCategory: (category: OmittedCategory) => void;
  resetCategory: () => void;
};

export const useCategoryModal = create<CategoryModalState>((set) => ({
  isOpen: false,
  category: undefined,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  setCategory: (category) => set({ category }),
  resetCategory: () => set({ category: undefined }),
}));
