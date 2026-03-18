import type { MovieDetail } from '../../api/types';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { Loader } from '../../components/Loader/Loader';
import styles from './FavoritesPage.module.css';

interface FavoritesPageUIProps {
    movies: MovieDetail[];
    loading: boolean;
    isFavorite: (id: number) => boolean;
    isCompared: (id: number) => boolean;
    onToggleFavorite: (id: number) => void;
    onToggleCompare: (id: number) => void;
}

export function FavoritesPageUI({
    movies,
    loading,
    isFavorite,
    isCompared,
    onToggleFavorite,
    onToggleCompare
}: FavoritesPageUIProps) {
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Избранное</h1>

            {loading && <Loader />}

            {!loading && movies.length === 0 && (
                <div className={styles.empty}>
                    В избранном пока нет фильмов. Возвращайтесь на главную страницу, чтобы добавить!
                </div>
            )}

            {!loading && movies.length > 0 && (
                <div className={styles.grid}>
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isFavorite={isFavorite(movie.id)}
                            isCompared={isCompared(movie.id)}
                            onToggleFavorite={onToggleFavorite}
                            onToggleCompare={onToggleCompare}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
