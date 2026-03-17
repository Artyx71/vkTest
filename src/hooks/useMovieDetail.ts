import { useState, useEffect } from 'react';
import { getMovieById } from '../api/kinopoiskApi';
import type { MovieDetail } from '../api/types';

export function useMovieDetail(id: number) {
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchMovie() {
            if (!id) return;

            setLoading(true);
            setError(null);

            try {
                const data = await getMovieById(id);
                if (!cancelled) {
                    setMovie(data);
                }
            } catch (err) {
                if (!cancelled && err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchMovie();

        return () => {
            cancelled = true;
        };
    }, [id]);

    return { movie, loading, error };
}
