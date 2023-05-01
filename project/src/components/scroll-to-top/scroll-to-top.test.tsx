import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { Link, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import HistoryRouter from '../../hocs/history-route/history-route';
import ScrollToTop from './scroll-to-top';

const history = createMemoryHistory();
global.scrollTo = jest.fn();

describe('Component: ScrollToTop', () => {
  it('should work correctly', async () => {
    render(
      <HistoryRouter history={history}>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Link to='page404'>Go 404</Link>}
          />
          <Route
            path='*'
            element={<h1>This is 404</h1>}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(window.scrollTo).toBeCalledTimes(1);
    expect(window.scrollTo).toBeCalledWith(0,0);

    const link = screen.getByRole('link');
    await act(async () => await userEvent.click(link));

    expect(window.scrollTo).toBeCalledTimes(2);
    expect(window.scrollTo).toBeCalledWith(0,0);
  });
});
