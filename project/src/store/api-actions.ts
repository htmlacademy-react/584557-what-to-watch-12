import { ApiRoute, AppRoute, AuthorizationStatus } from './../const';
import { TFilms } from './../types/film';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/store';
import { AxiosInstance } from 'axios';
import { setFilms, redirectToRoute, setUserData, setAuthorizationStatus, setFilmsDataLoadingFailed, setFilmsDataLoadingStatus } from './action';
import { TUserData } from '../types/user';
import { saveToken } from '../services/token';
import { TAuthData } from '../types/auth';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setFilmsDataLoadingFailed(false));
    dispatch(setFilmsDataLoadingStatus(true));

    try {
      const { data } = await api.get<TFilms>(ApiRoute.Films);

      dispatch(setFilms(data));
    } catch (error) {
      dispatch(setFilmsDataLoadingFailed(true));
    }

    dispatch(setFilmsDataLoadingStatus(false));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<TUserData>(ApiRoute.Login);

      dispatch(setUserData(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, TAuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<TUserData>(ApiRoute.Login, { email, password });

    const { token } = data;
    saveToken(token);

    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);
