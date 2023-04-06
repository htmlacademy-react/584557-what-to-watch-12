import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/store';
import { filterFilmsByGenre } from '../utils/films';
import { getFilmsGenres } from '../utils/genres';

const selectAllFilms = (state: State) => state.films;
export const selectActiveGenre = (state: State) => state.genre;

export const selectFilmsByGenre = createSelector(
  selectAllFilms,
  selectActiveGenre,
  filterFilmsByGenre
);

export const selectGenres = createSelector(selectAllFilms, getFilmsGenres);
