import { createSelector } from '@reduxjs/toolkit';
import { TFilms } from '../types/film';
import { State } from '../types/store';

export const selectAllFilms = (state: State) => state.films;
export const selectActiveGenre = (state: State) => state.genre;
export const selectFilmsDataLoadingStatus = (state: State) => state.isFilmsDataLoading;
export const selectFilmsDataLoadingFailed = (state: State) => state.isFilmsDataLoadingFailed;
export const selectUserData = (state: State) => state.userData;
export const selectAuthorizationStatus = (state: State) => state.authorizationStatus;
export const selectActiveFilm = (state: State) => state.activeFilm;
export const selectActiveFilmsDataLoadingStatus = (state: State) => state.isActiveFilmDataLoading;
export const selectActiveFilmDataLoadingFailed = (state: State) => state.isActiveFilmDataFailed;
export const selectNewCommentLoadingStatus = (state: State) => state.isNewCommentDataLoading;
export const selectNewCommentLoadingFailed = (state: State) => state.isNewCommentDataFailed;

export const selectFilmsByGenre = createSelector(
  selectAllFilms,
  selectActiveGenre,
  (films: TFilms, genre: string) => {
    if(genre === 'All genres') {
      return films;
    }

    return films.filter((film) => film.genre === genre);
  }
);

export const selectGenres = createSelector(selectAllFilms, (films: TFilms) => [
  'All genres',
  ...new Set(films.reduce<string[]>((acc, { genre }) => {
    acc.push(genre);

    return acc;
  }, []))
]);
