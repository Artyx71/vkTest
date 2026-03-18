import type { Movie } from '../../api/types';
import { MovieFilters } from '../../components/MovieFilters/MovieFilters';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { Loader } from '../../components/Loader/Loader';
import { CompareBar } from '../../components/CompareBar/CompareBar';
import styles from './MovieListPage.module.css';

interface MovieListPageUIProps {
    movies: Movie[];
    loading: boolean;
    hasMore: boolean;
    observerTarget: React.RefObject<HTMLDivElement | null>;
    isFavorite: (id: number) => boolean;
    isCompared: (id: number) => boolean;
    onToggleFavorite: (id: number) => void;
    onToggleCompare: (id: number) => void;
}

export function MovieListPageUI({
    movies,
    loading,
    hasMore,
    observerTarget,
    isFavorite,
    isCompared,
    onToggleFavorite,
    onToggleCompare
}: MovieListPageUIProps) {
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Поиск фильмов</h1>
            <MovieFilters />

            {movies.length === 0 && !loading && (
                <div className={styles.empty}>Фильмы не найдены. Попробуйте изменить фильтры.</div>
            )}

            <div className={styles.grid}>
                {movies.map((movie, index) => (
                    <MovieCard
                        key={`${movie.id}-${index}`}
                        movie={movie}
                        isFavorite={isFavorite(movie.id)}
                        isCompared={isCompared(movie.id)}
                        onToggleFavorite={onToggleFavorite}
                        onToggleCompare={onToggleCompare}
                    />
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
