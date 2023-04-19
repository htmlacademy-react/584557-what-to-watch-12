import { TUserData } from '../types/user';
import { TFilms, TActiveFilmData } from './../types/film';
import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, setFilms, setUserData, setAuthorizationStatus, setFilmsDataLoadingFailed, setFilmsDataLoadingStatus, setActiveFilm, setActiveFilmDataLoadingFailed, setActiveFilmDataLoadingStatus, addComment, setNewCommentLoadingStatus, setNewCommentLoadingFailed } from './action';
import { AuthorizationStatus } from '../const';

const initialState: {
  genre: string;
  films: TFilms;
  isFilmsDataLoading: boolean;
  isFilmsDataLoadingFailed: boolean;
  userData: TUserData | null;
  authorizationStatus: AuthorizationStatus;
  activeFilm: TActiveFilmData | null;
  isActiveFilmDataLoading: boolean;
  isActiveFilmDataFailed: boolean;
  isNewCommentDataLoading: boolean;
  isNewCommentDataFailed: boolean;
} = {
  genre: 'All genres',
  films: [],
  isFilmsDataLoading: false,
  isFilmsDataLoadingFailed: false,
  userData: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  activeFilm: null,
  isActiveFilmDataLoading: false,
  isActiveFilmDataFailed: false,
  isNewCommentDataLoading: false,
  isNewCommentDataFailed: false,
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
    .addCase(setActiveFilm, (state, { payload }) => {
      state.activeFilm = payload;
    })
    .addCase(setActiveFilmDataLoadingFailed, (state, { payload }) => {
      state.isActiveFilmDataFailed = payload;
    })
    .addCase(setActiveFilmDataLoadingStatus, (state, { payload }) => {
      state.isActiveFilmDataLoading = payload;
    })
    .addCase(setUserData, (state, { payload }) => {
      state.userData = payload;
    })
    .addCase(setAuthorizationStatus, (state, { payload }) => {
      state.authorizationStatus = payload;
    })
    .addCase(addComment, (state, { payload }) => {
      state.activeFilm?.filmComments.push(payload);
    })
    .addCase(setNewCommentLoadingStatus, (state, { payload }) => {
      state.isNewCommentDataLoading = payload;
    })
    .addCase(setNewCommentLoadingFailed, (state, { payload }) => {
      state.isNewCommentDataFailed = payload;
    });
});

