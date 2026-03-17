import { create } from 'zustand';

interface FiltersState {
    genreId: string | undefined;
    yearFrom: number | undefined;
    yearTo: number | undefined;
    ratingFrom: number;
    ratingTo: number;
    order: 'RATING' | 'NUM_VOTE' | 'YEAR';
    type: 'FILM' | 'TV_SHOW' | 'TV_SERIES' | 'MINI_SERIES' | 'ALL';

    setGenreId: (id: string | undefined) => void;
    setYearFrom: (year: number | undefined) => void;
    setYearTo: (year: number | undefined) => void;
    setRatingFrom: (rating: number) => void;
    setRatingTo: (rating: number) => void;
    setOrder: (order: 'RATING' | 'NUM_VOTE' | 'YEAR') => void;
    setType: (type: 'FILM' | 'TV_SHOW' | 'TV_SERIES' | 'MINI_SERIES' | 'ALL') => void;
    resetFilters: () => void;
}

const defaultState = {
    genreId: undefined,
    yearFrom: undefined,
    yearTo: undefined,
    ratingFrom: 0,
    ratingTo: 10,
    order: 'RATING' as const,
    type: 'ALL' as const,
};

export const useFiltersStore = create<FiltersState>((set) => ({
    ...defaultState,

    setGenreId: (id) => set({ genreId: id }),
    setYearFrom: (year) => set({ yearFrom: year }),
    setYearTo: (year) => set({ yearTo: year }),
    setRatingFrom: (rating) => set({ ratingFrom: rating }),
    setRatingTo: (rating) => set({ ratingTo: rating }),
    setOrder: (order) => set({ order }),
    setType: (type) => set({ type }),
    resetFilters: () => set(defaultState),
}));
