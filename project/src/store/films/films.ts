import { TFilm, TFilms } from './../../types/film';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_GENRE_FILTER, NameSpace } from '../../const';
import { fetchFilmsAction } from '../api-actions';

export type TFilmsState = {
  data: TFilms;
  activeGenre: string;
  isLoading: boolean;
  error: boolean;
}

const initialState: TFilmsState = {
  data: [],
  activeGenre: DEFAULT_GENRE_FILTER,
  isLoading: false,
  error: false
};

const { reducer: filmsReducer, actions } = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<string>) => {
      state.activeGenre = action.payload;
    },
    replaceFilmFavoriteStatus: (state, action: PayloadAction<TFilm>) => {
      const updatedFilm = action.payload;
      const replacedFilmIdx = state.data.findIndex(({ id }) => id === updatedFilm.id);

      if(replacedFilmIdx !== -1) {
        state.data[replacedFilmIdx].isFavorite = updatedFilm.isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const { changeGenre, replaceFilmFavoriteStatus } = actions;
export default filmsReducer;
