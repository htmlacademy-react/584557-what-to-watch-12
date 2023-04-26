import { addCommentAction } from '../api-actions';
import newCommentReducer, { TNewCommentState } from './new-comment';

describe('Reducer: films', () => {
  let state: TNewCommentState;

  beforeEach(() => {
    state = { isLoading: false, error: false };
  });
  it('without additional parameters should return initial state', () => {
    expect(newCommentReducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ isLoading: false, error: false });
  });

  it('should set error flag', () => {
    expect(newCommentReducer(state, { type: addCommentAction.rejected.type }))
      .toEqual({ isLoading: false, error: true });
  });

  it('should set isLoading flag if data is load', () => {
    expect(newCommentReducer(state, { type: addCommentAction.pending.type }))
      .toEqual({ isLoading: true, error: false });
  });
});
