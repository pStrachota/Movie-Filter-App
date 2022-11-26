import React from 'react';
import './App.css';
import FindByMovieTitleAndCast from "./components/FindByMovieTitleAndCast";
import MovieListByGenre from "./components/MovieListByGenre";
import MovieListByCast from "./components/MovieListByCast";
import {Col, Row} from "react-bootstrap";
import ShowMovieTable from "./components/ShowMovieTable";
import './style/style.css';


function App() {

    return (
        <div className="App">
            <FindByMovieTitleAndCast/>
            <ShowMovieTable/>
            <Row>
                <Col>
                    <MovieListByGenre/>
                </Col>
                <Col>
                    <MovieListByCast/>
                </Col>
            </Row>
        </div>
    );
}

export default App;
