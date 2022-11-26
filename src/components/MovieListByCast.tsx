import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchMovies} from "../app/movieSlice";
import { v4 } from 'uuid';
import {AppDispatch, RootState} from "../app/store";



function MovieListByCast() {

    const dispatch = useDispatch<AppDispatch>();

    const movies = useSelector((state: RootState) => state.movie.movies);

    useEffect(() => {
        dispatch(fetchMovies())
    }, [])

    let castList = _.uniq(_.flatten(movies.slice(movies.length - 100, movies.length).map(movie => movie.cast)));

    return (

        <div>
            <h1>Movie List By Cast</h1>

            {castList.map((cast) => {
                return (
                    <div key={v4()}>
                        <h2>{cast}</h2>
                        <ol>
                            {movies.slice(movies.length - 500, movies.length).filter(movie => movie.cast.includes(cast)).map(movie =>
                                <li key={v4()} >{movie.title}</li>
                            )}
                        </ol>
                    </div>
                )
            })}
        </div>
    )
}

export default MovieListByCast;
