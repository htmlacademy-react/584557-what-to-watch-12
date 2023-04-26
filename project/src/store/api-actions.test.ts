import { makeFakeFilmsStub, makeFakeCommentsStub, makeFakeFilmStub, makeFakeCommentStub } from './../utils/mocks';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getApi } from '../services/api';
import {
  fetchActiveFilmAction,
  fetchFilmsAction,
  fetchFavoritesFilmsAction,
  fetchPromoFilmAction,
  changeFavoriteFilmStatusAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  addCommentAction
} from './api-actions';
import { ApiRoute, AUTH_TOKEN_KEY_NAME, FavoriteFilmChangeStatus } from '../const';
import { State } from '../types/store';
import { TAuthData } from '../types/auth';
import { redirectToRoute } from './action';
import { replaceFilmFavoriteStatus } from './films/films';

describe('Async actions', () => {
  const api = getApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(ApiRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: TAuthData = { login: 'test@test.ru', password: '123456' };

    mockAPI
      .onPost(ApiRoute.Login)
      .reply(200, { token: 'secret' });


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, 'secret');
  });

  it('should dispatch Load_Films when GET /films', async () => {
    const mockFilms = makeFakeFilmsStub();
    mockAPI
      .onGet(ApiRoute.Films)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_FavoritesFilms when GET /favorite', async () => {
    const mockFavoritesFilms = makeFakeFilmsStub();
    mockAPI
      .onGet(ApiRoute.FavoritesFilms)
      .reply(200, mockFavoritesFilms);

    const store = mockStore();

    await store.dispatch(fetchFavoritesFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoritesFilmsAction.pending.type,
      fetchFavoritesFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_PromoFilm when GET /promo', async () => {
    const mockPromoFilm = makeFakeFilmStub();
    mockAPI
      .onGet(ApiRoute.PromoFilm)
      .reply(200, mockPromoFilm);

    const store = mockStore();

    await store.dispatch(fetchPromoFilmAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoFilmAction.pending.type,
      fetchPromoFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch addCommentAction when Post /comments/:filmId', async () => {
    const fakeFilmId = 1;
    const mockComment = makeFakeCommentStub();

    mockAPI
      .onPost(`${ApiRoute.FilmComments}/${fakeFilmId}`)
      .reply(200, mockComment);

    const store = mockStore();

    await store.dispatch(addCommentAction({ ...mockComment, filmId: fakeFilmId }));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addCommentAction.pending.type,
      redirectToRoute.type,
      addCommentAction.fulfilled.type
    ]);
  });
  it('should dispatch changeFavoriteFilmStatus when Post /favorite/:filmId/:status', async () => {
    const fakeFilmId = 1;
    const fakeStatus = FavoriteFilmChangeStatus.Favorite;

    const mockPromoFilm = makeFakeFilmStub();
    mockPromoFilm.isFavorite = true;

    mockAPI
      .onPost(`${ApiRoute.FavoritesFilms}/${fakeFilmId}/${fakeStatus}`)
      .reply(200, mockPromoFilm);

    const store = mockStore();

    await store.dispatch(changeFavoriteFilmStatusAction({ status: fakeStatus, filmId: fakeFilmId }));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeFavoriteFilmStatusAction.pending.type,
      replaceFilmFavoriteStatus.type,
      changeFavoriteFilmStatusAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_ActiveFilm when GET data to active film', async () => {
    const fakeFilmId = 1;

    const film = makeFakeFilmsStub();
    const similarFilms = makeFakeFilmsStub();
    const filmComments = makeFakeCommentsStub();

    mockAPI
      .onGet(`${ApiRoute.Films}/${fakeFilmId}`)
      .reply(200, film);
    mockAPI
      .onGet(`${ApiRoute.Films}/${fakeFilmId}${ApiRoute.SimilarFilms}`)
      .reply(200, similarFilms);
    mockAPI
      .onGet(`${ApiRoute.FilmComments}/${fakeFilmId}`)
      .reply(200, filmComments);

    const store = mockStore();

    await store.dispatch(fetchActiveFilmAction(fakeFilmId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchActiveFilmAction.pending.type,
      fetchActiveFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(ApiRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });
});
