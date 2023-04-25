import { ApiRoute, AppRoute, NOT_FOUND_STATUS_CODE } from './../const';
import { TActiveFilmData, TFavoriteFilmChangeStatusData, TFilm, TFilms } from './../types/film';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/store';
import { AxiosInstance, AxiosError } from 'axios';
import { redirectToRoute } from './action';
import { TUserData } from '../types/user';
import { saveToken } from '../services/token';
import { TAuthData } from '../types/auth';
import { TNewCommentRequestBody, TComments, TComment } from '../types/comment';
import { replaceFilmFavoriteStatus } from './films/films';

export const fetchActiveFilmAction = createAsyncThunk<TActiveFilmData | null, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchActiveFilm',
  async (filmId, { dispatch, extra: api }) => {
    const responces = await Promise.all([
      api.get<TFilm>(`${ApiRoute.Films}/${filmId}`),
      api.get<TFilms>(`${ApiRoute.Films}/${filmId}${ApiRoute.SimilarFilms}`),
      api.get<TComments>(`${ApiRoute.FilmComments}/${filmId}`)
    ]).catch((error: AxiosError) => {
      const statusCode = error.response?.status;

      if(statusCode === NOT_FOUND_STATUS_CODE) {
        dispatch(redirectToRoute(AppRoute.NotFound));
      }

      return error;
    });

    if(Array.isArray(responces)) {
      const film: TFilm = responces[0].data;
      const similarFilms: TFilms = responces[1].data;
      const filmComments: TComments = responces[2].data;

      return {
        film,
        similarFilms,
        filmComments,
      };
    }

    return null;
  }
);

export const fetchFilmsAction = createAsyncThunk<TFilms, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TFilms>(ApiRoute.Films);

    return data;
  }
);

export const fetchFavoritesFilmsAction = createAsyncThunk<TFilms, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoritesFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TFilms>(ApiRoute.FavoritesFilms);

    return data;
  }
);

export const fetchPromoFilmAction = createAsyncThunk<TFilm, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TFilm>(ApiRoute.PromoFilm);

    return data;
  }
);

export const changeFavoriteFilmStatusAction = createAsyncThunk<TFilm, TFavoriteFilmChangeStatusData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFavoriteFilmStatus',
  async ({ status, filmId }, { dispatch, extra: api }) => {
    const { data } = await api.post<TFilm>(`${ApiRoute.FavoritesFilms}/${filmId}/${status}`);

    dispatch(replaceFilmFavoriteStatus(data));

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<TUserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TUserData>(ApiRoute.Login);

    return data;
  }
);

export const loginAction = createAsyncThunk<TUserData, TAuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<TUserData>(ApiRoute.Login, { email, password });

    const { token } = data;
    saveToken(token);

    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  }
);

export const addCommentAction = createAsyncThunk<TComment, TNewCommentRequestBody, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ comment, rating, filmId }, { dispatch, extra: api }) => {

    const { data } = await api.post<TComment>(`${ApiRoute.FilmComments}/${filmId}`, { comment, rating });

    const redirectRoute = AppRoute.Films.replace(':id', String(filmId)).replace('/:tabName?', '');
    dispatch(redirectToRoute((redirectRoute) as AppRoute));

    return data;
  }
);
