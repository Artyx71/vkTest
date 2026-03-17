import { create } from 'zustand';

interface FavoritesState {
    favorites: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

function loadFavorites(): number[] {
    try {
        const stored = localStorage.getItem('movie-favorites');
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveFavorites(favorites: number[]) {
    localStorage.setItem('movie-favorites', JSON.stringify(favorites));
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
    favorites: loadFavorites(),

    addFavorite: (id) => {
        const updated = [...get().favorites, id];
        saveFavorites(updated);
        set({ favorites: updated });
    },

    removeFavorite: (id) => {
        const updated = get().favorites.filter((f) => f !== id);
        saveFavorites(updated);
        set({ favorites: updated });
    },

    toggleFavorite: (id) => {
        if (get().isFavorite(id)) {
            get().removeFavorite(id);
        } else {
            get().addFavorite(id);
        }
    },

    isFavorite: (id) => get().favorites.includes(id),
}));
