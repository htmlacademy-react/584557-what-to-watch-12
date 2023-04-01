import { TFilms } from './../types/film';
import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, addFilms } from './action';
import { films } from '../moks/films';

const initialState: {
  genre: string;
  films: TFilms;
} = {
  genre: 'All genres',
  films: films
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, { payload }) => {
      state.genre = payload;
    })
    .addCase(addFilms, (state, { payload }) => {
      state.films = payload;
    });
});
