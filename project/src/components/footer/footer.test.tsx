import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../hocs/history-route/history-route';
import { Footer } from './footer';

const history = createMemoryHistory();
describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
  });
});
