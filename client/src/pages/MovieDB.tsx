
import { useEffect, useState } from 'react'
import { Movie } from '../interfaces/movies'
import { retrieveTMDBMovies, addFavoriteMovie } from '../api/moviesAPI'

export default function MovieDBBody() {
    const [ movies, setMovies ] = useState<Movie[]>([{
        id: NaN,
        overview: '',
        release_date: '',
        title: '',
        poster_path: ''
    }])

    useEffect(() => {
        const getMovies = async () => {
            const tmdbMovies: Movie[] = await retrieveTMDBMovies()
            setMovies(tmdbMovies)
            return
        }
        getMovies()  
    }, [])

    const addMovie = (id: number) => addFavoriteMovie(id)

    
    return (
        <>
            <div> 
                { movies.map((movie: Movie) => (
                    <div className="card" style={{ width: '20rem' }} key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} className="card-img-top" alt={`Poster for ${movie.title}`}/>
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">{movie.overview}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Released On: {movie.release_date}</li>
                    </ul>
                    <button className="btn btn-primary" onClick={() => addMovie(movie.id)}>Save to Favorites</button>
                  </div>
                ))}
            </div>
        </>
    )
}