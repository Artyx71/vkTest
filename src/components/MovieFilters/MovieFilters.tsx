import { useState, useEffect } from 'react';
import { useFiltersStore } from '../../store/useFiltersStore';
import { useFilterOptions } from '../../hooks/useFilterOptions';
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

    useEffect(() => {
        setLocalYearFrom(yearFrom);
        setLocalYearTo(yearTo);
        setLocalRatingFrom(ratingFrom);
        setLocalRatingTo(ratingTo);
    }, [yearFrom, yearTo, ratingFrom, ratingTo]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localYearFrom === undefined || (localYearFrom >= 1860 && localYearFrom <= 2100)) {
                setYearFrom(localYearFrom);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [localYearFrom, setYearFrom]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localYearTo === undefined || (localYearTo >= 1860 && localYearTo <= 2100)) {
                setYearTo(localYearTo);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [localYearTo, setYearTo]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRatingFrom(localRatingFrom);
        }, 500);
        return () => clearTimeout(timer);
    }, [localRatingFrom, setRatingFrom]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRatingTo(localRatingTo);
        }, 500);
        return () => clearTimeout(timer);
    }, [localRatingTo, setRatingTo]);

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
