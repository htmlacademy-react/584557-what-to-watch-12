import { DEFAULT_GENRE_FILTER } from './../../const';
import filmsReducer, { TFilmsState, changeGenre, replaceFilmFavoriteStatus } from './films';
import { fetchFilmsAction } from '../api-actions';
import { makeFakeFilmsStub, makeFakeFilmStub } from '../../utils/mocks';

describe('Reducer: films', () => {
  let state: TFilmsState;

  beforeEach(() => {
    state = { data: [], activeGenre: DEFAULT_GENRE_FILTER ,isLoading: false, error: false };
  });
  it('without additional parameters should return initial state', () => {
    expect(filmsReducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ data: [], activeGenre: DEFAULT_GENRE_FILTER, isLoading: false, error: false });
  });

  const films = makeFakeFilmsStub();
  const film = makeFakeFilmStub();

  it('should update films by load films', () => {
    expect(filmsReducer(state, { type: fetchFilmsAction.fulfilled.type, payload: films }))
      .toEqual({ data: films, activeGenre: DEFAULT_GENRE_FILTER, isLoading: false, error: false });
  });

  it('should set hasError flag if server is unavailable', () => {
    expect(filmsReducer(state, { type: fetchFilmsAction.rejected.type }))
      .toEqual({ data: [], activeGenre: DEFAULT_GENRE_FILTER, isLoading: false, error: true });
  });

  it('should set isLoading flag if data is load', () => {
    expect(filmsReducer(state, { type: fetchFilmsAction.pending.type }))
      .toEqual({ data: [], activeGenre: DEFAULT_GENRE_FILTER, isLoading: true, error: false });
  });

  it('should set new genre', () => {
    expect(filmsReducer(state, { type: changeGenre.type, payload: 'newGenre' }))
      .toEqual({ data: [], activeGenre: 'newGenre', isLoading: false, error: false });
  });

  it('should replace film favorite status by changeFavoriteFilmStatus posted', () => {
    const filmWithChangetStatus = { ...film, isFavorite: !film.isFavorite };

    expect(filmsReducer({ ...state, data: [...films, film] }, { type: replaceFilmFavoriteStatus.type, payload: filmWithChangetStatus }).data.find(({ id }) => id === filmWithChangetStatus.id)?.isFavorite)
      .toEqual(filmWithChangetStatus.isFavorite);
  });
});
