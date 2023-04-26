import favoritesFilmsReducer, { TFavoritesFilmsState } from './favorites-films';
import { fetchFavoritesFilmsAction, changeFavoriteFilmStatusAction } from '../api-actions';
import { makeFakeFilmsStub, makeFakeFilmStub } from '../../utils/mocks';

describe('Reducer: favoritesFilms', () => {
  let state: TFavoritesFilmsState;

  beforeEach(() => {
    state = { data: [], isLoading: false, error: false };
  });
  it('without additional parameters should return initial state', () => {
    expect(favoritesFilmsReducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ data: [], isLoading: false, error: false });
  });

  const favoriteFilms = makeFakeFilmsStub();
  const favoriteFilm = makeFakeFilmStub();

  it('should update favorites films by load favoritesFilms', () => {
    expect(favoritesFilmsReducer(state, { type: fetchFavoritesFilmsAction.fulfilled.type, payload: favoriteFilms }))
      .toEqual({ data: favoriteFilms, isLoading: false, error: false });
  });

  it('should set hasError flag if server is unavailable', () => {
    expect(favoritesFilmsReducer(state, { type: fetchFavoritesFilmsAction.rejected.type }))
      .toEqual({ data: [], isLoading: false, error: true });
  });

  it('should set isLoading flag if data is load', () => {
    expect(favoritesFilmsReducer(state, { type: fetchFavoritesFilmsAction.pending.type }))
      .toEqual({ data: [], isLoading: true, error: false });
  });

  it('should add film by changeFavoriteFilmStatus posted for true', () => {
    const newFavoriteFilm = { ...favoriteFilm, isFavorite: true };
    expect(Boolean(favoritesFilmsReducer(state, { type: changeFavoriteFilmStatusAction.fulfilled.type, payload: newFavoriteFilm }).data.find((film) => film.id === favoriteFilm.id)))
      .toEqual(true);
  });

  it('should remove film by changeFavoriteFilmStatus posted for false', () => {
    const removedFavoriteFilm = { ...favoriteFilm, isFavorite: false };
    expect(Boolean(favoritesFilmsReducer(state, { type: changeFavoriteFilmStatusAction.fulfilled.type, payload: removedFavoriteFilm }).data.find((film) => film.id === favoriteFilm.id)))
      .toEqual(false);
  });
});
