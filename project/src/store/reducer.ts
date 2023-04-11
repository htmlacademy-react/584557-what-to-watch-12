import { TFilms } from './../types/film';
import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, loadFilms, setFilmsDataLoadingFailed, setFilmsDataLoadingStatus } from './action';
import { films } from '../moks/films';

const initialState: {
  genre: string;
  films: TFilms;
  isFilmsDataLoading: boolean;
  isFilmsDataLoadingFailed: boolean;
} = {
  genre: 'All genres',
  films: films,
  isFilmsDataLoading: false,
  isFilmsDataLoadingFailed: false
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, { payload }) => {
      state.genre = payload;
    })
    .addCase(loadFilms, (state, { payload }) => {
      state.films = payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, { payload }) => {
      state.isFilmsDataLoading = payload;
    })
    .addCase(setFilmsDataLoadingFailed, (state, { payload }) => {
      state.isFilmsDataLoadingFailed = payload;
    });
});
