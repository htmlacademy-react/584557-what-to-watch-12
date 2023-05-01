import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus, DEFAULT_GENRE_FILTER, NameSpace } from '../../const';
import HistoryRouter from '../../hocs/history-route/history-route';
import { makeFakeFilmsStub, makeFakeFilmStub, makeUserDataStub } from '../../utils/mocks';
import Main from './main';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeFilm = makeFakeFilmStub();
const fakeFilms = makeFakeFilmsStub();
const fakeUserData = makeUserDataStub();

let store = mockStore({
  [NameSpace.Films]: {
    data: fakeFilms,
    activeGenre: DEFAULT_GENRE_FILTER,
    isLoading: false,
    error: false
  },
  [NameSpace.UserData]: {
    data: fakeUserData,
    isLoading: false,
    error: false,
    authorizationStatus: AuthorizationStatus.Auth
  },
  [NameSpace.PromoFilm]: {
    data: fakeFilm,
    isLoading: false,
    error: false,
  },
  [NameSpace.FavoritesFilms]: {
    data: fakeFilms,
    isLoading: false,
    error: false,
  }
});

const history = createMemoryHistory();

describe('Page: Main', () => {
  it('should render correctly', () => {
    const { rerender } = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Network error. Try reload Page')).not.toBeInTheDocument();

    expect(screen.queryByText('Show more')).not.toBeInTheDocument();

    const { name, genre, released, posterImage, backgroundImage } = fakeFilm;

    const backgroundImageElement: HTMLImageElement = screen.getByAltText(name);
    expect(backgroundImageElement).toBeInTheDocument();
    expect(backgroundImageElement.src).toEqual(backgroundImage);

    const posterImageElement: HTMLImageElement = screen.getByAltText(`${name} poster`);
    expect(posterImageElement).toBeInTheDocument();
    expect(backgroundImageElement.src).toEqual(posterImage);

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(genre)).toBeInTheDocument();
    expect(screen.getByText(released)).toBeInTheDocument();

    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-film-btn')).toBeInTheDocument();
    expect(screen.getByTestId('genres-list')).toBeInTheDocument();
    expect(screen.getByTestId('films-list')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();


    store = mockStore({
      [NameSpace.Films]: {
        data: [],
        activeGenre: DEFAULT_GENRE_FILTER,
        isLoading: true,
        error: false
      },
      [NameSpace.UserData]: {
        data: fakeUserData,
        isLoading: false,
        error: false,
        authorizationStatus: AuthorizationStatus.Auth
      },
      [NameSpace.PromoFilm]: {
        data: fakeFilm,
        isLoading: false,
        error: false,
      },
      [NameSpace.FavoritesFilms]: {
        data: fakeFilms,
        isLoading: false,
        error: false,
      }
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
    expect(screen.queryByText('Network error. Try reload Page')).not.toBeInTheDocument();

    store = mockStore({
      [NameSpace.Films]: {
        data: [],
        activeGenre: DEFAULT_GENRE_FILTER,
        isLoading: false,
        error: false
      },
      [NameSpace.UserData]: {
        data: fakeUserData,
        isLoading: false,
        error: false,
        authorizationStatus: AuthorizationStatus.Auth
      },
      [NameSpace.PromoFilm]: {
        data: fakeFilm,
        isLoading: true,
        error: false,
      },
      [NameSpace.FavoritesFilms]: {
        data: fakeFilms,
        isLoading: false,
        error: false,
      }
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
    expect(screen.queryByText('Network error. Try reload Page')).not.toBeInTheDocument();

    store = mockStore({
      [NameSpace.Films]: {
        data: [],
        activeGenre: DEFAULT_GENRE_FILTER,
        isLoading: false,
        error: true
      },
      [NameSpace.UserData]: {
        data: fakeUserData,
        isLoading: false,
        error: false,
        authorizationStatus: AuthorizationStatus.Auth
      },
      [NameSpace.PromoFilm]: {
        data: fakeFilm,
        isLoading: false,
        error: false,
      },
      [NameSpace.FavoritesFilms]: {
        data: fakeFilms,
        isLoading: false,
        error: false,
      }
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Network error. Try reload Page')).toBeInTheDocument();
    expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    store = mockStore({
      [NameSpace.Films]: {
        data: [],
        activeGenre: DEFAULT_GENRE_FILTER,
        isLoading: false,
        error: false
      },
      [NameSpace.UserData]: {
        data: fakeUserData,
        isLoading: false,
        error: false,
        authorizationStatus: AuthorizationStatus.Auth
      },
      [NameSpace.PromoFilm]: {
        data: fakeFilm,
        isLoading: false,
        error: true,
      },
      [NameSpace.FavoritesFilms]: {
        data: fakeFilms,
        isLoading: false,
        error: false,
      }
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Network error. Try reload Page')).toBeInTheDocument();
    expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
