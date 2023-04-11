import { TFilms } from './../types/film';
import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction('genre/change', (genre: string) => ({
  payload: genre
}));

export const loadFilms = createAction('films/load', (films: TFilms) => ({
  payload: films
}));

export const setFilmsDataLoadingStatus = createAction('films/setFilmsDataLoadingStatus', (loadingStatus: boolean) => ({
  payload: loadingStatus
}));

export const setFilmsDataLoadingFailed = createAction('films/setFilmsDataLoadingFailed', (isError: boolean) => ({
  payload: isError
}));
