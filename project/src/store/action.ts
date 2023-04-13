import { AppRoute } from './../const';
import { TUserData } from '../types/user';
import { TFilms } from './../types/film';
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
