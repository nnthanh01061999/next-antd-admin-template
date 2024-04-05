import { createSelectors } from '@/stores/selector';
import { create } from 'zustand';

export type StoreLocationStore = {
    isOpen: boolean;
    scrollIndex?: number;
    open: () => void;
    close: () => void;
    setScrollIndex: (scrollIndex?: number) => void;
};

const useStoreLocationStoreBase = create<StoreLocationStore>((set) => ({
    isOpen: false,
    scrollIndex: 0,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    setScrollIndex: (scrollIndex) => set({ scrollIndex }),
}));

export const useStoreLocationStore = createSelectors(useStoreLocationStoreBase);
