import {useDispatch} from "react-redux";
import {movieInfoSlice} from "../app/movieSlice";
import {AppDispatch} from "../app/store";
import {Col, Row} from "react-bootstrap";

function FindByMovieTitleAndCast() {

    const dispatch = useDispatch<AppDispatch>();

    return (
        <Row className="my-2">
            <Col>
                <h1>Find Movie By Title</h1>
                <input type="text" placeholder="Enter movie title"
                       onChange={(e) => dispatch(movieInfoSlice.actions.inputTitle(e.target.value))}/>
            </Col>
            <Col>
                <h1>Find Movie By Cast</h1>
                <input type="text" placeholder="Enter cast name"
                       onChange={(e) => dispatch(movieInfoSlice.actions.inputCast(e.target.value))}/>
            </Col>

        </Row>
    )
}

export default FindByMovieTitleAndCast;
