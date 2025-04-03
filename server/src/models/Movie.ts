export interface Movie {
    Title: string;
    Rated: string;
    Runtime: string;
    Genre: string;
    Actors: string;
    Plot: string;
    Poster: string;
    Ratings: { Source: string; Value: string }[];
    imdbID: string;
    Response: string;
}