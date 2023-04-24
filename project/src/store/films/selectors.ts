import { createSelector } from '@reduxjs/toolkit';
import { DEFAULT_GENRE_FILTER } from '../../const';
import { TFilms } from '../../types/film';
import { State } from '../../types/store';

export const selectFilmsState = (state: State) => state.films;
export const selectFilms = (state: State) => state.films.data;
export const selectActiveGenre = (state: State) => state.films.activeGenre;
export const selectFilmsDataLoadingStatus = (state: State) => state.films.isLoading;
export const selectFilmsDataLoadingFailed = (state: State) => state.films.error;

export const selectFilmsByGenre = createSelector(
  selectFilms,
  selectActiveGenre,
  (films: TFilms, genre: string) => {
    if(genre === DEFAULT_GENRE_FILTER) {
      return films;
    }

    return films.filter((film) => film.genre === genre);
  }
);

export const selectGenres = createSelector(
  selectFilms,
  (films: TFilms) => [
    DEFAULT_GENRE_FILTER,
    ...new Set(films.reduce<string[]>((acc, { genre }) => {
      acc.push(genre);

      return acc;
    }, []))
  ]);
