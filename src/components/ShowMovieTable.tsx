import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Table} from "react-bootstrap";
import { v4 } from 'uuid';
import {AppDispatch, RootState} from "../app/store";
import {fetchMovies} from "../app/movieSlice";

function ShowMovieTable(): JSX.Element {

    const dispatch = useDispatch<AppDispatch>();

    const Movies = useSelector((state: RootState) => state.movie.movies);

    useEffect(() => {
        dispatch(fetchMovies())
    }, [])

    const titleQuery = useSelector((state: RootState) => state.movie.title);

    const castQuery = useSelector((state: RootState) => state.movie.cast);

    const [visible, setVisible] = useState(10);

    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 10);
    }

    const showLessItems = () => {
        setVisible((prevValue) => prevValue - 10);
    }

    return (
        <div>
            <h1>Movie List</h1>
            <Table style={{backgroundColor: "#34495e"}} className="text-white rounded" >
                <thead>
                <tr style={{border: "1px solid #46637f"}}>
                    <th style={{color: "#dd5"}}>Title</th>
                    <th style={{color: "#dd5"}}>Year</th>
                    <th style={{color: "#dd5"}}>Cast</th>
                    <th style={{color: "#dd5"}}>Genres</th>
                </tr>
                </thead>
                <tbody>

                {Movies.filter(film => {
                    if (castQuery === '' && titleQuery === '') {
                        return film
                    } else if (film.title.toLowerCase().includes(titleQuery.toLowerCase()) && castQuery.toLowerCase() === '') {
                        return film
                    } else if (titleQuery.toLowerCase() === '' && castQuery.toLowerCase() !== '' && film.cast.some((cast) => cast.toLowerCase().includes(castQuery.toLowerCase()))) {
                        return film
                    } else if (film.title.toLowerCase().includes(titleQuery.toLowerCase()) && castQuery.toLowerCase() !== '' && film.cast.some((cast) => cast.toLowerCase().includes(castQuery.toLowerCase()))) {
                        return film
                    }
                }).sort((a, b) => {
                    if (a.year < b.year) {
                        return 1;
                    }
                    if (a.year > b.year) {
                        return -1;
                    }
                    return 0;
                }).slice(0, visible).map((movie) => {
                    return (
                        <tr key={v4()} style={{border: "1px solid #46637f"}} >
                            <td className="p-3">{movie.title}</td>
                            <td className="p-3">{movie.year}</td>
                            <td className="p-3">{movie.cast.join(', ')}</td>
                            <td className="p-3">{movie.genres.join(', ')}</td>
                        </tr>
                    )
                })}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={6} style={{justifyItems: "center"}}>
                        <Button style={{backgroundColor: "#dd5", color: "#444"}} variant="primary"
                                onClick={showMoreItems}>Show More</Button>
                        <Button style={{backgroundColor: "#dd5", color: "#444"}} disabled={visible <= 10}
                                className="mx-5" variant="primary" onClick={showLessItems}>Show
                            Less</Button>
                    </td>
                </tr>
                </tfoot>
            </Table>
        </div>
    )
}

export default ShowMovieTable;
