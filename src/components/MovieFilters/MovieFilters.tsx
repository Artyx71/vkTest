import { useState, useEffect } from 'react';
import { useFiltersStore } from '../../store/useFiltersStore';
import { useFilterOptions } from '../../hooks/useFilterOptions';
import styles from './MovieFilters.module.css';

export function MovieFilters() {
    const {
        genreId, yearFrom, yearTo, ratingFrom, ratingTo, order, type,
        setGenreId, setYearFrom, setYearTo, setRatingFrom, setRatingTo,
        setOrder, setType, resetFilters,
    } = useFiltersStore();

    const { genres } = useFilterOptions();

    // Local state for debouncing
    const [localYearFrom, setLocalYearFrom] = useState<number | undefined>(yearFrom);
    const [localYearTo, setLocalYearTo] = useState<number | undefined>(yearTo);
    const [localRatingFrom, setLocalRatingFrom] = useState<number>(ratingFrom);
    const [localRatingTo, setLocalRatingTo] = useState<number>(ratingTo);

    // Update local state when store state changes (e.g. on reset)
    useEffect(() => {
        setLocalYearFrom(yearFrom);
        setLocalYearTo(yearTo);
        setLocalRatingFrom(ratingFrom);
        setLocalRatingTo(ratingTo);
    }, [yearFrom, yearTo, ratingFrom, ratingTo]);

    // Debounced effect for yearFrom
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localYearFrom === undefined || (localYearFrom >= 1860 && localYearFrom <= 2100)) {
                setYearFrom(localYearFrom);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [localYearFrom, setYearFrom]);

    // Debounced effect for yearTo
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localYearTo === undefined || (localYearTo >= 1860 && localYearTo <= 2100)) {
                setYearTo(localYearTo);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [localYearTo, setYearTo]);

    // Debounced effect for ratingFrom
    useEffect(() => {
        const timer = setTimeout(() => {
            setRatingFrom(localRatingFrom);
        }, 500);
        return () => clearTimeout(timer);
    }, [localRatingFrom, setRatingFrom]);

    // Debounced effect for ratingTo
    useEffect(() => {
        const timer = setTimeout(() => {
            setRatingTo(localRatingTo);
        }, 500);
        return () => clearTimeout(timer);
    }, [localRatingTo, setRatingTo]);

    return (
        <div className={styles.filters}>
            {/* Genre */}
            <div className={styles.filterGroup}>
                <label htmlFor="filter-genre">Жанр</label>
                <select
                    id="filter-genre"
                    value={genreId ?? ''}
                    onChange={(e) => setGenreId(e.target.value || undefined)}
                >
                    <option value="">Все жанры</option>
                    {genres.map((g) => (
                        <option key={g.slug} value={g.name}>{g.name}</option>
                    ))}
                </select>
            </div>

            {/* Year range */}
            <div className={styles.filterGroup}>
                <label>Год</label>
                <div className={styles.rangeGroup}>
                    <input
                        type="number"
                        placeholder="от"
                        value={localYearFrom ?? ''}
                        min={1860}
                        max={2100}
                        onChange={(e) => setLocalYearFrom(e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <span style={{ color: '#888' }}>—</span>
                    <input
                        type="number"
                        placeholder="до"
                        value={localYearTo ?? ''}
                        min={1860}
                        max={2100}
                        onChange={(e) => setLocalYearTo(e.target.value ? Number(e.target.value) : undefined)}
                    />
                </div>
            </div>

            {/* Rating range */}
            <div className={styles.filterGroup}>
                <label>Рейтинг КП</label>
                <div className={styles.rangeGroup}>
                    <input
                        type="number"
                        placeholder="от"
                        value={localRatingFrom}
                        min={0}
                        max={10}
                        step={0.1}
                        onChange={(e) => setLocalRatingFrom(Number(e.target.value))}
                    />
                    <span style={{ color: '#888' }}>—</span>
                    <input
                        type="number"
                        placeholder="до"
                        value={localRatingTo}
                        min={0}
                        max={10}
                        step={0.1}
                        onChange={(e) => setLocalRatingTo(Number(e.target.value))}
                    />
                </div>
            </div>

            {/* Sort */}
            <div className={styles.filterGroup}>
                <label htmlFor="filter-order">Сортировка</label>
                <select
                    id="filter-order"
                    value={order}
                    onChange={(e) => setOrder(e.target.value as 'RATING' | 'NUM_VOTE' | 'YEAR')}
                >
                    <option value="RATING">По рейтингу</option>
                    <option value="NUM_VOTE">По голосам</option>
                    <option value="YEAR">По году</option>
                </select>
            </div>

            {/* Type */}
            <div className={styles.filterGroup}>
                <label htmlFor="filter-type">Тип</label>
                <select
                    id="filter-type"
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                >
                    <option value="ALL">Все</option>
                    <option value="FILM">Фильм</option>
                    <option value="TV_SERIES">Сериал</option>
                    <option value="TV_SHOW">ТВ-шоу</option>
                    <option value="MINI_SERIES">Анимация</option>
                </select>
            </div>

            {/* Reset */}
            <button className={styles.resetBtn} onClick={resetFilters}>
                Сбросить
            </button>
        </div>
    );
}
