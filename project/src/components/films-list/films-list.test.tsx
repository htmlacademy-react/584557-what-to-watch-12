import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeFilmStub } from '../../utils/mocks';
import HistoryRouter from '../../hocs/history-route/history-route';
import { FilmsList } from './films-list';

const history = createMemoryHistory();
describe('Component: FilmsList', () => {
  it('should render correctly', () => {
    const fakeFilm1 = makeFakeFilmStub();
    const fakeFilm2 = makeFakeFilmStub();
    const fakeFilm3 = makeFakeFilmStub();
    const fakeFilms = [
      fakeFilm1,
      fakeFilm2,
      fakeFilm3
    ];

    render(
      <HistoryRouter history={history}>
        <FilmsList films={fakeFilms} maxRenderedItems={2} />
      </HistoryRouter>
    );

    expect(screen.getByTestId('films-list')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm1.name)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm2.name)).toBeInTheDocument();
    expect(screen.queryByText(fakeFilm3.name)).not.toBeInTheDocument();
  });
});
