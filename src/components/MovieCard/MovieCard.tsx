import { Link } from 'react-router-dom';
import type { Movie } from '../../api/types';
import styles from './MovieCard.module.css';

interface MovieCardProps {
    movie: Movie;
    isFavorite: boolean;
    isCompared: boolean;
    onToggleFavorite: (id: number) => void;
    onToggleCompare: (id: number) => void;
}

function getRatingClass(rating: number | null): string {
    if (!rating) return '';
    if (rating >= 7) return styles.ratingHigh;
    if (rating >= 5) return styles.ratingMid;
    return styles.ratingLow;
}

export function MovieCard({
    movie,
    isFavorite,
    isCompared,
    onToggleFavorite,
    onToggleCompare,
}: MovieCardProps) {
    const title = movie.name || movie.alternativeName || movie.enName || 'Без названия';
    const genresText = (movie.genres || []).map((g) => g.name).join(', ');

    return (
        <div className={styles.card}>
            <div className={styles.actions}>
                <button
                    className={styles.actionBtn}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleFavorite(movie.id);
                    }}
                    title={isFavorite ? 'Убрать из избранного' : 'В избранное'}
                    aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                >
                    <span className={isFavorite ? styles.favActive : styles.favInactive}>
                        {isFavorite ? '♥' : '♡'}
                    </span>
                </button>
                <button
                    className={styles.actionBtn}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleCompare(movie.id);
                    }}
                    title={isCompared ? 'Убрать из сравнения' : 'Сравнить'}
                    aria-label={isCompared ? 'Убрать из сравнения' : 'Добавить к сравнению'}
                >
                    <span className={isCompared ? styles.compareActive : styles.compareInactive}>
                        ⚖
                    </span>
                </button>
            </div>

            <Link to={`/film/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.posterWrap}>
                    <img
                        className={styles.poster}
                        src={movie.poster?.previewUrl ?? movie.poster?.url ?? ''}
                        alt={title}
                        loading="lazy"
                    />
                    {movie.rating.kp && (
                        <span className={`${styles.rating} ${getRatingClass(movie.rating.kp)}`}>
                            ★ {movie.rating.kp.toFixed(1)}
                        </span>
                    )}
                </div>
                <div className={styles.info}>
                    <h3 className={styles.title} title={title}>{title}</h3>
                    <div className={styles.meta}>
                        {movie.year && <span>{movie.year}</span>}
                        {genresText && <span className={styles.genres}>{genresText}</span>}
                    </div>
                </div>
            </Link>
        </div>
    );
}
