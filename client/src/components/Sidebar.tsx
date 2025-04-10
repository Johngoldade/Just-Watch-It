import React, { useEffect, useState } from 'react';
import { Movie } from '../interfaces/movies';
import { retrieveTMDBMovies } from '../api/moviesAPI';


const Sidebar: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([
        {
            id: NaN,
            overview: '',
            release_date: '',
            title: '',
            poster_path: ''
        }
    ]);

    useEffect(() => {
        const getMovies = async () => {
            const tmdbMovies: Movie[] = await retrieveTMDBMovies();
            setMovies(tmdbMovies);
            return;
        };
        getMovies();
    }, []);

    return (
        <div>
            {movies.map((movie: Movie) => (
                <div className='card' style={{ width: '16px' }} key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w100/${movie.poster_path}`} className='card-img-top' alt={`Poster for ${movie.title}`} />
                    <div className='card-body'>
                        <h5 className='card-title'>{movie.title}</h5>
                        <p className='card-text'>{movie.overview}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Sidebar