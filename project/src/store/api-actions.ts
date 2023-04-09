import { ApiRoute } from './../const';
import { TFilms } from './../types/film';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/store';
import { AxiosInstance } from 'axios';
import { loadFilms, setFilmsDataLoadingFailed, setFilmsDataLoadingStatus } from './action';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoadingFailed(false));
    dispatch(setFilmsDataLoadingStatus(true));

    try {
      const { data } = await api.get<TFilms>(ApiRoute.Films);

      dispatch(loadFilms(data));
    } catch (error) {
      dispatch(setFilmsDataLoadingFailed(true));
    }

    dispatch(setFilmsDataLoadingStatus(false));
  });
