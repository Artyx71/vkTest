import { useEffect, useRef } from 'react';
import { useMovies } from '../../hooks/useMovies';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { MovieFilters } from '../../components/MovieFilters/MovieFilters';
import { Loader } from '../../components/Loader/Loader';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { CompareBar } from '../../components/CompareBar/CompareBar';
import styles from './MovieListPage.module.css';

function MovieListContent() {
    const { movies, loading, error, loadMore, hasMore } = useMovies();
    const observerTarget = useRef<HTMLDivElement>(null);

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
        <div className={styles.page}>
            <h1 className={styles.title}>Поиск фильмов</h1>
            <MovieFilters />

            {movies.length === 0 && !loading && (
                <div className={styles.empty}>Фильмы не найдены. Попробуйте изменить фильтры.</div>
            )}

            <div className={styles.grid}>
                {movies.map((movie, index) => (
                    <MovieCard key={`${movie.id}-${index}`} movie={movie} />
                ))}
            </div>

            {loading && <Loader />}

            <div ref={observerTarget} className={styles.loadingMore}>
                {!hasMore && movies.length > 0 && 'Вы просмотрели весь список'}
            </div>

            <CompareBar />
        </div>
    );
}

export function MovieListPage() {
    return (
        <ErrorBoundary>
            <MovieListContent />
        </ErrorBoundary>
    );
}
