import styles from './MovieFilters.module.css';

interface MovieFiltersUIProps {
    genreId: string | undefined;
    yearFrom: number | undefined;
    yearTo: number | undefined;
    ratingFrom: number;
    ratingTo: number;
    order: 'RATING' | 'NUM_VOTE' | 'YEAR';
    type: string;
    genres: Array<{ name: string; slug: string }>;
    localYearFrom: number | undefined;
    localYearTo: number | undefined;
    localRatingFrom: number;
    localRatingTo: number;
    onGenreChange: (val: string | undefined) => void;
    onYearFromChange: (val: number | undefined) => void;
    onYearToChange: (val: number | undefined) => void;
    onRatingFromChange: (val: number) => void;
    onRatingToChange: (val: number) => void;
    onOrderChange: (val: 'RATING' | 'NUM_VOTE' | 'YEAR') => void;
    onTypeChange: (val: any) => void;
    onReset: () => void;
}

export function MovieFiltersUI({
    genreId,
    genres,
    order,
    type,
    localYearFrom,
    localYearTo,
    localRatingFrom,
    localRatingTo,
    onGenreChange,
    onOrderChange,
    onTypeChange,
    onYearFromChange,
    onYearToChange,
    onRatingFromChange,
    onRatingToChange,
    onReset,
}: MovieFiltersUIProps) {
    return (
        <div className={styles.filters}>
            {/* Genre */}
            <div className={styles.filterGroup}>
                <label htmlFor="filter-genre">Жанр</label>
                <select
                    id="filter-genre"
                    value={genreId ?? ''}
                    onChange={(e) => onGenreChange(e.target.value || undefined)}
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
                        onChange={(e) => onYearFromChange(e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <span style={{ color: '#888' }}>—</span>
                    <input
                        type="number"
                        placeholder="до"
                        value={localYearTo ?? ''}
                        min={1860}
                        max={2100}
                        onChange={(e) => onYearToChange(e.target.value ? Number(e.target.value) : undefined)}
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
                        onChange={(e) => onRatingFromChange(Number(e.target.value))}
                    />
                    <span style={{ color: '#888' }}>—</span>
                    <input
                        type="number"
                        placeholder="до"
                        value={localRatingTo}
                        min={0}
                        max={10}
                        step={0.1}
                        onChange={(e) => onRatingToChange(Number(e.target.value))}
                    />
                </div>
            </div>

            {/* Sort */}
            <div className={styles.filterGroup}>
                <label htmlFor="filter-order">Сортировка</label>
                <select
                    id="filter-order"
                    value={order}
                    onChange={(e) => onOrderChange(e.target.value as 'RATING' | 'NUM_VOTE' | 'YEAR')}
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
                    onChange={(e) => onTypeChange(e.target.value as any)}
                >
                    <option value="ALL">Все</option>
                    <option value="FILM">Фильм</option>
                    <option value="TV_SERIES">Сериал</option>
                    <option value="TV_SHOW">ТВ-шоу</option>
                    <option value="MINI_SERIES">Анимация</option>
                </select>
            </div>

            {/* Reset */}
            <button className={styles.resetBtn} onClick={onReset}>
                Сбросить
            </button>
        </div>
    );
}
