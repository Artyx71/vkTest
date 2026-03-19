import { useState, useEffect } from 'react';
import { useCompareStore } from '../../store/useCompareStore';
import { getMovieById } from '../../api/kinopoiskApi';
import type { MovieDetail } from '../../api/types';
import { CompareBarUI } from './CompareBarUI';

export function CompareBar() {
    const { selectedIds, clearCompare } = useCompareStore();
    const [showModal, setShowModal] = useState(false);
    const [movies, setMovies] = useState<MovieDetail[]>([]);
    const [loading, setLoading] = useState(false);

    const count = selectedIds.length;

    useEffect(() => {
        if (!showModal || count === 0) return;

        let cancelled = false;

        const fetchData = async () => {
            setLoading(true);
            try {
                const results = await Promise.all(
                    selectedIds.map((id) =>
                        getMovieById(id).catch((err) => {
                            console.error(`Failed to fetch movie ${id}:`, err);
                            return null;
                        })
                    )
                );
                if (!cancelled) {
                    setMovies(results.filter((m): m is MovieDetail => m !== null));
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();

        return () => {
            cancelled = true;
        };
    }, [showModal, selectedIds, count]);

    return (
        <CompareBarUI
            count={count}
            showModal={showModal}
            movies={movies}
            loading={loading}
            onToggleModal={setShowModal}
            onClear={clearCompare}
        />
    );
}
