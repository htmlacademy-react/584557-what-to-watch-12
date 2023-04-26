import { TFilm } from '../../types/film';
import activeFilmReducer, { TActiveFilmState } from './active-film';
import { fetchActiveFilmAction, changeFavoriteFilmStatusAction, addCommentAction } from '../api-actions';
import { makeFakeCommentsStub, makeFakeCommentStub, makeFakeFilmsStub, makeFakeFilmStub } from '../../utils/mocks';

describe('Reducer: activeFilm', () => {
  let state: TActiveFilmState;

  beforeEach(() => {
    state = { data: null, isLoading: false, error: false };
  });
  it('without additional parameters should return initial state', () => {
    expect(activeFilmReducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ data: null, isLoading: false, error: false });
  });

  const film = makeFakeFilmStub();
  const filmComments = makeFakeCommentsStub();
  const newFilmComment = makeFakeCommentStub();
  const similarFilms = makeFakeFilmsStub();

  it('should update activeFilm by load activeFilm', () => {
    const activeFilmState = {
      film,
      filmComments,
      similarFilms,
    };

    expect(activeFilmReducer(state, { type: fetchActiveFilmAction.fulfilled.type, payload: activeFilmState }))
      .toEqual({ data: activeFilmState, isLoading: false, error: false });
  });

  it('should set hasError flag if server is unavailable', () => {
    expect(activeFilmReducer(state, { type: fetchActiveFilmAction.rejected.type }))
      .toEqual({ data: null, isLoading: false, error: true });
  });

  it('should set isLoading flag if data is load', () => {
    expect(activeFilmReducer(state, { type: fetchActiveFilmAction.pending.type }))
      .toEqual({ data: null, isLoading: true, error: false });
  });

  it('should rewrite "isFavorite" field by load changeFavoriteFilmStatus and if id\'s is equals', () => {
    const fakeActiveFilm = {
      id: 1,
      isFavorite: false,
    };

    const fakePayloadActiveFilm = {
      id: 1,
      isFavorite: true,
    };

    const activeFilmState = {
      data: {
        filmComments,
        similarFilms,
        film: (fakeActiveFilm as TFilm)
      },
      isLoading: false,
      error: false
    };

    expect(
      activeFilmReducer(
        activeFilmState,
        { type: changeFavoriteFilmStatusAction.fulfilled.type, payload: fakePayloadActiveFilm }
      ).data?.film.isFavorite
    ).toEqual(fakePayloadActiveFilm.isFavorite);
  });

  it('should add new comment by new comment posted', () => {
    const activeFilmStateData = {
      film,
      filmComments,
      similarFilms,
    };

    expect(activeFilmReducer(
      { ...state, data: activeFilmStateData },
      { type: addCommentAction.fulfilled.type, payload: newFilmComment }
    ).data?.filmComments.some((comment) => comment.id === newFilmComment.id)).toBe(true);
  });
});
