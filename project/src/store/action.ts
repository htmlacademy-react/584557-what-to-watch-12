import { TFilms } from './../types/film';
import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction('genre/change', (genre: string) => ({
  payload: genre
}));

export const addFilms = createAction('films/add', (films: TFilms) => ({
  payload: films
}));
