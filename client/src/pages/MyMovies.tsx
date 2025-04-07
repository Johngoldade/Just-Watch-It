
import { useEffect, useState } from 'react'
import { Movie} from '../interfaces/movies'
import { retrieveMyMovies } from '../api/moviesAPI'


export default function MyMovies() {
    const [ myMovies, setMyMovies ] = useState<Movie[]>([{
        id: NaN,
        overview: '',
        release_date: '',
        title: '',
        poster_path: ''
    }])
    
    useEffect(() => {
        const getMyMovies = async () => {
            const favorites: Movie[] = await retrieveMyMovies()
            setMyMovies(favorites)
            return
        }
        getMyMovies()
    }, [])

    return (
        <>
            <div> 
                { myMovies.map((movie: Movie) => (
                    <div className="card" style={{ width: '20rem' }} key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w100/${movie.poster_path}`} className="card-img-top" alt={`Poster for ${movie.title}`}/>
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">{movie.overview}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Released On: {movie.release_date}</li>
                    </ul>
                  </div>
                ))}
            </div>
        </>
    )
}