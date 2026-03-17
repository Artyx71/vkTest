import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetail } from '../../hooks/useMovieDetail';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { Loader } from '../../components/Loader/Loader';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { MovieDetailUI } from './MovieDetailUI';

function MovieDetailContent() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { movie, loading, error } = useMovieDetail(Number(id));

    const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
    const isFavorite = useFavoritesStore((s) => s.favorites.includes(Number(id)));

    if (loading) return <Loader />;
    if (error) throw new Error(error);
    if (!movie) return <div>Фильм не найден</div>;

    return (
        <MovieDetailUI
            movie={movie}
            isFavorite={isFavorite}
            onBack={() => navigate(-1)}
            onToggleFavorite={toggleFavorite}
        />
    );
}

export function MovieDetailPage() {
    return (
        <ErrorBoundary>
            <MovieDetailContent />
        </ErrorBoundary>
    );
}
