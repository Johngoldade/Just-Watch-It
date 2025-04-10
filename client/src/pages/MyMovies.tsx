
import { useEffect, useState } from 'react'
import { Movie } from '../interfaces/movies'
import { retrieveTMDBMovies, retrieveMyMovies } from '../api/moviesAPI'


export default function MyMovies() {
    const [myMovies, setMyMovies] = useState<Movie[]>([{
        id: NaN,
        overview: '',
        release_date: '',
        title: '',
        poster_path: ''
    }])

    useEffect(() => {
        const getMyMovies = async () => {
            const favorites: number[] = (await retrieveMyMovies()).map((movie: Movie) => movie.id)

            const allMovies = await retrieveTMDBMovies()

            const favoriteMovies = allMovies.filter((movie: Movie) =>
                favorites.includes(movie.id))
            console.log(favoriteMovies)
            setMyMovies(favoriteMovies)
            return
        }
        getMyMovies()
    }, [])

    return (
        <>
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
        </>
    )
}