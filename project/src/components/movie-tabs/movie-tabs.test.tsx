import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MovieTab } from '../../const';
import HistoryRouter from '../../hocs/history-route/history-route';
import { makeFakeCommentsStub, makeFakeFilmStub } from '../../utils/mocks';
import { MovieTabs } from './movie-tabs';

const history = createMemoryHistory();

const fakeFilm = makeFakeFilmStub();
const fakeFilmComments = makeFakeCommentsStub();

describe('Component: MovieTabs', () => {
  it('should render correctly', () => {
    const { rerender } = render(
      <HistoryRouter history={history}>
        <MovieTabs film={fakeFilm} activeTab={MovieTab.Details} filmComments={fakeFilmComments} />
      </HistoryRouter>
    );

    expect(screen.getByTestId('movie-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('details')).toBeInTheDocument();

    const detailslink = screen.getByText(MovieTab.Details);
    const overviewlink = screen.getByText(MovieTab.Overview);
    const reviewslink = screen.getByText(MovieTab.Reviews);

    expect(detailslink).toBeInTheDocument();
    expect(overviewlink).toBeInTheDocument();
    expect(reviewslink).toBeInTheDocument();

    rerender(
      <HistoryRouter history={history}>
        <MovieTabs film={fakeFilm} activeTab={MovieTab.Overview} filmComments={fakeFilmComments} />
      </HistoryRouter>
    );

    expect(screen.getByTestId('overview')).toBeInTheDocument();

    rerender(
      <HistoryRouter history={history}>
        <MovieTabs film={fakeFilm} activeTab={MovieTab.Reviews} filmComments={fakeFilmComments} />
      </HistoryRouter>
    );

    expect(screen.getByTestId('reviews')).toBeInTheDocument();
  });
});
