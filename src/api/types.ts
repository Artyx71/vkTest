export interface PossibleValue {
    name: string;
    slug: string;
}

export interface Genre {
    name: string;
}

export interface Country {
    name: string;
}

export interface Poster {
    url: string | null;
    previewUrl: string | null;
}

export interface Rating {
    kp: number | null;
    imdb: number | null;
    tmdb: number | null;
    filmCritics: number | null;
    russianFilmCritics: number | null;
    await: number | null;
}

export interface Movie {
    id: number;
    name: string | null;
    alternativeName: string | null;
    enName: string | null;
    year: number | null;
    rating: Rating;
    poster: Poster;
    genres: Genre[];
    countries: Country[];
}

export interface MovieDetail extends Movie {
    description: string | null;
    shortDescription: string | null;
    movieLength: number | null;
    slogan: string | null;
    type: string;
    status: string | null;
    releaseYears: { start: number | null; end: number | null }[];
}

export interface MovieResponse {
    docs: Movie[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}

export interface MovieQueryParams {
    page?: number;
    limit?: number;
    year?: string | number;
    'genres.name'?: string | string[];
    'rating.kp'?: string | number;
    type?: string;
    sortField?: string | string[];
    sortType?: string | string[];
    notNullFields?: string | string[];
}
