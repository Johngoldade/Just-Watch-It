import Auth from '../utils/auth'
import { Movie } from '../interfaces/movies'


const retrieveTMDBMovies = async (): Promise<Movie[]> => {
    try {
        const response = await fetch('/api/movies/', 
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            })

        if (!response.ok) {
            throw new Error ('Invalid API response')
        }

        const movieList: Movie[] = await response.json()
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
            const response = await fetch(`/api/favorites`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error ('Invalid API response')
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

const addFavoriteMovie = async (movieId: number) => {
    try {
        const token: string = Auth.getToken()
        if (token) {
            await fetch(`/api/favorites`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ movieId })
            })
        } else {
            console.log('No Token')
        }
    } catch (error) {
        console.error(`Movie was not added to your list for the following reason => ${error}`)
    }
}


export { retrieveTMDBMovies, retrieveMyMovies, addFavoriteMovie }

