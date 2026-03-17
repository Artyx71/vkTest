import { Link } from 'react-router-dom';

export function NotFoundPage() {
    return (
        <div style={{ textAlign: 'center', paddingTop: '80px' }}>
            <h1 style={{ fontSize: '4rem', margin: '0 0 16px', color: '#6366f1' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 24px', color: '#e0e0e0' }}>Страница не найдена</h2>
            <p style={{ color: '#888', marginBottom: '32px' }}>
                Кажется, вы перешли по неверной ссылке или страница была удалена.
            </p>
            <Link
                to="/"
                style={{
                    background: '#6366f1',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 600
                }}
            >
                На главную
            </Link>
        </div>
    );
}
