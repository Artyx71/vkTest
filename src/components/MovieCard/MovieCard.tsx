import { Link } from 'react-router-dom';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { useCompareStore } from '../../store/useCompareStore';
import type { Movie } from '../../api/types';
import styles from './MovieCard.module.css';

interface MovieCardProps {
    movie: Movie;
}

function getRatingClass(rating: number | null): string {
    if (!rating) return '';
    if (rating >= 7) return styles.ratingHigh;
    if (rating >= 5) return styles.ratingMid;
    return styles.ratingLow;
}

export function MovieCard({ movie }: MovieCardProps) {
    const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
    const isFavorite = useFavoritesStore((s) => s.favorites.includes(movie.id));
    const toggleCompare = useCompareStore((s) => s.toggleCompare);
    const isCompareSelected = useCompareStore((s) => s.selectedIds.includes(movie.id));

    const title = movie.name || movie.alternativeName || movie.enName || 'Без названия';
    const genresText = movie.genres.map((g) => g.name).join(', ');

    return (
        <div className={styles.card}>
            <div className={styles.actions}>
                <button
                    className={styles.actionBtn}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(movie.id);
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
                        toggleCompare(movie.id);
                    }}
                    title={isCompareSelected ? 'Убрать из сравнения' : 'Сравнить'}
                    aria-label={isCompareSelected ? 'Убрать из сравнения' : 'Добавить к сравнению'}
                >
                    <span className={isCompareSelected ? styles.compareActive : styles.compareInactive}>
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
