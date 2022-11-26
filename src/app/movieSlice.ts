import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchMovies = createAsyncThunk('user/fetchMovies', () => {
    return axios
        .get('https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json')
        .then(response => response.data)
})

type Movie = {
    title: string,
    year: number,
    genres: string[]
    cast: string[],
}

type initialStateType = {
    title: string,
    cast: string,
    movies: Movie[],
    loading: boolean,
}

const initialState: initialStateType = {
    title: '',
    cast: '',
    movies: [],
    loading: false,
}

export const movieInfoSlice = createSlice({
    name: "MovieInfoReducer",
    initialState,
    reducers: {
        inputTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        inputCast: (state, action: PayloadAction<string>) => {
            state.cast = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchMovies.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false
            state.movies = action.payload
        })
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false
            state.movies = []
        })
    }
});

export default movieInfoSlice.reducer;
