import { State } from '../../types/store';

export const selectNewCommentLoadingStatus = (state: State) => state.newComment.isLoading;
export const selectNewCommentLoadingFailed = (state: State) => state.newComment.error;
