import { TComment } from './../types/comment';
import { AppRoute } from './../const';
import { TUserData } from '../types/user';
import { TActiveFilmData, TFilms } from './../types/film';
import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';

export const changeGenre = createAction('genre/change', (genre: string) => ({
  payload: genre
}));

export const setFilms = createAction('films/set', (films: TFilms) => ({
  payload: films
}));

export const setFilmsDataLoadingStatus = createAction(
  'films/setFilmsDataLoadingStatus',
  (loadingStatus: boolean) => ({
    payload: loadingStatus
  })
);

export const setFilmsDataLoadingFailed = createAction(
  'films/setFilmsDataLoadingFailed',
  (isError: boolean) => ({
    payload: isError
  })
);

export const setUserData = createAction(
  'auth/setUserData',
  (userData: TUserData | null) => ({
    payload: userData
  })
);

export const setAuthorizationStatus = createAction(
  'auth/setAuthorizationStatus',
  (authorizationStatus: AuthorizationStatus) => ({
    payload: authorizationStatus
  })
);

export const redirectToRoute = createAction(
  'router/redirectToRoute',
  (route: AppRoute) => ({
    payload: route
  })
);

export const setActiveFilm = createAction('activeFilm/set', (filmData: TActiveFilmData) => ({
  payload: filmData
}));

export const setActiveFilmDataLoadingFailed = createAction(
  'activeFilm/setActiveFilmDataLoadingFailed',
  (isError: boolean) => ({
    payload: isError
  })
);

export const setActiveFilmDataLoadingStatus = createAction(
  'activeFilm/setActiveFilmDataLoadingStatus',
  (loadingStatus: boolean) => ({
    payload: loadingStatus
  })
);

export const addComment = createAction(
  'activeFilm/addComment',
  (comment: TComment) => ({
    payload: comment
  })
);

export const setNewCommentLoadingFailed = createAction(
  'activeFilm/setNewCommentLoadingFailed',
  (isError: boolean) => ({
    payload: isError
  })
);

export const setNewCommentLoadingStatus = createAction(
  'activeFilm/setNewCommentLoadingStatus',
  (loadingStatus: boolean) => ({
    payload: loadingStatus
  })
);
