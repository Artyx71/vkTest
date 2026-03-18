import { useState, useEffect, useCallback, useRef } from 'react';
import { getMovies } from '../api/kinopoiskApi';
import type { Movie, MovieQueryParams } from '../api/types';
import { useFiltersStore } from '../store/useFiltersStore';

export function buildMovieQueryParams(
    page: number,
    filters: {
        genreId: string | undefined;
        yearFrom: number | undefined;
        yearTo: number | undefined;
        ratingFrom: number;
        ratingTo: number;
        order: string;
        type: string;
    }
): MovieQueryParams {
    const params: MovieQueryParams = {
        page,
        limit: 50,
    };

    if (filters.genreId) params['genres.name'] = String(filters.genreId);

    if (filters.yearFrom && filters.yearTo) {
        params.year = `${filters.yearFrom}-${filters.yearTo}`;
    } else if (filters.yearFrom) {
        params.year = `${filters.yearFrom}-2030`;
    } else if (filters.yearTo) {
        params.year = `1860-${filters.yearTo}`;
    }

    if (filters.ratingFrom !== 0 || filters.ratingTo !== 10) {
        params['rating.kp'] = `${filters.ratingFrom}-${filters.ratingTo}`;
    }

    if (filters.order === 'RATING') {
        params.sortField = 'rating.kp';
    } else if (filters.order === 'NUM_VOTE') {
        params.sortField = 'votes.kp';
    } else if (filters.order === 'YEAR') {
        params.sortField = 'year';
    }
    params.sortType = '-1';

    if (filters.type !== 'ALL') {
        const typeMap: Record<string, string> = {
            FILM: 'movie',
            TV_SERIES: 'tv-series',
            TV_SHOW: 'tv-show',
            MINI_SERIES: 'animated-series',
        };
        params.type = typeMap[filters.type] || 'movie';
    }

    return params;
}

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
            const params = buildMovieQueryParams(pageNum, {
                genreId,
                yearFrom,
                yearTo,
                ratingFrom,
                ratingTo,
                order,
                type,
            });

            const data = await getMovies(params);

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
