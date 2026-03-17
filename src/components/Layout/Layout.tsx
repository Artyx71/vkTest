import { Outlet, Link } from 'react-router-dom';
import styles from './Layout.module.css';

export function Layout() {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <Link to="/" className={styles.logo}>
                        🎬 КиноБраузер
                    </Link>
                    <nav className={styles.nav}>
                        <Link to="/" className={styles.navLink}>Фильмы</Link>
                    </nav>
                </div>
            </header>
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}
