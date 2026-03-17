import type { MovieDetail } from '../../api/types';
import styles from './CompareBar.module.css';

interface CompareBarUIProps {
    count: number;
    showModal: boolean;
    movies: MovieDetail[];
    loading: boolean;
    onToggleModal: (show: boolean) => void;
    onClear: () => void;
}

export function CompareBarUI({
    count,
    showModal,
    movies,
    loading,
    onToggleModal,
    onClear,
}: CompareBarUIProps) {
    if (count === 0) return null;

    return (
        <>
            <div className={styles.compareBar}>
                <span className={styles.compareInfo}>
                    Выбрано для сравнения: <strong>{count}</strong>
                </span>
                <button
                    className={styles.compareBtn}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleModal(true);
                    }}
                    disabled={count < 2}
                    style={{ opacity: count < 2 ? 0.5 : 1, cursor: count < 2 ? 'not-allowed' : 'pointer' }}
                >
                    Сравнить
                </button>
                <button className={styles.clearBtn} onClick={onClear}>
                    Очистить
                </button>
            </div>

            {showModal && (
                <div className={styles.overlay} onClick={() => onToggleModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Сравнение фильмов</h2>
                            <button className={styles.closeBtn} onClick={() => onToggleModal(false)}>
                                ✕
                            </button>
                        </div>

                        {loading ? (
                            <div className={styles.loaderContainer}>
                                <p>Загрузка данных для сравнения...</p>
                            </div>
                        ) : movies.length === 0 ? (
                            <p style={{ textAlign: 'center', padding: '20px' }}>Не удалось загрузить данные для сравнения.</p>
                        ) : (
                            <div className={styles.tableWrapper}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Фильм</th>
                                            <th>Рейтинг КП</th>
                                            <th>Рейтинг IMDb</th>
                                            <th>Год</th>
                                            <th>Жанры</th>
                                            <th>Длительность</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {movies.map((movie) => (
                                            <tr key={movie.id}>
                                                <td>
                                                    <div className={styles.filmCell}>
                                                        <img
                                                            className={styles.miniPoster}
                                                            src={movie.poster?.previewUrl ?? movie.poster?.url ?? ''}
                                                            alt={movie.name || ''}
                                                        />
                                                        <span className={styles.filmName}>
                                                            {movie.name || movie.alternativeName || 'Без названия'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>{movie.rating?.kp?.toFixed(1) ?? '—'}</td>
                                                <td>{movie.rating?.imdb?.toFixed(1) ?? '—'}</td>
                                                <td>{movie.year ?? '—'}</td>
                                                <td>{movie.genres?.map((g) => g.name).join(', ') ?? '—'}</td>
                                                <td>{movie.movieLength ? `${movie.movieLength} мин` : '—'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
