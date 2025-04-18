
import { useEffect, useState } from 'react'
import { Movie } from '../interfaces/movies'
import { retrieveTMDBMovies, addFavoriteMovie } from '../api/moviesAPI'
import SearchInput from '../components/Search'
import Auth from '../utils/auth'

export default function MovieDBBody() {
    const [movies, setMovies] = useState<Movie[]>([{
        id: NaN,
        overview: '',
        release_date: '',
        title: '',
        poster_path: ''
    }])
    const [searchTerm, setSearchTerm] = useState('')
    const [pageNumber, setPageNumber] = useState<number>(1)

    useEffect(() => {
        const getMovies = async () => {
            if (!location.hash) {
                window.scrollTo(0, 0);
              }
            const tmdbMovies: Movie[] = await retrieveTMDBMovies(pageNumber)
            setMovies(tmdbMovies)
            return
        }
        getMovies()
    }, [pageNumber])

    const addMovie = async (id: number, poster_path: string, title: string, overview: string, release_date: string) => {
        const verify = Auth.getToken()
        if (verify) {
            const response = await addFavoriteMovie(id, poster_path, title, overview, release_date)
            if (response) {
                window.alert("Movie successfully saved!")
            } else {
                window.alert("Movie failed to save.")
            }
        } else {
            window.alert("Please login to save movies.")
        }
        
    }

    const filteredMovies = movies.filter((movie: Movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const nextPage = (): void => {
        const increment: number = pageNumber + 1
        setPageNumber(increment)
    }

    const previousPage = (): void => {
        const decrement: number = pageNumber - 1
        setPageNumber(decrement)
    }

    return (
        <>
            { movies.length >= 1 ? 
            <>
                <div className='d-flex justify-content-center'>
                    <SearchInput value={searchTerm} onChange={setSearchTerm} />
                </div>

                <div className='main-child'>
                    {filteredMovies.map((movie: Movie) => (
                        <div className='card m-5 text-bg-light' style={{ width: '25rem' }} key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} className='card-img-top' alt={`Poster for ${movie.title}`} />
                            <div className='card-body'>
                                <h5 className='card-title'>{movie.title}</h5>
                                <p className='card-text'>{movie.overview}</p>
                            </div>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>Released On: {movie.release_date}</li>
                            </ul>
                            <button className='btn btn-primary' onClick={() => addMovie(movie.id, movie.poster_path, movie.title, movie.overview, movie.release_date)}>Save to Favorites</button>
                        </div>
                    ))}
                </div>
                <div className='page-btn-container'>
                    { pageNumber > 1 ? <button className='btn btn btn-outline-primary page-btn'onClick={previousPage}>Previous</button> : <button style={{ visibility: 'hidden' }}></button>}
                    { pageNumber <= 500 ? <button className='btn btn-outline-primary page-btn'onClick={nextPage}>Next</button> : <button style={{ visibility: 'hidden' }}></button>}
                </div>
            </> :
            <h3>Oops, there was an error fetching movies! Try reloading the page.</h3>}
        </>
    )
}