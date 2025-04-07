export interface Movie {
    id: number,
    overview: string,
    release_date: string,
    title: string,
    poster_path: string,
    genre_ids?: number[]
}