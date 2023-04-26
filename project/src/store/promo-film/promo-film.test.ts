import promoFilmReducer, { TPromoFilmState } from './promo-film';
import { changeFavoriteFilmStatusAction, fetchPromoFilmAction } from '../api-actions';
import { makeFakeFilmStub } from '../../utils/mocks';

describe('Reducer: favoritesFilms', () => {
  let state: TPromoFilmState;

  beforeEach(() => {
    state = { data: null, isLoading: false, error: false };
  });
  it('without additional parameters should return initial state', () => {
    expect(promoFilmReducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ data: null, isLoading: false, error: false });
  });

  const promoFilm = makeFakeFilmStub();

  it('should update promo film by load promoFilm', () => {
    expect(promoFilmReducer(state, { type: fetchPromoFilmAction.fulfilled.type, payload: promoFilm }))
      .toEqual({ data: promoFilm, isLoading: false, error: false });
  });

  it('should set isLoading flag if data is load', () => {
    expect(promoFilmReducer(state, { type: fetchPromoFilmAction.pending.type }))
      .toEqual({ data: null, isLoading: true, error: false });
  });

  it('should set hasError flag if server is unavailable', () => {
    expect(promoFilmReducer(state, { type: fetchPromoFilmAction.rejected.type }))
      .toEqual({ data: null, isLoading: false, error: true });
  });


  it('should add film by changeFavoriteFilmStatus posted for true', () => {
    const newFavoriteFilm = { ...promoFilm, isFavorite: true };
    expect(Boolean(promoFilmReducer({ ...state, data: {...promoFilm, isFavorite: false} }, { type: changeFavoriteFilmStatusAction.fulfilled.type, payload: newFavoriteFilm }).data?.isFavorite))
      .toEqual(true);
  });

  it('should remove film by changeFavoriteFilmStatus posted for false', () => {
    const removedFavoriteFilm = { ...promoFilm, isFavorite: false };
    expect(Boolean(promoFilmReducer({ ...state, data: {...promoFilm, isFavorite: true} }, { type: changeFavoriteFilmStatusAction.fulfilled.type, payload: removedFavoriteFilm }).data?.isFavorite))
      .toEqual(false);
  });
});
