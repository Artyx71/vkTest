import { useEffect, useRef, useCallback } from 'react';
import { useMovies } from '../../hooks/useMovies';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { useCompareStore } from '../../store/useCompareStore';
import { MovieListPageUI } from './MovieListPageUI';

function MovieListContent() {
    const { movies, loading, error, loadMore, hasMore } = useMovies();
    const observerTarget = useRef<HTMLDivElement>(null);

    const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
    const favorites = useFavoritesStore((s) => s.favorites);
    const toggleCompare = useCompareStore((s) => s.toggleCompare);
    const selectedCompareIds = useCompareStore((s) => s.selectedIds);

    const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);
    const isCompared = useCallback((id: number) => selectedCompareIds.includes(id), [selectedCompareIds]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loading, loadMore]);

    if (error) {
        throw new Error(error);
    }

    return (
        <MovieListPageUI
            movies={movies}
            loading={loading}
            hasMore={hasMore}
            observerTarget={observerTarget}
            isFavorite={isFavorite}
            isCompared={isCompared}
            onToggleFavorite={toggleFavorite}
            onToggleCompare={toggleCompare}
        />
    );
}

export function MovieListPage() {
    return (
        <ErrorBoundary>
            <MovieListContent />
        </ErrorBoundary>
    );
}
