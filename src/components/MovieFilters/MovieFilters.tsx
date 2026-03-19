import { useState, useEffect } from 'react';
import { useFiltersStore } from '../../store/useFiltersStore';
import { useFilterOptions } from '../../hooks/useFilterOptions';
import { useDebounce } from '../../hooks/useDebounce';
import { MovieFiltersUI } from './MovieFiltersUI';

export function MovieFilters() {
    const {
        genreId, yearFrom, yearTo, ratingFrom, ratingTo, order, type,
        setGenreId, setYearFrom, setYearTo, setRatingFrom, setRatingTo,
        setOrder, setType, resetFilters,
    } = useFiltersStore();

    const { genres } = useFilterOptions();

    const [localYearFrom, setLocalYearFrom] = useState<number | undefined>(yearFrom);
    const [localYearTo, setLocalYearTo] = useState<number | undefined>(yearTo);
    const [localRatingFrom, setLocalRatingFrom] = useState<number>(ratingFrom);
    const [localRatingTo, setLocalRatingTo] = useState<number>(ratingTo);

    const [prevYearFrom, setPrevYearFrom] = useState(yearFrom);
    const [prevYearTo, setPrevYearTo] = useState(yearTo);
    const [prevRatingFrom, setPrevRatingFrom] = useState(ratingFrom);
    const [prevRatingTo, setPrevRatingTo] = useState(ratingTo);

    if (yearFrom !== prevYearFrom) {
        setPrevYearFrom(yearFrom);
        setLocalYearFrom(yearFrom);
    }
    if (yearTo !== prevYearTo) {
        setPrevYearTo(yearTo);
        setLocalYearTo(yearTo);
    }
    if (ratingFrom !== prevRatingFrom) {
        setPrevRatingFrom(ratingFrom);
        setLocalRatingFrom(ratingFrom);
    }
    if (ratingTo !== prevRatingTo) {
        setPrevRatingTo(ratingTo);
        setLocalRatingTo(ratingTo);
    }

    const debouncedYearFrom = useDebounce(localYearFrom, 500);
    const debouncedYearTo = useDebounce(localYearTo, 500);
    const debouncedRatingFrom = useDebounce(localRatingFrom, 500);
    const debouncedRatingTo = useDebounce(localRatingTo, 500);

    useEffect(() => {
        if (debouncedYearFrom === undefined || (debouncedYearFrom >= 1860 && debouncedYearFrom <= 2100)) {
            setYearFrom(debouncedYearFrom);
        }
    }, [debouncedYearFrom, setYearFrom]);

    useEffect(() => {
        if (debouncedYearTo === undefined || (debouncedYearTo >= 1860 && debouncedYearTo <= 2100)) {
            setYearTo(debouncedYearTo);
        }
    }, [debouncedYearTo, setYearTo]);

    useEffect(() => {
        setRatingFrom(debouncedRatingFrom);
    }, [debouncedRatingFrom, setRatingFrom]);

    useEffect(() => {
        setRatingTo(debouncedRatingTo);
    }, [debouncedRatingTo, setRatingTo]);

    return (
        <MovieFiltersUI
            genreId={genreId}
            yearFrom={yearFrom}
            yearTo={yearTo}
            ratingFrom={ratingFrom}
            ratingTo={ratingTo}
            order={order}
            type={type}
            genres={genres}
            localYearFrom={localYearFrom}
            localYearTo={localYearTo}
            localRatingFrom={localRatingFrom}
            localRatingTo={localRatingTo}
            onGenreChange={setGenreId}
            onYearFromChange={setLocalYearFrom}
            onYearToChange={setLocalYearTo}
            onRatingFromChange={setLocalRatingFrom}
            onRatingToChange={setLocalRatingTo}
            onOrderChange={setOrder}
            onTypeChange={setType}
            onReset={resetFilters}
        />
    );
}
