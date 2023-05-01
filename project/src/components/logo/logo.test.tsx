import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { AppRoute } from '../../const';
import HistoryRouter from '../../hocs/history-route/history-route';
import { Logo } from './logo';

const history = createMemoryHistory();
describe('Component: Logo', () => {
  it('should render correctly', async () => {
    history.push(AppRoute.MyList);

    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(history.location.pathname).toEqual(AppRoute.MyList);

    await act(async () => await userEvent.click(screen.getByRole('link')));
    expect(history.location.pathname).toEqual(AppRoute.Root);
  });
});
