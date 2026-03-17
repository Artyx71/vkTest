import { useState, useEffect, useCallback, useRef } from 'react';
import { getMovies } from '../api/kinopoiskApi';
import type { Movie, MovieQueryParams } from '../api/types';
import { useFiltersStore } from '../store/useFiltersStore';

export function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    const { genreId, yearFrom, yearTo, ratingFrom, ratingTo, order, type } = useFiltersStore();

    const fetchMovies = useCallback(async (pageNum: number, reset: boolean) => {
        if (abortRef.current) {
            abortRef.current.abort();
        }
        abortRef.current = new AbortController();

        setLoading(true);
        setError(null);

        try {
            const params: MovieQueryParams = {
                page: pageNum,
                limit: 50,
            };

            if (genreId) params['genres.name'] = String(genreId);

            if (yearFrom && yearTo) {
                params.year = `${yearFrom}-${yearTo}`;
            } else if (yearFrom) {
                params.year = `${yearFrom}-2030`;
            } else if (yearTo) {
                params.year = `1860-${yearTo}`;
            }

            if (ratingFrom !== 0 || ratingTo !== 10) {
                params['rating.kp'] = `${ratingFrom}-${ratingTo}`;
            }

            if (order === 'RATING') {
                params.sortField = 'rating.kp';
            } else if (order === 'NUM_VOTE') {
                params.sortField = 'votes.kp';
            } else if (order === 'YEAR') {
                params.sortField = 'year';
            }
            params.sortType = '-1';

            if (type !== 'ALL') {
                const typeMap: Record<string, string> = {
                    FILM: 'movie',
                    TV_SERIES: 'tv-series',
                    TV_SHOW: 'tv-show',
                    MINI_SERIES: 'animated-series',
                };
                params.type = typeMap[type] || 'movie';
            }

            const data = await getMovies(params);

            // Defensive check for data and docs
            if (!data || !data.docs) {
                if (reset) setMovies([]);
                return;
            }

            setPages(data.pages || 1);

            if (reset) {
                setMovies(data.docs);
            } else {
                setMovies((prev) => [...prev, ...data.docs]);
            }
        } catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }, [genreId, yearFrom, yearTo, ratingFrom, ratingTo, order, type]);

    useEffect(() => {
        setPage(1);
        setMovies([]);
        fetchMovies(1, true);
    }, [fetchMovies]);

    const loadMore = useCallback(() => {
        if (!loading && page < pages) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchMovies(nextPage, false);
        }
    }, [loading, page, pages, fetchMovies]);

    const hasMore = page < pages;

    return { movies, loading, error, loadMore, hasMore };
}
