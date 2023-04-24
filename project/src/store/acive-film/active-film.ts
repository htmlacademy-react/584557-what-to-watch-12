import { TComment } from '../../types/comment';
import { TActiveFilmData } from '../../types/film';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { addCommentAction, fetchActiveFilmAction } from '../api-actions';

export type TActiveFilmState = {
  data: TActiveFilmData | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: TActiveFilmState = {
  data: null,
  isLoading: false,
  error: false
};

const { reducer: activeFilmReducer } = createSlice({
  name: NameSpace.ActiveFilm,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActiveFilmAction.fulfilled, (state, action: PayloadAction<TActiveFilmData | null>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(addCommentAction.fulfilled, (state, action: PayloadAction<TComment> ) => {
        state.data?.filmComments.push(action.payload);
      })
      .addCase(fetchActiveFilmAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchActiveFilmAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default activeFilmReducer;
