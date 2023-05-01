import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../hocs/history-route/history-route';
import NotFoundPage from './not-found';

describe('Page: NotFound', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundPage />
      </HistoryRouter>,
    );

    const headerElement = screen.getByText('404 Not Found');
    const linkElement = screen.getByText('Go home');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
