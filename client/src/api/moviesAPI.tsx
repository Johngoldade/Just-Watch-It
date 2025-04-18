import Auth from '../utils/auth'
import { Movie, TmdbReturn } from '../interfaces/movies'


const retrieveTMDBMovies = async (page: number): Promise<Movie[]> => {
    try {
        const response = await fetch(`/tmdb/movies/${page}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

        if (!response.ok) {
            throw new Error('Invalid API response')
        }

        const returnedList: TmdbReturn = await response.json()
        const movieList: Movie[] = returnedList.results
        console.log(movieList)
        return movieList

    } catch (error) {
        console.error(`Error retrieving data... see this error => ${error}`)
        return []
    }
}


const retrieveMyMovies = async (): Promise<Movie[]> => {
    try {
        const token: string = Auth.getToken()
        if (token) {
            const response = await fetch(`/db/favorites/mymovies`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error('Invalid API response')
            }

            const userFavorites: Movie[] = await response.json()
            return userFavorites
        } else {
            console.log('No token')
            return []
        }
    } catch (error) {
        console.error(`Error retreiving data... see this error => ${error}`)
        return []
    }
}

const addFavoriteMovie = async (movieId: number, poster_path: string, title: string, overview: string, release_date: string ) => {
    try {
        const token = Auth.getToken();
        if (!token) {
            console.log('No valid token found');
            return;
        }

        console.log(movieId);
        const response = await fetch(`/db/favorites/mymovies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ movieId, poster_path, title, overview, release_date })
        });

        if (!response.ok) {
            throw new Error('Failed to add favorite movie');
        }

        return response
    } catch (error) {
        console.error(`Movie was not added to your list for the following reason => ${error}`);
    }
}


export { retrieveTMDBMovies, retrieveMyMovies, addFavoriteMovie }

