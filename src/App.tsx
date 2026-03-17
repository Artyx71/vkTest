import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { MovieListPage } from './pages/MovieListPage/MovieListPage';
import { MovieDetailPage } from './pages/MovieDetailPage/MovieDetailPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Link } from 'react-router-dom';
import styles from './components/Layout/Layout.module.css';

function AppLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            🎬 КиноБраузер
          </Link>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Фильмы</Link>
            <Link to="/favorites" className={styles.navLink}>Избранное</Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<MovieListPage />} />
          <Route path="/film/:id" element={<MovieDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return <AppLayout />;
}

export default App;
