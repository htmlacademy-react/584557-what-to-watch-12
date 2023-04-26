import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TFilms } from '../../types/film';
import { changeFavoriteFilmStatusAction, fetchFavoritesFilmsAction } from '../api-actions';

export type TFavoritesFilmsState = {
  data: TFilms;
  isLoading: boolean;
  error: boolean;
}

const initialState: TFavoritesFilmsState = {
  data: [],
  isLoading: false,
  error: false
};

const { reducer: favoritesFilmsReducer } = createSlice({
  name: NameSpace.FavoritesFilms,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesFilmsAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(fetchFavoritesFilmsAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchFavoritesFilmsAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(changeFavoriteFilmStatusAction.fulfilled, (state, { payload }) => {
        if(payload.isFavorite) {
          state.data.push(payload);
        } else {
          const index = state.data.findIndex(({ id }) => id === payload.id);

          if (index > -1) {
            state.data.splice(index, 1);
          }
        }
      });
  },
});

export default favoritesFilmsReducer;
