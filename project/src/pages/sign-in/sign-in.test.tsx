import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../hocs/history-route/history-route';
import SignIn from './sign-in';

const mockStore = configureMockStore();
const store = mockStore({});

describe('Page: SignIn', () => {
  it('should render correctly', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignIn />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('sign-in')).toBeInTheDocument();

    screen.getAllByText(/Sign in/i).forEach((element) => expect(element).toBeInTheDocument());

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    const fakeEmail = 'fake@fake.com';
    const fakePassword = 'fake1234';
    await userEvent.type(screen.getByTestId('email'), fakeEmail);
    await userEvent.type(screen.getByTestId('password'), fakePassword);
    expect(screen.getByDisplayValue(fakeEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakePassword)).toBeInTheDocument();

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
