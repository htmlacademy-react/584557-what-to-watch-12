import { TUserData } from '../types/user';
import { TFilms } from './../types/film';
import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, setFilms, setUserData, setAuthorizationStatus, setFilmsDataLoadingFailed, setFilmsDataLoadingStatus } from './action';
import { AuthorizationStatus } from '../const';

const initialState: {
  genre: string;
  films: TFilms;
  isFilmsDataLoading: boolean;
  isFilmsDataLoadingFailed: boolean;
  userData: TUserData | null;
  authorizationStatus: AuthorizationStatus;
} = {
  genre: 'All genres',
  films: [],
  isFilmsDataLoading: false,
  isFilmsDataLoadingFailed: false,
  userData: null,
  authorizationStatus: AuthorizationStatus.Unknown
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, { payload }) => {
      state.genre = payload;
    })
    .addCase(setFilms, (state, { payload }) => {
      state.films = payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, { payload }) => {
      state.isFilmsDataLoading = payload;
    })
    .addCase(setFilmsDataLoadingFailed, (state, { payload }) => {
      state.isFilmsDataLoadingFailed = payload;
    })
    .addCase(setUserData, (state, { payload }) => {
      state.userData = payload;
    })
    .addCase(setAuthorizationStatus, (state, { payload }) => {
      state.authorizationStatus = payload;
    });
});
