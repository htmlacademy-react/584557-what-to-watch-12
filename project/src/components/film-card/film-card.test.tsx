import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { makeFakeFilmStub } from '../../utils/mocks';
import HistoryRouter from '../../hocs/history-route/history-route';
import FilmCard from './film-card';

const history = createMemoryHistory();
describe('Component: FilmCard', () => {
  it('should render correctly', () => {
    jest.useFakeTimers();

    const fakeFilm = makeFakeFilmStub();
    const setActiveCardId = jest.fn();

    const { rerender } = render(
      <HistoryRouter history={history}>
        <FilmCard film={fakeFilm} isActive={false} setActiveCardId={setActiveCardId} />
      </HistoryRouter>
    );
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByAltText(fakeFilm.name)).toBeInTheDocument();

    rerender(
      <HistoryRouter history={history}>
        <FilmCard film={fakeFilm} isActive setActiveCardId={setActiveCardId} />
      </HistoryRouter>
    );

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByAltText(fakeFilm.name)).not.toBeInTheDocument();

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('handle events correctly', async () => {
    const fakeFilm = makeFakeFilmStub();
    const setActiveCardId = jest.fn();

    render(
      <HistoryRouter history={history}>
        <FilmCard film={fakeFilm} isActive={false} setActiveCardId={setActiveCardId} />
      </HistoryRouter>
    );

    const filmCardElement = screen.getByTestId('film-card');

    await act(async () => await userEvent.hover(filmCardElement));

    expect(setActiveCardId).toBeCalledTimes(1);
    expect(setActiveCardId).toBeCalledWith(fakeFilm.id);

    await act(async () => await userEvent.unhover(filmCardElement));

    expect(setActiveCardId).toBeCalledTimes(2);
    expect(setActiveCardId).lastCalledWith(null);
  });

  it('should redirect to /films/2 when user clicked to start button', async () => {
    const fakeFilm = makeFakeFilmStub();
    const setActiveCardId = jest.fn();

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<FilmCard film={fakeFilm} isActive setActiveCardId={setActiveCardId} />}
          />
          <Route
            path={`/${AppRoute.Films.replace(':id', String(fakeFilm.id).replace(':tabName?', ''))}`}
            element={<h1>This is Film</h1>}
          />
        </Routes>
      </HistoryRouter>
    );

    const link = screen.getByRole('link');
    await act(async () => await userEvent.click(link));

    expect(screen.getByText('This is Film')).toBeInTheDocument();

  });
});
