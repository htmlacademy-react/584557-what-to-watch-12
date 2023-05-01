import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus, NameSpace } from '../../const';
import HistoryRouter from '../../hocs/history-route/history-route';
import { makeFakeFilmsStub } from '../../utils/mocks';
import MyList from './my-list';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeFilms = makeFakeFilmsStub();

let store = mockStore({
  [NameSpace.UserData]: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  [NameSpace.FavoritesFilms]: {
    data: fakeFilms,
    isLoading: false,
    error: false,
  }
});

const history = createMemoryHistory();

describe('Page: MyList', () => {
  it('should render correctly', () => {
    const { rerender } = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('my-list-page')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Network error. Try reload Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Nothing here!')).not.toBeInTheDocument();

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText(`${fakeFilms.length}`)).toBeInTheDocument();
    expect(screen.getByTestId('films-list')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    store = mockStore({
      [NameSpace.UserData]: {
        authorizationStatus: AuthorizationStatus.Auth
      },
      [NameSpace.FavoritesFilms]: {
        data: [],
        isLoading: false,
        error: false,
      }
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nothing here!')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
    expect(screen.queryByText('Network error. Try reload Page')).not.toBeInTheDocument();

    store = mockStore({
      [NameSpace.UserData]: {
        authorizationStatus: AuthorizationStatus.Auth
      },
      [NameSpace.FavoritesFilms]: {
        data: fakeFilms,
        isLoading: true,
        error: false,
      }
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
    expect(screen.queryByText('Network error. Try reload Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Nothing here!')).not.toBeInTheDocument();

    store = mockStore({
      [NameSpace.UserData]: {
        authorizationStatus: AuthorizationStatus.Auth
      },
      [NameSpace.FavoritesFilms]: {
        data: [],
        isLoading: false,
        error: true,
      }
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Network error. Try reload Page')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByTestId('main-page')).not.toBeInTheDocument();
    expect(screen.queryByText('Nothing here!')).not.toBeInTheDocument();
  });
});
