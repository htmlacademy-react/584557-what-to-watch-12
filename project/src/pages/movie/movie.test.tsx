import { configureMockStore } from '@jedmao/redux-mock-store';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AppRoute, AuthorizationStatus, MovieTab, NameSpace } from '../../const';
import HistoryRouter from '../../hocs/history-route/history-route';
import { makeFakeCommentsStub, makeFakeFilmsStub, makeFakeFilmStub, makeUserDataStub } from '../../utils/mocks';
import Movie from './movie';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeFilm = makeFakeFilmStub();
const fakeFilms = makeFakeFilmsStub();
const fakeUserData = makeUserDataStub();
const fakeFilmComments = makeFakeCommentsStub();

let store = mockStore({
  [NameSpace.UserData]: {
    data: fakeUserData,
    isLoading: false,
    error: false,
    authorizationStatus: AuthorizationStatus.Auth
  },
  [NameSpace.FavoritesFilms]: {
    data: fakeFilms,
    isLoading: false,
    error: false,
  },
  [NameSpace.ActiveFilm]: {
    data: {
      film: fakeFilm,
      similarFilms: fakeFilms,
      filmComments: fakeFilmComments
    },
    isLoading: false,
    error: false
  }
});

const history = createMemoryHistory();

describe('Page: Movie', () => {
  it('should render correctly', async () => {
    const { backgroundImage, name, genre, posterImage, released, backgroundColor, id } = fakeFilm;

    history.push(`/${AppRoute.Films.replace(':id', String(id)).replace(':tabName?', '')}`);

    const { rerender } = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={`/${ AppRoute.Films}`} element={<Movie/>}/>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    const page = screen.getByTestId('movie-page');
    expect(page).toBeInTheDocument();
    expect(page.style.backgroundColor).toEqual(backgroundColor);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    const backgroundImageElement: HTMLImageElement = screen.getByAltText(name);
    expect(backgroundImageElement).toBeInTheDocument();
    expect(backgroundImageElement.src).toEqual(backgroundImage);

    const posterImageElement: HTMLImageElement = screen.getByAltText(`${name} poster`);
    expect(posterImageElement).toBeInTheDocument();
    expect(backgroundImageElement.src).toEqual(posterImage);

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(genre)).toBeInTheDocument();
    expect(screen.getByText(released)).toBeInTheDocument();

    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByText('More like this')).toBeInTheDocument();
    expect(screen.getByTestId('movie-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('films-list')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    expect(screen.getByTestId('overview')).toBeInTheDocument();

    const overviewLink = screen.getByText(MovieTab.Overview);
    const detailsLink = screen.getByText(MovieTab.Details);
    const reviewsLink = screen.getByText(MovieTab.Reviews);
    expect(overviewLink).toBeInTheDocument();
    expect(detailsLink).toBeInTheDocument();
    expect(reviewsLink).toBeInTheDocument();

    await act(async () => await userEvent.click(detailsLink));
    expect(screen.getByTestId('details')).toBeInTheDocument();

    await act(async () => await userEvent.click(reviewsLink));
    expect(screen.getByTestId('reviews')).toBeInTheDocument();

    await act(async () => await userEvent.click(overviewLink));
    expect(screen.getByTestId('overview')).toBeInTheDocument();

    store = mockStore({
      [NameSpace.UserData]: {
        data: fakeUserData,
        isLoading: false,
        error: false,
        authorizationStatus: AuthorizationStatus.NoAuth
      },
      [NameSpace.FavoritesFilms]: {
        data: fakeFilms,
        isLoading: false,
        error: false,
      },
      [NameSpace.ActiveFilm]: {
        data: {
          film: fakeFilm,
          similarFilms: [],
          filmComments: fakeFilmComments
        },
        isLoading: false,
        error: false
      }
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Movie />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Add review')).not.toBeInTheDocument();
    expect(screen.queryByText('More like this')).not.toBeInTheDocument();


    store = mockStore({
      [NameSpace.UserData]: {
        data: fakeUserData,
        isLoading: false,
        error: false,
        authorizationStatus: AuthorizationStatus.NoAuth
      },
      [NameSpace.FavoritesFilms]: {
        data: fakeFilms,
        isLoading: false,
        error: false,
      },
      [NameSpace.ActiveFilm]: {
        data: null,
        isLoading: true,
        error: false
      }
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Movie />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
  });
});
