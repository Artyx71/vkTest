import { create } from 'zustand';

interface CompareState {
    selectedIds: number[];
    toggleCompare: (id: number) => void;
    clearCompare: () => void;
    isSelected: (id: number) => boolean;
}

export const useCompareStore = create<CompareState>((set, get) => ({
    selectedIds: [],

    toggleCompare: (id) => {
        const current = get().selectedIds;
        if (current.includes(id)) {
            set({ selectedIds: current.filter((i) => i !== id) });
        } else {
            set({ selectedIds: [...current, id] });
        }
    },

    clearCompare: () => set({ selectedIds: [] }),

    isSelected: (id) => get().selectedIds.includes(id),
}));
