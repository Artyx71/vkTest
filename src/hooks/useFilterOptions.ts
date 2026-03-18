import { useState, useEffect } from 'react';
import { getGenres } from '../api/kinopoiskApi';
import type { PossibleValue } from '../api/types';

export function useFilterOptions() {
    const [genres, setGenres] = useState<PossibleValue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function fetchFilters() {
            try {
                const data = await getGenres();
                if (!cancelled) {
                    setGenres(data);
                }
            } catch {
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchFilters();

        return () => {
            cancelled = true;
        };
    }, []);

    return { genres, loading };
}
