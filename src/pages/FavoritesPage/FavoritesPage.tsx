import { useState, useEffect } from 'react';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { getMovieById } from '../../api/kinopoiskApi';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { Loader } from '../../components/Loader/Loader';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import type { MovieDetail } from '../../api/types';
import styles from './FavoritesPage.module.css';

function FavoritesContent() {
    const { favorites } = useFavoritesStore();
    const [movies, setMovies] = useState<MovieDetail[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        if (favorites.length === 0) {
            setMovies([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        Promise.all(
            favorites.map((id) => getMovieById(id).catch(() => null))
        )
            .then((results) => {
                if (!cancelled) {
                    setMovies(results.filter((m): m is MovieDetail => m !== null));
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [favorites]);

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
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}

export function FavoritesPage() {
    return (
        <ErrorBoundary>
            <FavoritesContent />
        </ErrorBoundary>
    );
}
