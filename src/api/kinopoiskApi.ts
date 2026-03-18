import type { MovieResponse, MovieDetail, PossibleValue, MovieQueryParams } from './types';

const BASE_URL = 'https://api.poiskkino.dev';

function getApiKey(): string {
    const key = import.meta.env.VITE_KINOPOISK_API_KEY;
    if (!key) {
        throw new Error('VITE_KINOPOISK_API_KEY is not set in .env');
    }
    return key;
}

async function request<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v) => url.searchParams.append(key, String(v)));
            } else if (value !== undefined && value !== null && value !== '') {
                url.searchParams.append(key, String(value));
            }
        });
    }

    const response = await fetch(url.toString(), {
        headers: {
            'X-API-KEY': getApiKey(),
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${response.status} ${errorData.message || response.statusText}`);
    }

    return response.json();
}

export async function getMovies(params: MovieQueryParams = {}): Promise<MovieResponse> {
    const queryParams: MovieQueryParams = {
        limit: 50,
        sortField: 'rating.kp',
        sortType: '-1',
        notNullFields: ['name', 'poster.url'],
        ...params
    };
    return request<MovieResponse>('/v1.4/movie', queryParams);
}

export async function getMovieById(id: number): Promise<MovieDetail> {
    return request<MovieDetail>(`/v1.4/movie/${id}`);
}

export async function getGenres(): Promise<PossibleValue[]> {
    return request<PossibleValue[]>('/v1/movie/possible-values-by-field', { field: 'genres.name' });
}
