import Genres from '../data/genres.json';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchMovies} from "../app/movieSlice";
import {AppDispatch, RootState} from "../app/store";
import { v4 } from 'uuid';

function MovieListByGenre() {

    const dispatch = useDispatch<AppDispatch>();

    const movies = useSelector((state: RootState) => state.movie.movies);

    useEffect(() => {
        dispatch(fetchMovies())
    }, [])

    return (
        <div>
            <h1>Movie List By Genre</h1>
            {Genres.map((genre:string) => {
                return (
                    <div key={v4()}>
                        {movies.slice(movies.length - 100, movies.length).filter(movie => movie.genres.includes(genre)).length > 0 &&
                            <h2>{genre}</h2>
                        }
                        <ol>
                            {movies.slice(movies.length - 100, movies.length).filter(movie => movie.genres.includes(genre) && movie.genres.length > 0).map(movie =>
                                <li key={v4()}>{movie.title}</li>
                            )}
                        </ol>
                    </div>
                )
            })}
        </div>
    )
}

export default MovieListByGenre;
