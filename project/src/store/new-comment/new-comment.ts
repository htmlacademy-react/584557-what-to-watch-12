import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { addCommentAction } from '../api-actions';

export type TNewCommentState = {
  isLoading: boolean;
  error: boolean;
}

const initialState: TNewCommentState = {
  isLoading: false,
  error: false
};

const { reducer: newCommentReducer } = createSlice({
  name: NameSpace.NewComment,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addCommentAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addCommentAction.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default newCommentReducer;
