import { TFilm } from './../../types/film';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { changeFavoriteFilmStatusAction, fetchPromoFilmAction } from '../api-actions';

export type TPromoFilmState = {
  data: TFilm | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: TPromoFilmState = {
  data: null,
  isLoading: false,
  error: false
};

const { reducer: promoFilmReducer } = createSlice({
  name: NameSpace.PromoFilm,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoFilmAction.fulfilled, (state, action: PayloadAction<TFilm>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(changeFavoriteFilmStatusAction.fulfilled, (state, action: PayloadAction<TFilm>) => {
        if(state.data && state.data.id === action.payload.id) {
          state.data.isFavorite = action.payload.isFavorite;
        }
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default promoFilmReducer;
