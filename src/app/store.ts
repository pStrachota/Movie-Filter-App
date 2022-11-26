import { configureStore } from '@reduxjs/toolkit';
import {movieInfoSlice} from "./movieSlice";

export const store = configureStore({
  reducer: {
    movie: movieInfoSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

