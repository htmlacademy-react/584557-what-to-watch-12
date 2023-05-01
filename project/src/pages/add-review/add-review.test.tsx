import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus, NameSpace } from '../../const';
import HistoryRouter from '../../hocs/history-route/history-route';
import { makeFakeCommentsStub, makeFakeFilmsStub, makeFakeFilmStub } from '../../utils/mocks';
import AddReview from './add-review';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeFilm = makeFakeFilmStub();
const fakeFilms = makeFakeFilmsStub();
const fakeFilmComments = makeFakeCommentsStub();

let store = mockStore({
  [NameSpace.UserData]: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  [NameSpace.ActiveFilm]: {
    data: {
      film: {
        ...fakeFilm,
      },
      similarFilms: fakeFilms,
      filmComments: fakeFilmComments
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

describe('Page: AddReview', () => {
  it('should render correctly', () => {
    const { rerender } = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReview />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('add-review-page')).toBeInTheDocument();

    const backgroundImageElement: HTMLImageElement = screen.getByAltText(fakeFilm.name);
    expect(backgroundImageElement).toBeInTheDocument();
    expect(backgroundImageElement.src).toEqual(fakeFilm.backgroundImage);

    const breadcrumbLinkElement: HTMLAnchorElement = screen.getByText(fakeFilm.name);
    expect(breadcrumbLinkElement).toBeInTheDocument();

    expect(screen.getByText('Add review')).toBeInTheDocument();
    const posterImageElement: HTMLImageElement = screen.getByAltText(`${fakeFilm.name} poster`);
    expect(posterImageElement).toBeInTheDocument();
    expect(backgroundImageElement.src).toEqual(fakeFilm.posterImage);

    expect(screen.getByTestId('header')).toBeInTheDocument();

    store = mockStore({
      [NameSpace.UserData]: {
        authorizationStatus: AuthorizationStatus.Auth
      },
      [NameSpace.ActiveFilm]: {
        data: null,
        isLoading: false,
        error: false
      },
      [NameSpace.NewComment]: {
        isLoading: false,
        error: false
      }
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReview />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('add-review-page')).not.toBeInTheDocument();

    store = mockStore({
      [NameSpace.UserData]: {
        authorizationStatus: AuthorizationStatus.Auth
      },
      [NameSpace.ActiveFilm]: {
        data: null,
        isLoading: true,
        error: false
      },
      [NameSpace.NewComment]: {
        isLoading: false,
        error: false
      }
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReview />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('add-review-page')).not.toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
