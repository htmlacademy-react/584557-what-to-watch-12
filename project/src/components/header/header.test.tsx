import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { makeUserDataStub } from '../../utils/mocks';
import HistoryRouter from '../../hocs/history-route/history-route';
import { Header } from './header';

const history = createMemoryHistory();
const middlewares = [thunk];

const fakeUserData = makeUserDataStub();
const mockStore = configureMockStore(middlewares);
const testHeaderClassName = 'test';
describe('Component: Header', () => {
  it('Render correctly when user is auth', async () => {
    const store = mockStore({
      [NameSpace.UserData]: {
        data: fakeUserData,
        isLoading: false,
        error: false,
        authorizationStatus: AuthorizationStatus.Auth
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header additionalClassName={testHeaderClassName}>
            <h1>Childe</h1>
          </Header>
        </HistoryRouter>
      </Provider>
    );

    const avatarImgElement: HTMLImageElement = screen.getByAltText('User avatar');
    const headerElement = screen.getByTestId('header');
    const logoElement = screen.getByTestId('logo');
    const signInElement = screen.queryByText('Sign in');
    const signOutElement = screen.getByText('Sign out');

    expect(headerElement).toBeInTheDocument();
    expect(logoElement).toBeInTheDocument();
    expect(signOutElement).toBeInTheDocument();
    expect(avatarImgElement).toBeInTheDocument();
    expect(signInElement).not.toBeInTheDocument();
    expect(headerElement.classList.contains(testHeaderClassName)).toEqual(true);

    expect(screen.getByText('Childe')).toBeInTheDocument();
    expect(avatarImgElement.src).toEqual(`${fakeUserData.avatarUrl}/`);

    await act(async () => await userEvent.click(signOutElement));
    expect(history.location.pathname).toEqual(AppRoute.Login);
  });

  it('Render correctly when user is not auth', async () => {
    const store = mockStore({
      [NameSpace.UserData]: {
        data: fakeUserData,
        isLoading: false,
        error: false,
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header additionalClassName={testHeaderClassName}>
            <h1>Childe</h1>
          </Header>
        </HistoryRouter>
      </Provider>
    );

    const avatarImgElement: HTMLImageElement | null = screen.queryByAltText('User avatar');
    const headerElement = screen.getByTestId('header');
    const logoElement = screen.getByTestId('logo');
    const signInElement = screen.getByText('Sign in');
    const signOutElement = screen.queryByText('Sign out');

    expect(avatarImgElement).not.toBeInTheDocument();
    expect(headerElement).toBeInTheDocument();
    expect(logoElement).toBeInTheDocument();
    expect(signOutElement).not.toBeInTheDocument();
    expect(signInElement).toBeInTheDocument();

    expect(screen.getByText('Childe')).toBeInTheDocument();

    await act(async () => await userEvent.click(signInElement));
    expect(history.location.pathname).toEqual(AppRoute.Login);
  });
});
