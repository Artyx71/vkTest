import type { MovieDetail } from '../../api/types';
import styles from './MovieDetailPage.module.css';

interface MovieDetailUIProps {
    movie: MovieDetail;
    isFavorite: boolean;
    onBack: () => void;
    onToggleFavorite: (id: number) => void;
}

export function MovieDetailUI({
    movie,
    isFavorite,
    onBack,
    onToggleFavorite,
}: MovieDetailUIProps) {
    const title = movie.name || movie.alternativeName || movie.enName || 'Без названия';
    const originalTitle = movie.alternativeName || movie.enName;

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={onBack}>
                ← Назад к списку
            </button>

            <div className={styles.content}>
                <div className={styles.posterWrap}>
                    <img className={styles.poster} src={movie.poster?.url || ''} alt={title} />
                </div>

                <div className={styles.info}>
                    <h1 className={styles.title}>{title}</h1>
                    {originalTitle && title !== originalTitle && (
                        <p className={styles.originalTitle}>{originalTitle}</p>
                    )}

                    <p className={styles.description}>
                        {movie.description || movie.shortDescription || 'Описание отсутствует.'}
                    </p>

                    <ul className={styles.factList}>
                        <li className={styles.label}>Рейтинг</li>
                        <li className={styles.value}>
                            <span className={styles.ratingKinopoisk}>{movie.rating.kp?.toFixed(1) || '—'}</span> (КП)
                            {movie.rating.imdb && ` / ${movie.rating.imdb.toFixed(1)} (IMDb)`}
                        </li>

                        <li className={styles.label}>Год производства</li>
                        <li className={styles.value}>{movie.year || '—'}</li>

                        <li className={styles.label}>Жанр</li>
                        <li className={styles.value}>{movie.genres.map((g) => g.name).join(', ')}</li>

                        <li className={styles.label}>Страна</li>
                        <li className={styles.value}>{movie.countries.map((c) => c.name).join(', ')}</li>

                        <li className={styles.label}>Слоган</li>
                        <li className={styles.value}>{movie.slogan ? `«${movie.slogan}»` : '—'}</li>

                        <li className={styles.label}>Время</li>
                        <li className={styles.value}>{movie.movieLength ? `${movie.movieLength} мин.` : '—'}</li>
                    </ul>

                    <button
                        className={`${styles.actionBtn} ${isFavorite ? styles.actionBtnActive : ''}`}
                        onClick={() => onToggleFavorite(movie.id)}
                    >
                        {isFavorite ? '♥ Убрать из избранного' : '♡ Добавить в избранное'}
                    </button>
                </div>
            </div>
        </div>
    );
}
