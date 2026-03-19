import { useState, useEffect, useCallback } from 'react';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { useCompareStore } from '../../store/useCompareStore';
import { getMovieById } from '../../api/kinopoiskApi';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import type { MovieDetail } from '../../api/types';
import { FavoritesPageUI } from './FavoritesPageUI';

function FavoritesContent() {
    const { favorites, toggleFavorite } = useFavoritesStore();
    const { selectedIds: selectedCompareIds, toggleCompare } = useCompareStore();
    const [movies, setMovies] = useState<MovieDetail[]>([]);
    const [loading, setLoading] = useState(true);

    const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);
    const isCompared = useCallback((id: number) => selectedCompareIds.includes(id), [selectedCompareIds]);

    useEffect(() => {
        let cancelled = false;

        const fetchFavs = async () => {
            if (favorites.length === 0) {
                setMovies([]);
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const results = await Promise.all(
                    favorites.map((id) => getMovieById(id).catch(() => null))
                );
                if (!cancelled) {
                    setMovies(results.filter((m): m is MovieDetail => m !== null));
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchFavs();

        return () => {
            cancelled = true;
        };
    }, [favorites]);

    return (
        <FavoritesPageUI
            movies={movies}
            loading={loading}
            isFavorite={isFavorite}
            isCompared={isCompared}
            onToggleFavorite={toggleFavorite}
            onToggleCompare={toggleCompare}
        />
    );
}

export function FavoritesPage() {
    return (
        <ErrorBoundary>
            <FavoritesContent />
        </ErrorBoundary>
    );
}
