
import { useEffect, useState } from 'react'
import { Movie } from '../interfaces/movies'
import { retrieveMyMovies } from '../api/moviesAPI'
import Auth from '../utils/auth'

export default function MyMovies() {
    const [myMovies, setMyMovies] = useState<Movie[]>([{
        id: NaN,
        overview: '',
        release_date: '',
        title: '',
        poster_path: ''
    }])
    const [ isLoggedIn, setISLoggedIn ] = useState<Boolean>(false)

    useEffect(() => {
        const getMyMovies = async () => {
            const favorites: Movie[] = await retrieveMyMovies()
            console.log(favorites)
            if (favorites.length >= 1) {
                setMyMovies(favorites)
                return
            } 
            return
        }
        getMyMovies()
        
        const checkLogin = () => {
            const token = Auth.loggedIn()
            if (token) {
                setISLoggedIn(true)
                return
            }
            setISLoggedIn(false)
            return
        }
        checkLogin()
    }, [])

    return (
        <>
            {isLoggedIn ? (
                <>
                    {myMovies[0].title !== '' ? (
                        <div className='main-child'>
                            {myMovies.map((movie: Movie) => (
                                <div className='card m-5 text-bg-light' style={{ width: '20rem' }} key={movie.id}>
                                    <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} className='card-img-top' alt={`Poster for ${movie.title}`} />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{movie.title}</h5>
                                        <p className='card-text'>{movie.overview}</p>
                                    </div>
                                    <ul className='list-group list-group-flush'>
                                        <li className='list-group-item'>Released On: {movie.release_date}</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h3>No Movies Saved!</h3>
                    )}
                </>
            ) : (
                <h3>Please log in to view your movies.</h3>
            )}
        </>
    )
}