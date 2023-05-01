import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../hocs/history-route/history-route';
import { AuthorizationStatus, AppRoute, NameSpace, DEFAULT_GENRE_FILTER } from '../../const';
import App from './app';
import { makeFakeCommentsStub, makeFakeFilmsStub, makeFakeFilmStub, makeUserDataStub } from '../../utils/mocks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Films]: {
    data: makeFakeFilmsStub(),
    activeGenre: DEFAULT_GENRE_FILTER,
    isLoading: false,
    error: false
  },
  [NameSpace.UserData]: {
    data: makeUserDataStub(),
    isLoading: false,
    error: false,
    authorizationStatus: AuthorizationStatus.Auth
  },
  [NameSpace.PromoFilm]: {
    data: makeFakeFilmStub(),
    isLoading: false,
    error: false,
  },
  [NameSpace.FavoritesFilms]: {
    data: makeFakeFilmsStub(),
    isLoading: false,
    error: false,
  },
  [NameSpace.ActiveFilm]: {
    data: {
      film: {
        ...makeFakeFilmStub(),
      },
      similarFilms: makeFakeFilmsStub(),
      filmComments: makeFakeCommentsStub()
    },
    isLoading: false,
    error: false
  },
  [NameSpace.NewComment]: {
    isLoading: false,
    error: false
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should render "Movie" when user navigate to "/films/:id/:tabName?"', () => {
    history.push(AppRoute.Root + AppRoute.Films.replace(':id', '1').replace(':tabName?', ''));

    render(fakeApp);

    expect(screen.getByTestId('movie-page')).toBeInTheDocument();
  });

  it('should render "AddReview" when user navigate to "/films/:id/review"', () => {
    history.push(AppRoute.Root + AppRoute.Rewiew.replace(':id', '1'));

    render(fakeApp);

    expect(screen.getByTestId('add-review-page')).toBeInTheDocument();
  });

  it('should render "SignIn" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getAllByText('Sign in').length).toEqual(2);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player/:id"', () => {
    history.push(AppRoute.Player.replace(':id', '1'));

    render(fakeApp);

    expect(screen.getByTestId('player-page')).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);

    render(fakeApp);

    expect(screen.getByTestId('my-list-page')).toBeInTheDocument();
    expect(screen.getByText(/My list/)).toBeInTheDocument();
  });

  it('should render "NotFound" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Go home')).toBeInTheDocument();
  });
});
